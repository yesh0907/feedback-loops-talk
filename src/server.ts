import { routeAgentRequest, callable } from "agents";
import { AIChatAgent, type OnChatMessageOptions } from "@cloudflare/ai-chat";
import { createCodeTool } from "@cloudflare/codemode/ai";
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import {
  streamText,
  stepCountIs,
  convertToModelMessages,
  pruneMessages,
} from "ai";
import { createTools } from "./tools";
import {createWorkersAI} from 'workers-ai-provider'


const tools = createTools();

export class CodemodeTalk extends AIChatAgent<Env> {
  async onChatMessage() {
    const workersAI = createWorkersAI({ binding: this.env.AI });
    const executor = new DynamicWorkerExecutor({ loader: this.env.LOADER });

    const codemode = createCodeTool({
      tools,
      executor,
    });

    const result = streamText({
      model: workersAI("@cf/zai-org/glm-4.7-flash"),
      system:
        "You are a helpful project management assistant. " +
        "You can create and manage projects, tasks, sprints, and comments using the codemode tool. " +
        "When you need to perform operations, use the codemode tool to write JavaScript " +
        "that calls the available functions on the `codemode` object.",
      messages: pruneMessages({
        messages: await convertToModelMessages(this.messages),
        toolCalls: "before-last-2-messages",
        reasoning: "before-last-message",
      }),
      tools: { codemode },
      stopWhen: stepCountIs(10),
    });

    return result.toUIMessageStreamResponse();
  }
}

// ── Cloudflare API Agent (MCP client for mcp.cloudflare.com) ─────────

export class CloudflareApi extends AIChatAgent<Env> {
  async onStart() {
    this.mcp.configureOAuthCallback({
      customHandler: (result) => {
        if (result.authSuccess) {
          return new Response("<script>window.close();</script>", {
            headers: { "content-type": "text/html" },
          });
        }
        return new Response(
          `Authentication Failed: ${result.authError || "Unknown error"}`,
          { headers: { "content-type": "text/plain" }, status: 400 }
        );
      },
    });
  }

  async connectServer() {
    const existing = this.mcp.listServers().find((s) => s.name === "cloudflare");
    if (existing) return { id: existing.id, state: "ready" };
    const result = await this.addMcpServer(
      "cloudflare",
      "https://mcp.cloudflare.com/mcp"
    );
    return result;
  }

  async onChatMessage(_onFinish: unknown, options?: OnChatMessageOptions) {
    const mcpTools = this.mcp.getAITools();
    const workersAI = createWorkersAI({ binding: this.env.AI });

    const result = streamText({
      abortSignal: options?.abortSignal,
      model: workersAI("@cf/zai-org/glm-4.7-flash"),
      system:
        "You are a Cloudflare assistant with access to the Cloudflare API via MCP tools. " +
        "Use the provided tools to answer questions about the user's Cloudflare account. ",
      messages: pruneMessages({
        messages: await convertToModelMessages(this.messages),
        toolCalls: "before-last-2-messages",
        reasoning: "before-last-message",
      }),
      tools: mcpTools,
      stopWhen: stepCountIs(10),
    });

    return result.toUIMessageStreamResponse();
  }
}

// Register connectServer as callable (workaround: @callable() decorator
// crashes the Vite module runner which doesn't support TC39 decorators)
callable()(
  CloudflareApi.prototype.connectServer,
  { kind: "method", name: "connectServer" } as ClassMethodDecoratorContext
);

/** Build the fns map from AI SDK tools for the executor. */
function buildFns(toolSet: ReturnType<typeof createTools>) {
  const fns: Record<string, (args: unknown) => Promise<unknown>> = {};
  for (const [name, t] of Object.entries(toolSet)) {
    fns[name] = async (args: unknown) =>
      (t as unknown as { execute: (args: unknown) => Promise<unknown> }).execute(args);
  }
  return fns;
}

// ── Slide Remote (state sync for phone clicker) ─────────────────────

import { Agent } from "agents";

type SlideState = { currentSlide: number };

export class SlideRemote extends Agent<Env, SlideState> {
  initialState: SlideState = { currentSlide: 0 };
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    const url = new URL(request.url);

    // Execute user code via the codemode SDK with codemode.* proxy (code-mode-execute slide)
    if (url.pathname === "/api/codemode-execute" && request.method === "POST") {
      try {
        const { code } = (await request.json()) as { code: string };
        const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
        const fns = buildFns(createTools());
        const result = await executor.execute(code, fns);
        return Response.json(result);
      } catch (err) {
        return Response.json(
          { error: err instanceof Error ? err.message : "Execution failed", logs: [] },
          { status: 500 }
        );
      }
    }

    // Execute raw code in a V8 isolate (worker-loaders slide)
    if (url.pathname === "/api/execute" && request.method === "POST") {
      try {
        const { code, globalOutbound } = (await request.json()) as {
          code: string;
          globalOutbound?: string | null;
        };
        const allowOutbound = globalOutbound === "default";

        // Build the isolate module inline (same shape as DynamicWorkerExecutor)
        const wrappedCode = `async () => { ${code} }`;
        const module = [
          'import { WorkerEntrypoint } from "cloudflare:workers";',
          "export default class Exec extends WorkerEntrypoint {",
          "  async evaluate() {",
          "    const __logs = [];",
          '    console.log = (...a) => { __logs.push(a.map(String).join(" ")); };',
          '    console.warn = (...a) => { __logs.push("[warn] " + a.map(String).join(" ")); };',
          '    console.error = (...a) => { __logs.push("[error] " + a.map(String).join(" ")); };',
          "    try {",
          "      const result = await Promise.race([",
          `        (${wrappedCode})(),`,
          "        new Promise((_, r) => setTimeout(() => r(new Error('Timeout')), 30000))",
          "      ]);",
          "      return { result, logs: __logs };",
          "    } catch (err) {",
          "      return { result: undefined, error: err.message, logs: __logs };",
          "    }",
          "  }",
          "}",
        ].join("\n");

        const config: Record<string, unknown> = {
          compatibilityDate: "2025-06-01",
          compatibilityFlags: ["nodejs_compat"],
          mainModule: "executor.js",
          modules: { "executor.js": module },
        };
        if (!allowOutbound) {
          config.globalOutbound = null;
        }

        const worker = env.LOADER.get(
          `exec-${crypto.randomUUID()}`,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          () => config as any
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (worker.getEntrypoint() as any).evaluate() as {
          result?: unknown;
          error?: string;
          logs?: string[];
        };
        return Response.json(result);
      } catch (err) {
        return Response.json(
          { ok: false, error: err instanceof Error ? err.message : "Execution failed" },
          { status: 500 }
        );
      }
    }

    

    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
