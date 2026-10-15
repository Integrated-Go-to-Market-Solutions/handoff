"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../brand";
import { tinaField, useContent } from "@/components/tina/content";

/*
 * The closing scene, on every page. Reworked 10/15 per the 10/14 call: the
 * "Stop being the bottleneck" line and the falling work items are gone
 * (Anthony: most clients aren't bottlenecked, and the items read as
 * entry-level tasks). It now carries Handoff's slogan, "Focus on what you do
 * best. Hand off the rest.", under the Handoff mark, which builds itself
 * once: the cyan piece drops onto the white one and settles with a soft
 * glow (Tom's option C).
 *
 * It plays once, the first time the section is well into view. Server render
 * and reduced motion both show the finished mark; the client only lifts the
 * cyan piece away when it can actually play the drop. The motion is CSS
 * (globals.css, `.finale-mark`), so nothing re-renders while it runs.
 */
export function Finale() {
  const { cta, hero, site } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"settled" | "armed" | "playing">("settled");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Lift the cyan piece away only once we know the drop can play.
    // Deferred to a frame so it isn't a synchronous setState in the effect.
    const raf = requestAnimationFrame(() => setPhase("armed"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase("playing");
      },
      { threshold: 0.35 },
    );
    io.observe(section);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Closing"
      data-phase={phase}
      className="finale relative flex min-h-svh items-center justify-center overflow-hidden bg-ink py-24 text-bone"
    >
      <div className="tex-waves pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="shell relative z-10 text-center">
        {/* The Handoff mark: white piece fixed, cyan piece drops onto it. */}
        <svg viewBox="0 0 279 364" className="finale-mark mx-auto h-24 w-auto overflow-visible md:h-32" aria-hidden="true">
          <path d="M111.907 364L0 250.941L167.608 88.2487L278.305 203.321L111.907 364Z" fill="white" />
          <path
            className="finale-mark-top"
            d="M111.907 275.959L0 162.815L167.608 0L278.305 115.159L111.907 275.959Z"
            fill="#3CDCC2"
          />
        </svg>

        <h2
          data-tina-field={tinaField(cta, "headlineParts")}
          className="display mx-auto mt-10 max-w-[18ch] text-[clamp(2.1rem,7vw,5rem)] leading-[0.98] text-bone md:mt-12"
        >
          {cta.headlineParts.before} <span className="mt-2 block text-cyan">{cta.headlineParts.accent}</span>
        </h2>
        {cta.closing && <p className="mt-6 text-[clamp(1.05rem,2vw,1.5rem)] font-semibold text-bone/85">{cta.closing}</p>}
        <div className="mt-10">
          <Button href={site.bookingUrl} size="lg">
            {cta.book}
          </Button>
        </div>
        <p className="mt-5 text-sm text-bone/60">{hero.note}</p>
      </div>
    </section>
  );
}
