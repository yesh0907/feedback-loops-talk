import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useAgent } from "agents/react";
import {
  AgentFacingSlide,
  BackupSlide,
  CodingPrimitivesSlide,
  ComplexitySlide,
  DesigningPrimitiveSlide,
  FindingLoopsSlide,
  MemoryLoopsSlide,
  ReliableExpectationsSlide,
  RuntimeContextSlide,
  ScoutAssessableSlide,
  ScoutSearchSlide,
  ThankYouSlide,
  ThinkInLoopsSlide,
  ThreeLoopsSlide,
  TitleSlide,
  UserFacingSlide,
  WhyCodingAgentsWorkSlide,
} from "./slides";

export const slides = [
  { component: TitleSlide, slug: "title" },
  { component: WhyCodingAgentsWorkSlide, slug: "why-coding-agents-work" },
  { component: CodingPrimitivesSlide, slug: "coding-feedback-primitives" },
  { component: ComplexitySlide, slug: "feedback-changes-with-complexity" },
  { component: RuntimeContextSlide, slug: "runtime-context" },
  { component: ReliableExpectationsSlide, slug: "reliable-means-expectations" },
  { component: ThreeLoopsSlide, slug: "three-feedback-loops" },
  { component: AgentFacingSlide, slug: "agent-facing-loops" },
  { component: UserFacingSlide, slug: "user-facing-loops" },
  { component: MemoryLoopsSlide, slug: "persistent-memory-loops" },
  { component: ScoutSearchSlide, slug: "scout-comprehensive-search" },
  { component: ScoutAssessableSlide, slug: "scout-making-results-assessable" },
  { component: FindingLoopsSlide, slug: "how-to-find-feedback-loops" },
  { component: DesigningPrimitiveSlide, slug: "designing-the-primitive" },
  { component: ThinkInLoopsSlide, slug: "think-in-feedback-loops" },
  { component: ThankYouSlide, slug: "thank-you" },
  { component: BackupSlide, slug: "backup-qa" },
];

const slugToIndex = new Map(slides.map((s, i) => [s.slug, i]));

type SlideState = { currentSlide: number };

export default function App() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const agent = useAgent<SlideState>({
    agent: "slide-remote",
    name: "presentation",
  });

  const remoteSlide =
    (agent as unknown as { state?: SlideState }).state?.currentSlide ?? 0;
  const currentSlide = slug ? (slugToIndex.get(slug) ?? 0) : 0;

  useEffect(() => {
    if (remoteSlide !== currentSlide) {
      navigate(`/${slides[remoteSlide]?.slug ?? "title"}`);
    }
  }, [remoteSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length) {
        navigate(`/${slides[index].slug}`);
        agent.setState({ currentSlide: index });
      }
    },
    [navigate, agent],
  );

  const nextSlide = useCallback(() => {
    goToSlide(Math.min(currentSlide + 1, slides.length - 1));
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(Math.max(currentSlide - 1, 0));
  }, [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, toggleFullscreen]);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="relative flex h-screen w-screen flex-col bg-background-200">
      {/* Slide area */}
      <div
        className={`flex-1 min-h-0 p-6 md:p-12 ${isFullscreen ? "pb-6 md:pb-12" : "pb-3 md:pb-3"}`}
      >
        <AnimatePresence mode="wait">
          <CurrentSlideComponent key={currentSlide} />
        </AnimatePresence>
      </div>

      {/* Nav strip — hidden in fullscreen */}
      <div
        className={`relative flex shrink-0 items-center justify-center px-6 pt-2 pb-4 md:px-12 transition-opacity duration-300 ${isFullscreen ? "opacity-0 pointer-events-none h-0 overflow-hidden p-0" : ""}`}
      >
        {/* Navigation dots — centered */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`size-2 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "scale-125 bg-accent-100"
                  : "bg-border-100 hover:bg-accent-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows + counter + fullscreen — right */}
        <div className="absolute right-6 md:right-12 flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="font-mono text-sm text-foreground-200 hover:text-accent-100 disabled:opacity-20 transition-colors"
            aria-label="Previous slide"
          >
            ←
          </button>
          <span className="font-mono text-sm text-foreground-200">
            {currentSlide + 1}/{slides.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="font-mono text-sm text-foreground-200 hover:text-accent-100 disabled:opacity-20 transition-colors"
            aria-label="Next slide"
          >
            →
          </button>
          <button
            onClick={toggleFullscreen}
            className="flex items-center justify-center size-7 rounded border border-border-100 bg-background-200 text-foreground-200 hover:bg-background-100 hover:text-accent-100 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title="Toggle fullscreen (F)"
          >
            {isFullscreen ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
