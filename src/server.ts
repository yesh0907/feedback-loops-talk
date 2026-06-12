import { routeAgentRequest } from "agents";
import { Agent } from "agents";

type SlideState = { currentSlide: number };

export class SlideRemote extends Agent<Env, SlideState> {
  initialState: SlideState = { currentSlide: 0 };
}

export default {
  async fetch(request: Request, env: Env) {
    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
