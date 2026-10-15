"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const TYPE_MS = 45;
const DELETE_MS = 22;
const HOLD_MS = 1500;
const GAP_MS = 350;

/**
 * Types each phrase, holds, deletes it and types the next, looping while
 * on screen. Same conventions as the pricing TypedPoints: screen readers get
 * the full list, the longest phrase reserves the space so nothing reflows,
 * and reduced motion shows a static list instead.
 */
export function TypingCycle({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !inView) return;
    const phrase = phrases[index];
    let delay: number;
    let next: () => void;
    if (!deleting && shown < phrase.length) {
      delay = TYPE_MS;
      next = () => setShown((s) => s + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      next = () => setDeleting(true);
    } else if (shown > 0) {
      delay = DELETE_MS;
      next = () => setShown((s) => s - 1);
    } else {
      delay = GAP_MS;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      };
    }
    const t = window.setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [reduced, inView, index, shown, deleting, phrases]);

  if (reduced) {
    return (
      <ul className={`flex flex-wrap gap-x-3 gap-y-1.5 ${className}`}>
        {phrases.map((p) => (
          <li key={p} className="after:ml-3 after:text-cyan/60 after:content-['·'] last:after:content-none">
            {p}
          </li>
        ))}
      </ul>
    );
  }

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");
  const phrase = phrases[index];

  return (
    <span ref={ref} className={`relative inline-grid ${className}`}>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {phrase.slice(0, shown)}
        <span className="ml-0.5 inline-block h-[1.05em] w-0.5 translate-y-[0.18em] animate-pulse bg-cyan" />
      </span>
    </span>
  );
}
