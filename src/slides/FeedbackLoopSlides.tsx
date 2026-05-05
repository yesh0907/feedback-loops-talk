import { SlideContainer } from "@/components"
import { motion } from "framer-motion"

const primitives = [
  "compiler feedback",
  "type systems",
  "unit tests",
  "integration tests",
  "browser tools",
  "logs",
  "human review",
]

const loopTypes = [
  {
    label: "agent-facing",
    title: "Improve the work",
    text: "The agent acquires signal and uses it to correct its trajectory.",
  },
  {
    label: "user-facing",
    title: "Improve judgment",
    text: "The user gets context that makes a large output assessable.",
  },
  {
    label: "persistent",
    title: "Improve next time",
    text: "Feedback becomes memory, a skill, or a reusable rule.",
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent-100">{children}</p>
}

function BigQuote({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-5xl text-center text-foreground-100">
      {children}
    </h2>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border-100 bg-background-100 px-4 py-2 font-mono text-sm text-foreground-200">
      {children}
    </span>
  )
}

function FlowStep({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="flex min-h-36 flex-1 flex-col justify-between rounded border border-border-100 bg-background-100 p-5">
      <h4 className="text-foreground-100">{label}</h4>
      <p className="text-base text-foreground-200">{caption}</p>
    </div>
  )
}

export function TitleSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center">
        <Eyebrow>AI Engineers Tech Talk · May 20, 2026</Eyebrow>
        <h1 className="max-w-5xl text-foreground-100">
          Building Reliable AI Agents with <span className="text-accent-100">Feedback Loops</span>
        </h1>
        <div className="flex flex-col gap-1 font-mono text-sm text-foreground-200">
          <p>Yesh Chandiramani</p>
          <p>Harmonic · Scout</p>
        </div>
      </div>
    </SlideContainer>
  )
}

export function WhyCodingAgentsWorkSlide() {
  return (
    <SlideContainer>
      <div className="grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <Eyebrow>Start with the familiar case</Eyebrow>
          <h2 className="text-foreground-100">Coding agents can do complex work because software talks back.</h2>
        </div>
        <div className="rounded border border-border-100 bg-background-100 p-6 font-mono text-base text-foreground-200">
          <p className="text-ai-100">$ npm test</p>
          <p className="mt-4">2 failed · 41 passed</p>
          <p className="mt-4 text-accent-200">TypeError: missing company_id</p>
          <p className="mt-4 text-foreground-100">Fix, run, inspect, repeat.</p>
        </div>
      </div>
    </SlideContainer>
  )
}

export function CodingPrimitivesSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <Eyebrow>Why code is the intuition pump</Eyebrow>
        <h2 className="max-w-4xl text-foreground-100">Coding is dense with feedback primitives.</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {primitives.map((primitive, index) => (
            <motion.div
              key={primitive}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded border border-border-100 bg-background-100 p-5"
            >
              <p className="font-mono text-sm text-foreground-100">{primitive}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideContainer>
  )
}

export function ComplexitySlide() {
  return (
    <SlideContainer>
      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-5">
          <Eyebrow>Feedback is not one thing</Eyebrow>
          <h2 className="text-foreground-100">As task complexity rises, useful feedback changes.</h2>
          <p className="text-foreground-200">Simple checks are enough for simple work. Ambiguous work needs richer signals.</p>
        </div>
        <div className="overflow-hidden rounded border border-border-100 bg-foreground-100 p-3">
          <img
            src="/feedback-loops-vs-complexity.png"
            alt="Feedback loops versus task complexity"
            className="h-full max-h-[62vh] w-full object-contain"
          />
          <p className="mt-2 font-mono text-xs text-background-200/70">
            Source:{" "}
            <a
              href="https://banay.me/dont-waste-your-backpressure/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-background-200/40 underline-offset-2 hover:text-background-200"
            >
              banay.me/dont-waste-your-backpressure
            </a>
          </p>
        </div>
      </div>
    </SlideContainer>
  )
}

export function RuntimeContextSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center">
        <Eyebrow>Now name the thing</Eyebrow>
        <BigQuote>
          Feedback loops are how agents get the context they need to do reliable work.
        </BigQuote>
        <div className="flex flex-wrap justify-center gap-3">
          <Chip>during the task</Chip>
          <Chip>from the environment</Chip>
          <Chip>for the agent, user, or future session</Chip>
        </div>
      </div>
    </SlideContainer>
  )
}

export function ReliableExpectationsSlide() {
  return (
    <SlideContainer>
      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-5">
          <Eyebrow>Reliability</Eyebrow>
          <h2 className="text-foreground-100">Reliability means meeting user expectations.</h2>
        </div>
        <div className="flex flex-col gap-4">
          <FlowStep label="Not enough" caption="The agent successfully completes a tool call." />
          <FlowStep label="The actual bar" caption="The output is meaningful, inspectable, and aligned with the user's intent." />
        </div>
      </div>
    </SlideContainer>
  )
}

