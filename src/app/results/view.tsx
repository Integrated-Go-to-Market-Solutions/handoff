"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/brand";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { CaseStudies } from "@/components/sections/case-studies";
import { Finale } from "@/components/sections/finale";
import { tinaField, useContent } from "@/components/tina/content";

const cardAccents = [
  { card: "bg-linear-to-br from-cyan to-cyan-dim text-ink", stat: "text-ink", meta: "text-ink/70" },
  { card: "bg-linear-to-br from-royal to-azure-deep text-bone", stat: "text-bone", meta: "text-bone/70" },
  { card: "bg-linear-to-br from-ink-300 to-ink text-bone", stat: "text-cyan", meta: "text-bone/65" },
] as const;

const glow =
  "border-2 border-cyan shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_36px_-6px_rgba(61,214,189,0.75)]";

export function ResultsView() {
  const { resultsPage } = useContent();
  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={resultsPage.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="shell relative z-10">
          <Reveal className="max-w-4xl">
            <Eyebrow className="mb-5 md:mb-6">{resultsPage.eyebrow}</Eyebrow>
            <h1 data-tina-field={tinaField(resultsPage, "headline")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {resultsPage.headline}
              <br />
              <span className="text-cyan">{resultsPage.headlineAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={90} className="max-w-4xl">
            <p className="mt-6 max-w-[62ch] text-lg font-semibold leading-relaxed text-bone md:text-xl">{resultsPage.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone py-16 md:py-20" aria-label="Results by the numbers">
        <div className="shell grid gap-5 md:grid-cols-3">
          {resultsPage.numbers.map((figure: { label: string; value: string }, i: number) => {
            const accent = cardAccents[i % cardAccents.length];
            return (
              <Reveal key={figure.label} delay={i * 100}>
                <div className={`h-full rounded-(--radius-card) p-7 md:p-8 ${glow} ${accent.card}`}>
                  <p className={`display text-4xl md:text-5xl ${accent.stat}`}>{figure.value}</p>
                  <p className={`mt-3 text-sm font-semibold leading-relaxed ${accent.meta}`}>{figure.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CaseStudies />
      <ClientQuotes />
      <Finale />
    </>
  );
}
