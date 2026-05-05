export const speakerNotes: Record<number, { title: string; notes: string; aside?: string; critical?: boolean }> = {
  0: {
    title: "Title",
    notes: "Introduce yourself, Harmonic, and Scout. Frame the promise: this is a practical way to think about reliability in agentic products, grounded in what coding agents teach us.",
    aside: "Keep this short. The audience should know what you build and why this topic is practical.",
  },
  1: {
    title: "Why coding agents work",
    notes: "Start with a shared experience: Claude Code, Codex, Cursor, and similar tools can do surprisingly complex work. The point is not only that the model is smart. Software gives the agent a world it can poke, inspect, test, and repair.",
  },
  2: {
    title: "Coding feedback primitives",
    notes: "Name the primitives. Compilers, tests, typecheckers, browser tools, logs, and human review all give signal during the task. Coding is the clearest example of an environment rich with feedback.",
  },
  3: {
    title: "Complexity graphic",
    notes: "Use the graphic to make the concept more general. As tasks become more complex and ambiguous, the kind of feedback that helps changes. A unit test is not the only pattern.",
    aside: "Credit the source if you mention it aloud: banay.me/dont-waste-your-backpressure.",
  },
  4: {
    title: "Runtime context",
    notes: "Define the term explicitly. A feedback loop is a mechanism for acquiring context during a task so the agent, user, or system can judge and improve the work. This is context engineering, not just prompt engineering.",
    critical: true,
  },
  5: {
    title: "Reliability means expectations",
    notes: "Reliable does not mean the tool call completed. Reliable means the output is meaningful and aligned with what the user expected. In Scout, users wanted comprehensive relevant companies, but not a thousand-row homework assignment.",
  },
  6: {
    title: "Three loops",
    notes: "Introduce the framework: agent-facing loops, user-facing loops, and persistent memory loops. This gives the rest of the talk a clean map.",
  },
  7: {
    title: "Agent-facing loops",
    notes: "Scout can execute SQL against Harmonic's database. It understands schema, constructs queries, inspects results, and revises. This loop helps the agent acquire domain context and improve its own work.",
  },
  8: {
    title: "User-facing loops",
    notes: "This is the nuanced point. Not every useful loop feeds back into the agent. Some loops help the user interpret or prioritize output. Ranking, grading, explanations, and drill-down can be feedback for the user experience.",
    critical: true,
  },
  9: {
    title: "Persistent memory loops",
    notes: "Talk about skills and memory. If the user says 'do not show companies we already invested in,' that correction should be available next time. This is feedback that persists across sessions.",
  },
  10: {
    title: "Scout comprehensive search",
    notes: "Ground the idea in the VC sourcing workflow. A user asks for companies matching a thesis. Scout uses SQL to gather a comprehensive set and can inspect the result set instead of relying on model priors.",
    aside: "Replace this mock SQL visual with a real screenshot when available.",
  },
  11: {
    title: "Scout assessable results",
    notes: "Comprehensiveness is only valuable if the user can assess it. The evaluator grades companies at scale and helps the user find signal without taking away control.",
    aside: "Replace with Scout screenshots once you choose the final examples.",
  },
  12: {
    title: "How to find loops",
    notes: "Make this actionable. Talk to users, look for workflow bottlenecks, analyze real sessions, identify missing context, and design primitives that provide structured signal.",
  },
  13: {
    title: "Designing primitives",
    notes: "The hard part is choosing what feedback is worth acquiring. Loops can add cost, latency, and context overhead. The craft is deciding when the extra signal is worth it.",
  },
  14: {
    title: "Think in feedback loops",
    notes: "Summarize quickly: coding agents show what is possible, feedback loops are runtime context, loops can serve the agent, user, or future sessions. When an agent falls short, ask what context was missing.",
    aside: "End with the line on screen. Let it land.",
    critical: true,
  },
  15: {
    title: "Backup / Q&A",
    notes: "Use this to invite questions. Good topics: market-map visual evals, pitfalls, token/context overhead, latency UX, and deciding where feedback should land.",
  },
  16: {
    title: "Thank you",
    notes: "Thank the room and invite people to talk afterward about where their agents need better feedback.",
  },
}