export function ThreeLoopsSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <Eyebrow>A product framework</Eyebrow>
        <h2 className="text-foreground-100">Three useful places for feedback to land.</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {loopTypes.map((loop) => (
            <div key={loop.label} className="flex min-h-64 flex-col justify-between rounded border border-border-100 bg-background-100 p-6">
              <p className="font-mono text-sm text-accent-100">{loop.label}</p>
              <div className="flex flex-col gap-3">
                <h3 className="text-foreground-100">{loop.title}</h3>
                <p className="text-foreground-200">{loop.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  )
}

export function AgentFacingSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <Eyebrow>Agent-facing loop</Eyebrow>
        <h2 className="max-w-5xl text-foreground-100">Give the agent a way to inspect the consequences of its work.</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <FlowStep label="intent" caption="Find companies matching a thesis." />
          <FlowStep label="query" caption="Construct SQL against the live schema." />
          <FlowStep label="inspect" caption="Read results and judge whether they match." />
          <FlowStep label="repair" caption="Revise the query until the set is useful." />
        </div>
      </div>
    </SlideContainer>
  )
}

export function UserFacingSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center">
        <Eyebrow>User-facing loop</Eyebrow>
        <BigQuote>
          Not every useful feedback loop feeds back into the agent.
        </BigQuote>
        <p className="max-w-3xl text-foreground-200">
          Sometimes the loop helps the user form better judgment: ranking, grading, explanations, comparison, and drill-down.
        </p>
      </div>
    </SlideContainer>
  )
}

export function MemoryLoopsSlide() {
  return (
    <SlideContainer>
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center gap-5">
          <Eyebrow>Persistent loop</Eyebrow>
          <h2 className="text-foreground-100">Some feedback should survive the session.</h2>
          <p className="text-foreground-200">Skills and memory turn corrections into durable context.</p>
        </div>
        <div className="rounded border border-border-100 bg-background-100 p-6">
          <p className="font-mono text-sm text-accent-100">user preference</p>
          <h3 className="mt-5 text-foreground-100">“Don’t show companies we already invested in.”</h3>
          <p className="mt-6 text-foreground-200">Next time, the agent retrieves that rule before it searches.</p>
        </div>
      </div>
    </SlideContainer>
  )
}

export function ScoutSearchSlide() {
  return (
    <SlideContainer>
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center gap-5">
          <Eyebrow>Scout example</Eyebrow>
          <h2 className="text-foreground-100">Comprehensive search needs domain context.</h2>
          <p className="text-foreground-200">Scout uses SQL to move beyond guessing from model priors.</p>
        </div>
        <div className="rounded border border-border-100 bg-background-100 p-6 font-mono text-sm text-foreground-200">
          <p className="text-ai-100">select company, traction, category</p>
          <p>from harmonic.companies</p>
          <p>where thesis_match(criteria) &gt; 0.72</p>
          <p>order by relevance desc;</p>
          <div className="mt-6 grid gap-2 text-foreground-100">
            <span>1,842 inspectable candidates</span>
            <span>schema-aware joins</span>
            <span>query can be revised at runtime</span>
          </div>
        </div>
      </div>
    </SlideContainer>
  )
}

export function ScoutAssessableSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <Eyebrow>Scout example</Eyebrow>
        <h2 className="max-w-5xl text-foreground-100">A comprehensive result set is valuable only if the user can assess it.</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <FlowStep label="broad set" caption="Do not hide the market behind a tiny shortlist." />
          <FlowStep label="evaluator" caption="Grade companies at scale against the user's intent." />
          <FlowStep label="control" caption="Let users inspect, expand, compare, and decide." />
        </div>
      </div>
    </SlideContainer>
  )
}

export function FindingLoopsSlide() {
  const methods = ["listen for workflow bottlenecks", "analyze real sessions", "design context primitives", "persist feedback when it should matter later"]
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <Eyebrow>How to find loops</Eyebrow>
        <h2 className="max-w-5xl text-foreground-100">When the agent falls short, ask what context was missing.</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {methods.map((method, index) => (
            <div key={method} className="flex items-center gap-5 rounded border border-border-100 bg-background-100 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-accent-100 font-mono text-sm text-background-200">{index + 1}</span>
              <p className="text-foreground-100">{method}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  )
}

export function DesigningPrimitiveSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center">
        <Eyebrow>The hard part</Eyebrow>
        <BigQuote>
          You are deciding what context is worth acquiring, when, and by whom.
        </BigQuote>
        <div className="grid w-full gap-3 md:grid-cols-3">
          <Chip>cost</Chip>
          <Chip>latency</Chip>
          <Chip>context overhead</Chip>
        </div>
      </div>
    </SlideContainer>
  )
}

export function ThinkInLoopsSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center">
        <Eyebrow>Close</Eyebrow>
        <BigQuote>
          Do not only think in prompts. Think in feedback loops.
        </BigQuote>
        <p className="max-w-3xl text-foreground-200">
          Reliable agents need ways to acquire context while doing meaningful work.
        </p>
      </div>
    </SlideContainer>
  )
}

export function BackupSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-6xl flex-col gap-10">
        <Eyebrow>Backup / Q&A</Eyebrow>
        <h2 className="text-foreground-100">Topics we did not get to today.</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FlowStep label="visual eval loops" caption="Use vision models to inspect generated SVG market maps before returning them." />
          <FlowStep label="feedback pitfalls" caption="Some loops waste tokens, distract the agent, or become obsolete with new models." />
          <FlowStep label="long-running UX" caption="How to design around latency when verification improves quality." />
          <FlowStep label="where feedback lands" caption="Agent, user, memory, system, or some combination." />
        </div>
      </div>
    </SlideContainer>
  )
}

export function ThankYouSlide() {
  return (
    <SlideContainer>
      <div className="flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <h1 className="text-foreground-100">Thank you</h1>
        <p className="max-w-2xl text-foreground-200">
          I would love to hear where your agents still need better feedback.
        </p>
      </div>
    </SlideContainer>
  )
}
