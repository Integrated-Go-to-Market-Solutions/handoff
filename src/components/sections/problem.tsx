"use client";

import { useState } from "react";
import { Reveal } from "../reveal";
import { Icon, type IconName } from "../icon";
import { problem } from "@/lib/content";

/* The site's one card system: each face its own gradient, outlined in
   cyan. Front and back swap between the light and dark ends of the palette
   so the flip reads as a real change. Text always sits on the high-contrast
   end of its gradient (ink on cyan and light, bone on royal and carbon). */
const accents = [
  {
    front: "bg-gradient-to-br from-cyan to-cyan-dim text-ink",
    back: "bg-gradient-to-br from-ink-300 to-ink text-bone",
    ring: "border-ink/40 text-ink",
    body: "text-ink/80",
  },
  {
    front: "bg-gradient-to-br from-royal to-azure text-bone",
    back: "bg-gradient-to-br from-white to-bone text-ink",
    ring: "border-bone/60 text-bone",
    body: "text-bone/85",
  },
  {
    front: "bg-gradient-to-br from-white to-bone text-ink",
    back: "bg-gradient-to-br from-royal to-azure text-bone",
    ring: "border-cyan text-cyan-dim",
    body: "text-ink/75",
  },
  {
    front: "bg-gradient-to-br from-ink-300 to-ink text-bone",
    back: "bg-gradient-to-br from-cyan to-cyan-dim text-ink",
    ring: "border-cyan text-cyan",
    body: "text-bone/80",
  },
] as const;

const glow =
  "border-2 border-cyan shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] group-hover:shadow-[0_0_36px_-6px_rgba(61,214,189,0.75)]";

/** One icon per card, matched to what each one is about. */
const cardIcons: IconName[] = ["bell", "trendingUp", "compass", "globe"];

function ProblemCard({
  title,
  copy,
  index,
}: {
  title: string;
  copy: string;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const accent = accents[index % accents.length];
  const icon = cardIcons[index % cardIcons.length];

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={`${title}. ${flipped ? "Show the problem" : "Show the fix"}`}
      onClick={() => setFlipped((value) => !value)}
      className="group block h-[24rem] w-full cursor-pointer text-left [perspective:1200px] sm:h-[22rem] lg:h-[24rem] xl:h-[22rem]"
    >
      <span
        className={`relative block h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:-translate-y-1.5 ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* The repeated "Sound familiar" and "Flip to stop this" labels moved
            up to the section intro. Four cards each carrying both read as
            four identical labels rather than as four problems. */}
        <span
          className={`absolute inset-0 flex h-full flex-col items-center rounded-[var(--radius-card)] p-7 text-center transition-shadow duration-500 [backface-visibility:hidden] ${glow} ${accent.front}`}
        >
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border-2 ${accent.ring}`}
          >
            <Icon name={icon} className="h-6 w-6" />
          </span>
          {/* Title pinned to a fixed slot so all four bodies start on the
              same line whether the title wraps or not. */}
          <span className="display mt-6 block min-h-[3.4rem] text-[1.15rem] leading-tight md:text-[1.25rem]">
            {title}
          </span>
          <span className={`mt-3 block text-[0.95rem] font-medium leading-relaxed ${accent.body}`}>
            {copy}
          </span>
        </span>

        <span
          className={`absolute inset-0 flex h-full flex-col items-center justify-between rounded-[var(--radius-card)] p-7 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${glow} ${accent.back}`}
        >
          <span className="display text-6xl leading-none">Stop.</span>
          <span>
            <span className="display block text-xl">Hand it off.</span>
            <span className="mx-auto mt-2 block max-w-[30ch] text-[0.95rem] font-medium leading-relaxed opacity-85">
              A capable teammate can own this work without becoming another task
              for you to manage.
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

export function Problem() {
  return (
    <section className="relative overflow-hidden bg-ink pb-10 pt-14 text-bone md:pb-14 md:pt-20">
      <div className="shell relative text-center">
        <div className="relative">
          <Reveal className="relative mx-auto max-w-3xl">
            <h2 className="display mt-2 text-[clamp(2rem,5vw,3.9rem)]">
              {problem.headline}
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-balance text-base leading-relaxed text-bone/70 md:text-lg">
              {problem.body}
            </p>
            <p className="mx-auto mt-4 max-w-[58ch] text-balance text-base leading-relaxed text-bone/70 md:text-lg">
              {problem.bodyDepartment}
            </p>
          </Reveal>
        </div>
        <Reveal className="relative mt-14">
          <p className="text-lg font-semibold text-bone md:text-xl">
            {problem.cardsLead}{" "}
            {/* "Flip" is a desktop word. On a phone the gesture is a tap. */}
            <span className="md:hidden">{problem.cardsActionMobile}</span>
            <span className="hidden md:inline">
              {problem.cardsActionDesktop}
            </span>
          </p>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {problem.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 110}>
              <ProblemCard title={card.title} copy={card.copy} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
