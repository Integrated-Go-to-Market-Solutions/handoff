"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DURATION_MS = 1800;
const START_DELAY_MS = 250;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Feature checklist that types itself out once, the first time it scrolls
 * into view. The untyped remainder of each line stays in the flow as
 * invisible text, so wrapping and card height never shift while it types.
 * Screen readers get the full text immediately; reduced motion skips it.
 */
export function TypedPoints({ points }: { points: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const total = points.reduce((sum, p) => sum + p.length, 0);
  const starts = points.map((_, i) => points.slice(0, i).reduce((sum, p) => sum + p.length, 0));
  const [progress, setTyped] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const typed = reduced ? total : progress;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION_MS);
            setTyped(Math.round(total * t));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, START_DELAY_MS);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [total, reduced]);

  return (
    <ul ref={ref} className="space-y-3">
      {points.map((point, i) => {
        const shown = Math.max(0, Math.min(point.length, typed - starts[i]));
        const typing = shown > 0 && shown < point.length;
        return (
          <li key={point} className="flex gap-3 text-[0.93rem] leading-snug">
            <svg
              viewBox="0 0 20 20"
              className={`mt-0.5 h-4 w-4 shrink-0 transition-opacity duration-200 ${shown > 0 ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            >
              <path
                d="M4 10.5l4 4 8-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">{point}</span>
            <span aria-hidden="true" className="opacity-90">
              {point.slice(0, shown)}
              {typing && (
                <span className="-mr-[3px] ml-px inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current" />
              )}
              <span className="invisible">{point.slice(shown)}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
