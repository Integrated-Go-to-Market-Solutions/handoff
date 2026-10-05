"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button, CtaNote } from "../brand";
import { Reveal } from "../reveal";
import { HandoffCheckIcon } from "../highway-icons";
import { process, site } from "@/lib/content";

/**
 * The Hands-off Hiring System on /how-it-works, as a vertical, video-led
 * timeline. A line runs down the left with a dot per step; as you scroll the
 * line fills and the current step's dot lights up. Each step is a row: the
 * label, title and approved copy on the left, a large looping video on the
 * right (stacked text-then-video on phones). The Guarantee closes it in the
 * teal treatment with the Handoff check.
 *
 * Videos are muted, loop, load nothing until near the screen (preload="none"
 * + poster), and only play while their step is on screen. Reduced motion: no
 * line fill (it's shown full), and posters instead of autoplay.
 *
 * The homepage keeps the compact horizontal version (HiringHighway).
 */

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function StepVideo({
  src,
  poster,
  focus,
  vertical,
  reduced,
}: {
  src: string;
  poster: string;
  focus: string;
  vertical: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.pause();
    };
  }, [reduced]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border-2 border-white/10 bg-ink-100 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
      {/* Vertical clips: a blurred copy of the still fills the frame, and the
          clip sits in the middle as a head-and-shoulders portrait, so the
          person isn't blown up to fill the whole width. */}
      {vertical && (
        <span
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-2xl"
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden="true"
        />
      )}
      <video
        ref={ref}
        className={
          vertical
            ? "absolute inset-y-0 left-1/2 aspect-[3/4] h-full -translate-x-1/2 object-cover shadow-[0_0_50px_rgba(0,0,0,0.4)]"
            : "absolute inset-0 h-full w-full object-cover"
        }
        style={{ objectPosition: focus }}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function HiringTimeline() {
  const steps = process.steps;
  const { labels, videos, cta } = process.timeline;
  const last = steps.length - 1;
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

  // Line fill follows the scroll: it reaches each dot as that dot passes the
  // middle of the screen. Written straight to the DOM, so nothing re-renders
  // per frame; only the "current step" index is state.
  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    if (reduced) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      const p = Math.min(Math.max((mid - r.top) / Math.max(r.height, 1), 0), 1);
      fill.style.transform = `scaleY(${p})`;
      let idx = 0;
      dotRefs.current.forEach((dot, i) => {
        if (dot && dot.getBoundingClientRect().top < mid) idx = i;
      });
      setCurrent((c) => (c === idx ? c : idx));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="timeline" className="hw-dots relative scroll-mt-[72px] bg-ink text-bone">
      <div className="shell pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h1 className="display text-[clamp(2.1rem,4.8vw,3.8rem)]">
            {process.titleParts.before} <span className="hw-swipe">{process.titleParts.swipe}</span>{" "}
            {process.titleParts.after}
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] text-balance text-base leading-relaxed text-bone/70 md:text-lg">
            {process.body}
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mx-auto mt-14 max-w-6xl md:mt-20">
          {/* The rail: a faint track with a cyan fill growing down it. */}
          <div className="absolute bottom-0 left-[15px] top-0 w-1 rounded-full bg-white/10 md:left-[19px]" aria-hidden="true">
            <div
              ref={fillRef}
              className="h-full w-full origin-top rounded-full bg-cyan shadow-[0_0_14px_rgba(61,214,189,0.7)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {steps.map((step, i) => {
            const isEnd = i === last;
            const lit = reduced || i <= current;
            const video = videos[i % videos.length];
            return (
              <li key={step.title} className={`relative pl-12 md:pl-16 ${i < last ? "pb-16 md:pb-24" : ""}`}>
                {/* The step's dot on the rail. */}
                <span
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className={`absolute left-0 ${isEnd ? "top-5 md:top-7" : "-top-2"} grid h-9 w-9 place-items-center rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500 motion-reduce:transition-none md:h-11 md:w-11 ${
                    lit
                      ? "border-cyan bg-cyan shadow-[0_0_0_6px_rgba(61,214,189,0.18),0_0_28px_rgba(61,214,189,0.8)]"
                      : "border-white/25 bg-ink"
                  } ${i === current && !reduced ? "scale-110" : ""}`}
                  aria-hidden="true"
                >
                  {isEnd ? (
                    <HandoffCheckIcon cut={lit ? "#1f1f1f" : "#3dd6bd"} className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <span className={`h-2.5 w-2.5 rounded-full ${lit ? "bg-ink" : "bg-white/40"}`} />
                  )}
                </span>

                <div
                  className={`grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 ${
                    isEnd
                      ? "rounded-[var(--radius-card)] border-2 border-cyan bg-cyan p-6 text-ink shadow-[0_0_36px_-8px_rgba(61,214,189,0.8)] md:p-8"
                      : ""
                  }`}
                >
                  <Reveal>
                    <p className={`eyebrow text-[0.75rem] tracking-[0.22em] ${isEnd ? "text-ink/70" : "text-cyan"}`}>
                      {labels[i]}
                    </p>
                    <h2 className="display mt-3 flex items-center gap-3 text-[clamp(1.7rem,3vw,2.5rem)] leading-tight">
                      {isEnd && (
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink" aria-hidden="true">
                          <HandoffCheckIcon cut="#3dd6bd" className="h-6 w-6" />
                        </span>
                      )}
                      {step.title}
                    </h2>
                    <p className={`mt-4 max-w-[46ch] font-text text-base leading-relaxed md:text-lg ${isEnd ? "text-ink/85" : "text-bone/75"}`}>
                      {step.body}
                    </p>
                    {i === cta.step && (
                      <div className="mt-7">
                        <Button href={site.bookingUrl}>{cta.label}</Button>
                        <CtaNote className="mt-3" />
                      </div>
                    )}
                  </Reveal>
                  <Reveal delay={100}>
                    <StepVideo {...video} reduced={reduced} />
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-16 text-center md:mt-20">
          <p className="mx-auto max-w-[62ch] text-balance font-text text-lg font-medium leading-relaxed text-bone/85 md:text-xl">
            {process.closer.line}
          </p>
          <div className="mt-6">
            <Button href={site.bookCall} size="lg">
              {process.closer.cta}
            </Button>
            <CtaNote className="mt-3" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
