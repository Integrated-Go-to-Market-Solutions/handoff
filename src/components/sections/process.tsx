"use client";

import { useState } from "react";
import { Eyebrow } from "../brand";
import { Reveal } from "../reveal";
import { Icon, type IconName } from "../icon";
import { process as currentProcess, legacyProcess, hiringHighwayVideo } from "@/lib/content";

const process = { ...legacyProcess, eyebrow: currentProcess.eyebrow };

/* Subtler per direct feedback: the gradient is now just the outline, a
   light card underneath instead of a bold colour fill. */
const stepBorders = [
  "from-cyan to-royal",
  "from-royal to-cyan",
  "from-cyan-dim to-azure",
  "from-ink-300 to-cyan",
  "from-azure to-royal",
  "from-royal to-cyan-dim",
] as const;

const stepIcons: IconName[] = [
  "target",
  "search",
  "clipboard",
  "chat",
  "envelope",
  "rocket",
];

/** Six waypoints the road actually passes through — the SVG path is drawn
 * from these same numbers, so the markers land exactly on the curve
 * instead of approximating it. */
const ROAD_VIEWBOX = "0 0 1290 220";
const ROAD_PATH =
  "M20,170 Q145,40 270,170 T520,170 T770,170 T1020,170 T1270,170";
const MARKER_POINTS = [
  { x: 20, y: 170 },
  { x: 270, y: 170 },
  { x: 520, y: 170 },
  { x: 770, y: 170 },
  { x: 1020, y: 170 },
  { x: 1270, y: 170 },
];

/**
 * "The Hiring Highway" is the proprietary six-step system the whole site's
 * claims rest on, so it gets more visual weight than a neighboring section,
 * not less. Light gray, not carbon — the alternating rhythm both calls
 * asked for.
 *
 * Cards are gradients with a cyan glow, not flat fills, per direct
 * feedback. The mile markers on the road strip are hoverable/clickable —
 * each pops the step's info up above the road, so the highway itself
 * previews the six steps instead of just decorating them.
 */
export function Process() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="tex-waves relative overflow-hidden bg-bone section-py-hero text-ink"
    >
      <div className="shell relative">
        <Reveal className="max-w-4xl">
          <Eyebrow tone="royal" className="mb-5">{process.eyebrow}</Eyebrow>
          <h2 className="display max-w-[18ch] text-[clamp(2.4rem,5.6vw,4.4rem)] text-ink">
            {process.headline}
          </h2>
          <p className="mt-5 max-w-[54ch] text-base font-medium leading-relaxed text-ink/75 md:text-lg">
            {process.body}
          </p>
        </Reveal>

        {/* The literal highway: a winding mountain road, evoking Medellín's
            hills, with a sports car following the actual curve and six
            hoverable/clickable mile markers sitting exactly on it. */}
        <Reveal delay={80} className="relative mt-16">
          <div className="relative overflow-hidden rounded-(--radius-brand) bg-ink" style={{ aspectRatio: "1290 / 220" }}>
            <svg
              viewBox={ROAD_VIEWBOX}
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Hills, Medellín-valley style: soft layered silhouettes. */}
              <path d="M0,150 Q200,90 430,140 T900,120 T1290,150 V220 H0 Z" fill="#1c4a45" opacity="0.55" />
              <path d="M0,190 Q250,150 540,185 T1050,175 T1290,195 V220 H0 Z" fill="#164039" opacity="0.7" />
              {/* The road itself. */}
              <path
                d={ROAD_PATH}
                fill="none"
                stroke="#2a2a2c"
                strokeWidth="34"
                strokeLinecap="round"
              />
              <path
                d={ROAD_PATH}
                fill="none"
                stroke="var(--color-bone)"
                strokeWidth="2.5"
                strokeDasharray="16 18"
                opacity="0.65"
              />
              <g>
                <path
                  d="M-14,-8 C-14,-11 -9,-14 0,-14 C10,-14 15,-11 15,-8 L15,4 C15,6.5 13,8 10.5,8 L9,8 L9,10.5 C9,11.5 8,12 7,12 L-6,12 C-7,12 -8,11.5 -8,10.5 L-8,8 L-9.5,8 C-12,8 -14,6.5 -14,4 Z"
                  fill="var(--color-cyan)"
                />
                <circle cx="-7" cy="12.5" r="3.4" fill="var(--color-ink)" />
                <circle cx="8" cy="12.5" r="3.4" fill="var(--color-ink)" />
                <animateMotion
                  dur="11s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path={ROAD_PATH}
                />
              </g>
            </svg>

            {MARKER_POINTS.map((point, i) => {
              const step = process.steps[i];
              const leftPct = (point.x / 1290) * 100;
              const topPct = (point.y / 220) * 100;
              return (
                <div
                  key={step.n}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <button
                    type="button"
                    aria-expanded={active === i}
                    aria-label={`Step ${step.n}: ${step.title}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive((v) => (v === i ? null : v))}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive((v) => (v === i ? null : v))}
                    onClick={() => setActive((v) => (v === i ? null : i))}
                    className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full bg-cyan text-[0.7rem] font-bold text-ink ring-4 ring-ink transition-transform duration-300 hover:scale-125 md:h-8 md:w-8 md:text-xs"
                  >
                    {step.n}
                  </button>

                  <div
                    className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 w-56 -translate-x-1/2 rounded-(--radius-card) border-2 border-cyan bg-ink p-4 text-left shadow-2xl transition-all duration-300 ${
                      active === i
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan">
                      Step {step.n}
                    </p>
                    <p className="display mt-1 text-base leading-tight text-bone">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug text-bone/70">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {process.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 80} as="li">
              <div
                className={`group h-full rounded-(--radius-card) bg-linear-to-br p-0.5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg ${stepBorders[i % stepBorders.length]}`}
              >
                <div className="flex h-full flex-col rounded-[calc(var(--radius-card)-2px)] bg-white p-7 text-ink">
                  <div className="flex items-center justify-between">
                    <Icon
                      name={stepIcons[i]}
                      className="h-7 w-7 text-royal transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="display text-3xl leading-none text-ink/25">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.06em] text-ink/50">
                    {step.subtitle}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-[0.85rem] leading-snug text-ink/70">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={process.steps.length * 80} className="mt-6">
          <div className="flex aspect-21/9 items-center justify-center rounded-(--radius-brand) border-2 border-dashed border-ink/20 bg-ink/3">
            <div className="text-center">
              <span className="display text-lg text-ink/50 md:text-xl">
                {hiringHighwayVideo.label}
              </span>
              <p className="mt-2 text-sm text-ink/40">
                {hiringHighwayVideo.caption}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
