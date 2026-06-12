# Feedback Loops Talk

Working materials and slide deck for the [May 20, 2026 AI Engineers tech talk](https://luma.com/0308ir1j): **Building Reliable AI Agents with Feedback Loops**.

The deck is built on top of the stack and presentation mechanics from [`threepointone/codemode-talk`](https://github.com/threepointone/codemode-talk): React, Vite, Tailwind, Framer Motion, route-per-slide navigation, fullscreen controls, and a `/remote` speaker view backed by the Agents SDK clicker state.

## Setup

```bash
npm install
npm start
```

Open the deck at:

- `http://localhost:5173/title`
- `http://localhost:5173/remote` for speaker notes and remote control

## Repo Structure

- `src/` - functioning slide deck app.
- `src/slides/FeedbackLoopSlides.tsx` - slide content for this talk.
- `src/speakerNotes.ts` - speaker notes used by the `/remote` view.
- `event/` - event criteria and external talk requirements.
- `notes/` - raw notes, braindumps, voice-note summaries, and transcripts.
- `outline/` - structured talk outlines and narrative drafts.
- `assets/` - source screenshots, figures, and slide visuals.
- `public/` - static assets served by the deck.

## Current Draft

The current working outline is in:

- `outline/feedback-loops-talk-outline.md`

The current slide sequence is:

1. Building Reliable AI Agents with Feedback Loops
2. Why Coding Agents Work
3. Coding Is Full Of Feedback Primitives
4. Feedback Changes With Task Complexity
5. Feedback Loops Are Runtime Context
6. Reliability Means Meeting User Expectations
7. Three Types Of Feedback Loops
8. Agent-Facing Loops
9. User-Facing Loops
10. Persistent Memory Loops
11. Scout: Comprehensive Search
12. Scout: Making Results Assessable
13. How To Find Feedback Loops
14. The Hard Part Is Designing The Primitive
15. Think In Feedback Loops
16. Backup / Q&A
17. Thank You

## Next Steps

- Add final Scout UI screenshots to `assets/` and copy selected versions into `public/`.
- Replace the mock SQL and evaluator visuals on slides 11 and 12 with real product screenshots.
- Decide which Q&A topics should remain visible on the backup slide.
