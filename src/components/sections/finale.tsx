"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../brand";
import { cta, hero, site } from "@/lib/content";

/*
 * The closing scene. Short work items fall down the left and right edges
 * and settle in two loose piles in the bottom corners, leaving the centre
 * clear for the headline, the closing line and the one call to action.
 *
 * It plays once (about 3.5s) the first time the section is well into view,
 * then stays settled. No loop. Server render and reduced motion both show
 * the settled state; the client only lifts the words up out of view when it
 * can actually play the fall. The motion itself is CSS (globals.css,
 * `.finale-word`), so nothing re-renders while it runs.
 */

/** Settled slots, bottom row first. Left pile, then right pile. */
const SLOTS = [
  { side: "left", x: "4%", row: 0, r: -6 },
  { side: "right", x: "5%", row: 0, r: 5 },
  { side: "left", x: "8%", row: 1, r: 4 },
  { side: "right", x: "2.5%", row: 1, r: -4 },
  { side: "left", x: "2.5%", row: 2, r: -3 },
  { side: "right", x: "7%", row: 2, r: 7 },
  { side: "left", x: "7%", row: 3, r: 6 },
  { side: "right", x: "4%", row: 3, r: -5 },
] as const;

/** Each word starts this long after the one before, alternating sides. */
const STAGGER_MS = 260;

export function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"settled" | "armed" | "falling">("settled");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Lift the words out of view only once we know the fall can play.
    // Deferred to a frame so it isn't a synchronous setState in the effect.
    const raf = requestAnimationFrame(() => setPhase("armed"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase("falling");
      },
      { threshold: 0.35 },
    );
    io.observe(section);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const words = cta.jam.slice(0, SLOTS.length);

  return (
    <section
      ref={sectionRef}
      aria-label="Closing"
      data-phase={phase}
      className="finale relative flex min-h-svh items-center justify-center overflow-hidden bg-ink pb-48 pt-24 text-bone md:pb-60"
    >
      <div className="tex-waves pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[110px]"
        aria-hidden="true"
      />

      {/* The falling work items: decoration only. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {words.map((word, i) => {
          const slot = SLOTS[i];
          return (
            <span
              key={word}
              className="finale-word absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cyan/50 bg-ink-100/90 px-3 py-1.5 text-xs font-semibold text-bone shadow-[0_6px_18px_-8px_rgba(0,0,0,0.8)] lg:px-4 lg:py-2 lg:text-sm"
              style={
                {
                  [slot.side]: slot.x,
                  "--row": slot.row,
                  "--r": `${slot.r}deg`,
                  animationDelay: `${i * STAGGER_MS}ms`,
                } as React.CSSProperties
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {word}
            </span>
          );
        })}
      </div>

      {/* Above the falling words. From 768px the column stays narrower than
          the space between the two lanes, so the words never cross the text.
          Phones have no room for side lanes: the words pass behind the text
          and settle below it. */}
      <div className="shell relative z-10 text-center">
        <div className="mx-auto md:max-w-[min(48rem,calc(100vw-2*(8vw+7.5rem)))] lg:max-w-[min(48rem,calc(100vw-2*(8vw+9rem)))]">
          <h2 className="display text-[clamp(2rem,8.5vw,5.6rem)] leading-[0.98] text-bone md:text-[clamp(1.7rem,6.5vw,5.6rem)]">
            {cta.headlineParts.before} <span className="text-cyan">{cta.headlineParts.accent}</span>
          </h2>
          <p className="mt-6 text-[clamp(1.05rem,2vw,1.5rem)] font-semibold text-bone/85">{cta.closing}</p>
          <div className="mt-10">
            <Button href={site.bookingUrl} size="lg">
              {cta.book}
            </Button>
          </div>
          <p className="mt-5 text-sm text-bone/60">{hero.note}</p>
        </div>
      </div>
    </section>
  );
}
