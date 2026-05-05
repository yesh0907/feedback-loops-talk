# Building Reliable AI Agents with Feedback Loops

## Talk Goal

Share a practical framework for building reliable agents by thinking in feedback loops. The talk should be simple enough for a broad technical audience, but grounded in real product lessons from building Scout at Harmonic.

## Core Thesis

Agents are most reliable when they can inspect the consequences of their own work. Coding agents are the clearest example: they have tests, typecheckers, compilers, logs, browser tools, and human feedback. The opportunity is bringing those same feedback primitives into every agentic product we build.

## Memorable Line

Just like humans, agents need feedback to be productive. Thinking in feedback loops steers an agent toward accomplishing tasks reliably.

## Definition

Feedback loops are how agents get the context they need to do reliable work.

Sometimes that context helps the agent correct itself. Sometimes it helps the user evaluate the output. Sometimes it becomes memory for the next session.

## Definition Expansion

A feedback loop is a mechanism for acquiring context during a task, so the agent, user, or system can judge and improve the work.

This is a context engineering problem. The question is not only "how do we prompt the agent better?" It is: does the agent have the right context for the job, and how can it acquire that context while doing the work?

## 10-Minute Arc

### 1. Intro: Why Coding Agents Work

- Briefly introduce yourself, Harmonic, and your work building agents for VC sourcing.
- Start with a familiar experience: coding agents like Claude Code can do surprisingly complex work.
- The reason is not just that the model is smart.
- Coding is full of great feedback primitives.

Speaker beat:

> Coding agents work well because software gives them a world they can poke, test, inspect, and repair.

### 2. Coding Is Full Of Feedback Primitives

- Coding agents can write code, run it, see errors, typecheck, run tests, inspect UI, read logs, and try again.
- They operate in an environment where quality can be checked repeatedly.
- This makes coding a useful intuition pump for understanding reliable agent work in other domains.

Examples:

- Compiler feedback
- Type systems
- Unit tests
- Integration tests
- Browser tools
- Logs
- Human feedback

Visual:

