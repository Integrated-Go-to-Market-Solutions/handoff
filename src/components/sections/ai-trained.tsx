"use client";

import { useId, useState } from "react";
import { Reveal } from "../reveal";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Handoff Academy (10/13), built to Handoff's mockup: a light section with
 * the eyebrow pill, the headline on the left ("AI-ready." on a cyan
 * highlight) and the subhead on the right, a tools strip between hairlines,
 * three pill tabs (kicker over title, "Use it" selected by default), and a
 * dark card for the selected track: title, hours and facts on the left,
 * what they'll learn in the middle, what they'll build on the right.
 *
 * Headline and card titles are sentence case, as in their mockup, not the
 * site's usual all-caps display style.
 *
 * The tabs only swap the card in place (no navigation). Phones: the tabs
 * become a sideways-scrolling row and the card's columns stack.
 */

const Check = () => (
  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true">
    <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10.2l2.4 2.4 4.6-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cube = () => (
  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true">
    <path d="M10 2.5l6.5 3.75v7.5L10 17.5l-6.5-3.75v-7.5L10 2.5z M3.5 6.25L10 10l6.5-3.75 M10 10v7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const Clock = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path d="M10 6v4.2l2.8 1.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-[0.72rem] tracking-[0.18em] text-cyan">{children}</p>;
}

export function AiTrained() {
  const { aiTrained } = useContent();
  const [active, setActive] = useState(0);
  const baseId = useId();
  const track = aiTrained.tracks[active];

  return (
    <section className="relative overflow-hidden bg-bone section-py text-ink" aria-labelledby={`${baseId}-heading`}>
      <div className="shell relative">
        {/* Header: headline left, subhead right. */}
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-cyan/15 px-4 py-1.5 text-sm font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-cyan-dim" aria-hidden="true" />
              {aiTrained.eyebrow}
            </p>
            <h2 id={`${baseId}-heading`} data-tina-field={tinaField(aiTrained, "headline")} className="display mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)] normal-case! leading-[1.05] tracking-tight text-ink">
              {aiTrained.headline.before}{" "}
              <span className="inline-block rounded-2xl bg-cyan px-3 pb-1">{aiTrained.headline.highlight}</span>
            </h2>
          </div>
          <p className="text-pretty text-base leading-relaxed text-ink/75 md:text-lg">
            {aiTrained.subhead} <strong className="font-semibold text-ink">{aiTrained.subheadBold}</strong>
          </p>
        </Reveal>

        {/* Tools strip between hairlines. */}
        <div className="mt-10 flex flex-col gap-4 border-y border-ink/10 py-5 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow shrink-0 text-xs tracking-[0.16em] text-ink/70">{aiTrained.toolsLabel}</p>
          <ul className="flex flex-1 flex-wrap items-center justify-between gap-x-6 gap-y-3">
            {aiTrained.tools.map((tool: any) => (
              <li key={tool.name} className="flex items-center gap-2.5 text-base font-semibold text-ink">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-ink/10 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tool.icon}
                    alt=""
                    width={20}
                    height={20}
                    className={`h-5 w-5 ${tool.mono ? "invert" : ""}`}
                  />
                </span>
                {tool.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Track tabs. Phones: one sideways-scrolling row. */}
        <div
          role="tablist"
          aria-label="Handoff Academy tracks"
          className="-mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {aiTrained.tracks.map((t: any, i: number) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                onClick={() => setActive(i)}
                className={`min-w-60 shrink-0 snap-start rounded-full border-2 px-6 py-3.5 text-left transition-colors sm:min-w-0 ${
                  selected
                    ? "border-cyan bg-ink text-white"
                    : "border-transparent bg-ink/7 text-ink hover:bg-ink/11"
                }`}
              >
                <span className={`block text-[0.68rem] font-bold uppercase tracking-[0.16em] ${selected ? "text-cyan" : "text-royal"}`}>
                  {t.kicker}
                </span>
                <span className="mt-0.5 block text-[0.95rem] font-semibold leading-snug">{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* The selected track's card. */}
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${track.id}`}
          className="mt-5 rounded-(--radius-card) border-2 border-cyan bg-ink p-6 text-bone shadow-[0_0_36px_-14px_rgba(61,214,189,0.6)] sm:p-8 md:p-10"
        >
          {track.details ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
              <div>
                <h3 className="display text-[clamp(1.4rem,2.4vw,1.85rem)] normal-case! leading-tight tracking-tight text-white">{track.title}</h3>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cyan px-3 py-1 text-sm font-semibold text-ink">
                  <Clock />
                  {track.details.hours}
                </p>
                <dl className="mt-5 space-y-1 text-sm text-bone/75">
                  {track.details.facts.map((f: any) => (
                    <div key={f.label}>
                      <dt className="inline font-semibold text-white">{f.label}:</dt> <dd className="inline">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <SectionLabel>{track.details.learnLabel}</SectionLabel>
                <ul className="mt-4 space-y-3.5">
                  {track.details.learn.map((item: any) => (
                    <li key={item.lead} className="flex gap-3 text-[0.95rem] leading-snug text-bone/80">
                      <Check />
                      <span>
                        <strong className="font-semibold text-white">{item.lead}</strong>
                        {item.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionLabel>{track.details.buildLabel}</SectionLabel>
                <ul className="mt-4 space-y-2.5">
                  {track.details.build.map((item: any) => (
                    <li key={item} className="flex gap-3 rounded-2xl bg-white/6 px-4 py-3 text-[0.95rem] leading-snug text-bone/90">
                      <Cube />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            // No course details from Handoff yet for this track.
            <div>
              <SectionLabel>{track.kicker}</SectionLabel>
              <h3 className="display mt-2 text-[clamp(1.4rem,2.4vw,1.85rem)] normal-case! leading-tight tracking-tight text-white">{track.title}</h3>
              <p className="mt-3 text-base text-bone/70">{aiTrained.comingSoon}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
