"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Reveal } from "../reveal";
import { proofStats } from "@/lib/content";

/* Same card system as pricing, the quotes and the Hiring Highway: each
   tile its own gradient, outlined in cyan with a soft glow. Numbers
   animate count-up on entrance. Photos removed per direct instruction —
   the numbers are the primary visual focus now. */
const cardAccents = [
  { card: "bg-gradient-to-br from-royal to-azure text-bone", label: "text-bone/75" },
  { card: "bg-gradient-to-br from-cyan to-cyan-dim text-ink", label: "text-ink/70" },
  { card: "bg-gradient-to-br from-white to-bone text-ink", label: "text-ink/65" },
  { card: "bg-gradient-to-br from-ink-300 to-ink text-bone", label: "text-bone/70" },
] as const;

function getDisplayValue(originalValue: string, current: number): string {
  // Preserve the format of the original value during count-up animation
  if (originalValue.startsWith("$")) {
    // "$50K+" format - animate the number, keep $ and K+ suffix
    const match = originalValue.match(/^(\$)(\d+)(K\+)?$/);
    if (match) {
      const prefix = match[1]; // "$"
      const hasKSuffix = !!match[3]; // true for "K+"
      // Display: $0K+, $1K+, ..., $50K+ (show whole numbers with K+ suffix)
      const displayNum = Math.floor(current);
      return `${prefix}${displayNum}${hasKSuffix ? "K+" : ""}`;
    }
  }
  if (originalValue.includes("%")) {
    // "96%+" format - animate the number, keep % and + suffix
    const match = originalValue.match(/^(\d+)(%\+)?$/);
    if (match) {
      // current ranges 0-target (e.g., 0 to 96), display as percentage directly
      const displayNum = Math.round(current);
      return `${displayNum}${match[2] || ""}`;
    }
  }
  if (originalValue.endsWith("+")) {
    // "40+" or "200+" format - animate the number, keep + suffix
    const displayNum = Math.floor(current);
    return `${displayNum}+`;
  }
  // Fallback: just show the number
  return String(Math.floor(current));
}