- Use the backpressure / task-complexity graphic from the braindump.
  - ![image](/assets/feedback-loops-vs-complexity.png)
  - Source: [https://banay.me/dont-waste-your-backpressure/](https://banay.me/dont-waste-your-backpressure/)  
- Explain that as task complexity rises, the kind of useful feedback changes.

### 3. Now Name The Thing: Feedback Loops

- Introduce the explicit concept after the audience has the coding-agent intuition.
- Feedback loops are not just "checks."
- They are runtime context.
- They let an agent learn something about the task, artifact, or user's expectations while the work is happening.

Speaker beat:

> The lesson from coding agents is not "every agent needs tests." The lesson is that every reliable agent needs some way to acquire context from the environment it is working in.

### 4. Reliability Means Meeting User Expectations

- Reliable does not mean the agent merely completes a tool call.
- Reliable means producing meaningful output that aligns with or exceeds the user's expectations.
- In Scout, users wanted a comprehensive set of highly relevant companies.
- They did not want Scout to hide the market behind a tiny shortlist.
- They also did not want to sift through thousands of companies by hand.

Key framing:

> The product challenge became: how do we preserve comprehensiveness while still making the result set assessable?

### 5. Framework: Three Types Of Feedback Loops

#### Agent-Facing Loops

Feedback that helps the agent acquire context and improve its own work.

Examples:

- SQL execution
- Inspecting query results
- Running tests
- Calling tools
- Validating generated artifacts

Scout example:

- Scout can execute SQL against Harmonic's database.
- It knows the schema, constructs queries, inspects results, and uses those results to decide whether it is satisfying the user's intent.

#### User-Facing Loops

Feedback that helps the user assess, interpret, or steer the agent's output.

This is the most nuanced part of the talk: not every useful feedback loop feeds back into the agent. Some loops help the user form better judgment.

Scout example:

- Scout can produce a comprehensive result set.
- The evaluator grades companies at scale.
- Users can inspect the broader result set, understand why companies look relevant, and form their own feedback on the results.
- This preserves comprehensiveness while avoiding the experience of manually sifting through thousands of companies.

#### Persistent Memory Loops

Feedback that survives across sessions and changes future behavior.

Examples:

- Skills
- Memory
- User preferences
- Reusable rubrics
- "Don't do that again" style corrections

Scout example:

- A user can encode preferences like "do not show companies we are already invested in."
- Future similar tasks retrieve that context and apply it.

### 6. Scout Example: Comprehensive Search

The goal of the Scout section is to ground the framework, not make the whole talk about Scout.

Story:

- A VC user asks for companies matching a specific thesis.
- Scout uses SQL to gather a comprehensive set of relevant companies.
- The agent-facing loop gives Scout access to domain context from the database.
- This is how Scout moves beyond guessing from model priors.

Slide material:

- Screenshot of the expanded raw result set from the SQL tool call.
- Emphasize comprehensiveness and inspectability.

### 7. Scout Example: Making Results Assessable

Story:

- A comprehensive result set is valuable, but only if the user can assess it.
- The evaluator grades companies at scale.
- The user sees the shortlist and can expand into the broader evaluated set.
- The agent is helping the user find signal without taking away control.

Slide material:

- Screenshot of the shortlisted result list.
- Screenshot of the expanded list with evaluator grading.

Key point:

> This feedback loop improves the user's experience of doing the task with the agent. It does not only exist to improve the agent's internal trajectory.

### 8. How To Find Feedback Loops

#### Listen For Bottlenecks

- Listen for user feedback about bottlenecks in their workflows.
- Where does the agent consistently fall short of expectations?
- Where are users still manually inspecting, filtering, comparing, or correcting?

#### Analyze Real Sessions

- Review real agent sessions.
- Look for repeated moments where the agent lacks context.
- Ask: what context is missing, and how can the agent acquire it?

#### Design Context Primitives

- Tools, evals, subagents, rubrics, memory, and UI affordances can all be feedback primitives.
- The primitive should give structured, useful signal, not just more tokens.

#### Persist Feedback When It Should Matter Later

- If a correction should matter next time, encode it as memory, a skill, or a reusable rule.

### 9. The Hard Part: Designing The Primitive

Designing feedback loops is hard because you are not just giving the agent another tool. You are deciding what context the agent should be able to acquire, when it should acquire it, and how much agency it should have in using that context.

Building good primitives requires:

- Spending time with the product.
- Watching how the agent actually behaves.
- Understanding how users actually use it.
- Analyzing real sessions and failures.
- Developing intuition for the agent's capabilities.
- Pushing the boundaries of what the agent can do.

Key point:

> The best primitives give the agent more agency inside the domain. They let it acquire the right context at the right time, instead of forcing everything into the prompt upfront.

Tradeoff note:

- Feedback loops can add cost, latency, and context overhead.
- But the deeper challenge is deciding which feedback is worth acquiring.

### 10. Close: Think In Feedback Loops

Closing summary:

- Coding agents show us what is possible when agents have strong feedback primitives.
- Feedback loops are runtime context.
- Reliable agents need ways to acquire context while doing work.
- Those loops can serve the agent, the user, or future sessions.
- When your agent falls short, ask what context was missing and how the agent could acquire it.

Final line:

> If you want agents to do meaningful work reliably, do not only think in prompts. Think in feedback loops.

## Slide Outline

1. **Building Reliable AI Agents with Feedback Loops**
2. **Why Coding Agents Work**
3. **Coding Is Full Of Feedback Primitives**
4. **Feedback Changes With Task Complexity**
5. **Feedback Loops Are Runtime Context**
6. **Three Types Of Feedback Loops**
7. **Scout: Comprehensive Search**
8. **Scout: Making Results Assessable**
9. **How To Find Feedback Loops**
10. **The Hard Part Is Designing The Primitive**
11. **Think In Feedback Loops**
12. **Backup / Q&A**

## Backup / Q&A Topics

- Market-map visual feedback loop: using a vision model to inspect generated SVGs and feed issues back into regeneration.
- Pitfalls of feedback loops:
  - Not every feedback loop is useful.
  - Too many loops can waste tokens or context.
  - Feedback can distract the agent's trajectory.
  - New model releases can change which loops help or hurt.
- UX patterns for longer-running agent workflows.
- How to decide whether feedback should go to the agent, the user, or persistent memory.

## Assets Needed

- Backpressure / task-complexity feedback graphic.
- Scout screenshot: shortlisted result list.
- Scout screenshot: expanded raw result set from SQL tool call.
- Scout screenshot: evaluator grading over companies.

## Open Questions

- Which exact Scout screenshots should appear on slides 7 and 8?
- Should the backpressure graphic be redrawn for visual consistency with the deck?
- What metric, anecdote, or user quote can support the Scout example?
- Which Q&A topics should be visible on the final backup slide?
