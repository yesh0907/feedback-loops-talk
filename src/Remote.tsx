import { useState, useEffect, useRef } from "react"
import { useAgent } from "agents/react"
import { slides } from "./App"
import { speakerNotes } from "./speakerNotes"

type SlideState = { currentSlide: number }

function Timer() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const display = `${mins}:${secs.toString().padStart(2, "0")}`
  const over = elapsed > 30 * 60

  return (
    <div className="flex items-center gap-3">
      <span className={`font-mono text-2xl ${over ? "text-accent-100" : "text-foreground-100"}`}>
        {display}
      </span>
      <button
        onClick={() => setRunning(!running)}
        className="font-mono text-xs px-3 py-1.5 rounded border border-border-100 text-foreground-200 active:bg-border-100 transition-colors"
      >
        {running ? "pause" : elapsed > 0 ? "resume" : "start"}
      </button>
      {elapsed > 0 && !running && (
        <button
          onClick={() => { setElapsed(0); setRunning(false) }}
          className="font-mono text-xs px-3 py-1.5 rounded border border-border-100 text-foreground-200 active:bg-border-100 transition-colors"
        >
          reset
        </button>
      )}
    </div>
  )
}

export default function Remote() {
  const agent = useAgent<SlideState>({
    agent: "slide-remote",
    name: "presentation",
  })

  const current = (agent as unknown as { state?: SlideState }).state?.currentSlide ?? 0
  const total = slides.length
  const slug = slides[current]?.slug ?? ""
  const note = speakerNotes[current]
  const notesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    notesRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }, [current])

  const go = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1))
    agent.setState({ currentSlide: clamped })
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-background-200 p-4 select-none">
      {/* Header: slide info + timer */}
      <div className="flex items-center justify-between shrink-0 pb-3 border-b border-border-100">
        <div>
          <p className="font-mono text-xs text-foreground-200">{slug}</p>
          <p className="font-mono text-xl text-foreground-100">
            {current + 1} <span className="text-foreground-200">/ {total}</span>
          </p>
        </div>
        <Timer />
      </div>

      {/* Speaker notes */}
      <div ref={notesRef} className="flex-1 min-h-0 overflow-auto py-4">
        {note ? (
          <div className="flex flex-col gap-3">
            <h3 className={`text-2xl font-medium ${note.critical ? "text-accent-100" : "text-foreground-100"}`}>
              {note.title}
            </h3>
            <div className="text-xl text-foreground-100 leading-relaxed whitespace-pre-line">
              {note.notes}
            </div>
            {note.aside && (
              <div className="mt-3 p-4 rounded border border-border-100 bg-background-100 text-base text-foreground-200 leading-relaxed">
                {note.aside}
              </div>
            )}
          </div>
        ) : (
          <p className="text-foreground-200 text-sm italic">No notes for this slide.</p>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="shrink-0 pt-3 border-t border-border-100 flex flex-col gap-3">
        <div className="flex w-full gap-3">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="flex-1 rounded-xl bg-background-100 border border-border-100 py-8 text-2xl text-foreground-100 active:bg-border-100 disabled:opacity-20 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => go(current + 1)}
            disabled={current === total - 1}
            className="flex-[2] rounded-xl bg-accent-100 py-8 text-2xl text-background-100 active:bg-accent-200 disabled:opacity-40 transition-colors"
          >
            →
          </button>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => go(0)}
            className="font-mono text-xs text-foreground-200 px-3 py-1.5 rounded border border-border-100 active:bg-border-100 transition-colors"
          >
            first
          </button>
          <button
            onClick={() => go(total - 1)}
            className="font-mono text-xs text-foreground-200 px-3 py-1.5 rounded border border-border-100 active:bg-border-100 transition-colors"
          >
            last
          </button>
        </div>
      </div>
    </div>
  )
}