export function Stats({
  include,
  bare = false,
  variant = "cards",
  hrefs,
  className = "bg-bone py-16 md:py-20",
}: {
  /** Labels to show, in proofStats order. Defaults to all four. */
  include?: readonly string[];
  /** Just the tiles, no section wrapper, for embedding in another section. */
  bare?: boolean;
  /**
   * "band": one divided glass strip for dark sections, instead of cards.
   * "square": the cards as compact squares, centred, for a pair of tiles.
   */
  variant?: "cards" | "band" | "square";
  /** Per-label link targets. Tiles not listed link to /results. */
  hrefs?: Partial<Record<string, string>>;
  /** Section wrapper classes (padding, background). Ignored when `bare`. */
  className?: string;
} = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = proofStats
    .map((stat, i) => ({ stat, accent: cardAccents[i % cardAccents.length] }))
    .filter(({ stat }) => !include || include.includes(stat.label));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stats = [...root.querySelectorAll<HTMLSpanElement>(".stat-number")];
    const final = (el: HTMLSpanElement) => el.dataset.target || "";
    // The real value is rendered on the server, so a number that never gets
    // animated still shows the right figure, never a stuck "0".
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      stats.forEach((el) => {
        el.textContent = final(el);
      });
      return;
    }

    const DURATION = 2000;
    const timers: number[] = [];
    const done = new Set<HTMLSpanElement>();
    const settle = (el: HTMLSpanElement) => {
      done.add(el);
      el.textContent = final(el);
    };
    const animate = (el: HTMLSpanElement) => {
      if (done.has(el)) return;
      done.add(el);
      const original = final(el);
      const target = Number(original.replace(/[^0-9.-]/g, ""));
      if (Number.isNaN(target)) return settle(el);
      const start = performance.now();
      const update = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1);
        el.textContent = progress < 1 ? getDisplayValue(original, target * progress) : original;
        if (progress < 1) requestAnimationFrame(update);
      };
      el.textContent = getDisplayValue(original, 0);
      requestAnimationFrame(update);
      // Safety net: whatever happens to animation frames (a hidden tab, a
      // throttled device), it always ends on the exact value.
      timers.push(window.setTimeout(() => (el.textContent = original), DURATION + 300));
    };

    // Only numbers still below the screen start at zero, ready to count up.
    // Ones already on screen count up now; ones already scrolled past show
    // the real value.
    stats.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0) settle(el);
      else if (r.top < window.innerHeight) animate(el);
      else el.textContent = getDisplayValue(final(el), 0);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLSpanElement;
          if (entry.isIntersecting) animate(el);
          if (done.has(el)) observer.unobserve(el);
        }
      },
      { threshold: [0, 0.5] },
    );
    stats.forEach((el) => !done.has(el) && observer.observe(el));

    // A jump link or a very fast scroll can carry a number from below the
    // screen to above it without it ever counting as "on screen", so the
    // observer never fires. Catch those on scroll and show the real value.
    let raf = 0;
    const checkPassed = () => {
      raf = 0;
      for (const el of stats) {
        if (!done.has(el) && el.getBoundingClientRect().bottom <= 0) {
          settle(el);
          observer.unobserve(el);
        }
      }
      if (done.size === stats.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(checkPassed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  if (variant === "band") {
    return (
      <div
        ref={rootRef}
        className="mx-auto grid max-w-3xl grid-cols-2 divide-x divide-white/15 overflow-hidden rounded-[var(--radius-card)] border border-white/15 bg-ink/60 backdrop-blur-md"
      >
        {items.map(({ stat }) => (
          <Link
            key={stat.label}
            href="/results"
            className="group flex flex-col items-center justify-center px-3 py-6 text-center transition-colors duration-300 hover:bg-white/[0.04] md:py-8"
          >
            <span className="sr-only">
              {stat.value} {stat.label}
            </span>
            <span
              className="stat-number display text-[clamp(2.3rem,5.4vw,3.9rem)] leading-none text-cyan"
              data-target={stat.value}
              aria-hidden="true"
            >
              {stat.value}
            </span>
            <span
              className="mt-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-bone/80 md:text-sm"
              aria-hidden="true"
            >
              {stat.label}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  const square = variant === "square";
  const grid = (
        <div
          ref={rootRef}
          className={
            square
              ? "flex justify-center gap-4 sm:gap-6"
              : `grid gap-5 sm:gap-6 ${
                  items.length > 2
                    ? "grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-4"
                    : "mx-auto max-w-3xl grid-cols-2 gap-3"
                }`
          }
        >
          {items.map(({ stat, accent }, i) => {
            return (
              <Reveal key={stat.label} delay={i * 100} className={square ? "w-[min(42vw,13rem)]" : ""}>
                <Link
                  href={hrefs?.[stat.label] ?? "/results"}
                  className={`group block h-full rounded-[var(--radius-card)] border-2 border-cyan p-5 shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] outline-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_36px_-6px_rgba(61,214,189,0.75)] focus-visible:-translate-y-1.5 focus-visible:ring-4 focus-visible:ring-royal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bone md:p-6 ${
                    square ? "flex aspect-square min-w-0 flex-col items-center justify-center p-3 text-center sm:p-5" : ""
                  } ${accent.card}`}
                >
                  <span className="sr-only">
                    {stat.value} {stat.label}
                  </span>
                  <p
                    className={`display leading-none ${
                      square ? "text-[clamp(2.4rem,9vw,3.6rem)]" : "text-3xl md:text-4xl"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className="stat-number"
                      data-target={stat.value}
                      aria-hidden="true"
                    >
                      {stat.value}
                    </span>
                  </p>
                  <p
                    className={`mt-2 font-semibold ${square ? "text-xs uppercase tracking-[0.08em] sm:text-sm sm:tracking-[0.14em] md:text-base" : "text-sm md:text-base"} ${accent.label}`}
                    aria-hidden="true"
                  >
                    {stat.label}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
  );

  if (bare) return grid;

  return (
    <section className={className}>
      <div className="shell">{grid}</div>
    </section>
  );
}
