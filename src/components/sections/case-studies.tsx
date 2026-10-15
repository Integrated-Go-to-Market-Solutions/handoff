"use client";

import { Reveal } from "@/components/reveal";
import { Pill } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { useContent } from "@/components/tina/content";

type Study = ReturnType<typeof useContent>["caseStudies"][number];

/* The site's one card system: each its own gradient, outlined in cyan. */
const cardAccents = [
  { card: "bg-linear-to-br from-cyan to-cyan-dim text-ink", pill: "!border-ink/30 !text-ink", stat: "text-ink", meta: "text-ink/70", ring: "border-ink/40 text-ink" },
  { card: "bg-linear-to-br from-royal to-azure-deep text-bone", pill: "!border-bone/40 !text-bone", stat: "text-bone", meta: "text-bone/70", ring: "border-bone/50 text-bone" },
  { card: "bg-linear-to-br from-ink-300 to-ink text-bone", pill: "!border-bone/30 !text-bone", stat: "text-cyan", meta: "text-bone/65", ring: "border-cyan text-cyan" },
] as const;

const glow =
  "border-2 border-cyan shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_36px_-6px_rgba(61,214,189,0.75)]";

function StoryCard({ study, index }: { study: Study; index: number }) {
  const { resultsPage } = useContent();
  const accent = cardAccents[index % cardAccents.length];
  return (
    <a
      href={`#${study.slug}`}
      className={`group flex h-full flex-col rounded-(--radius-card) p-8 md:p-10 ${glow} ${accent.card}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-2 ${accent.ring}`}>
          <Icon name={study.icon as IconName} className="h-7 w-7" />
        </span>
        <Pill tone="outline" className={accent.pill}>
          {study.tag}
        </Pill>
      </div>

      <h3 className="display mt-8 text-2xl leading-tight md:text-3xl">{study.title}</h3>
      <p className={`mt-3 text-[0.97rem] leading-relaxed ${accent.meta}`}>{study.subhead}</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {study.heroStats.map((stat: any) => (
          <div key={stat.label}>
            <p className={`display text-2xl md:text-3xl ${accent.stat}`}>{stat.value}</p>
            <p className={`mt-1 text-xs font-semibold leading-snug ${accent.meta}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-bold">
        {resultsPage.readStory}
        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </span>
    </a>
  );
}

function CaseStudyDetail({ study, index }: { study: Study; index: number }) {
  const { resultsPage } = useContent();
  const dark = index % 2 === 1;
  const text = dark ? "text-bone" : "text-ink";
  const muted = dark ? "text-bone/70" : "text-ink/70";
  const card = dark
    ? "border-2 border-cyan/30 bg-ink-100 text-bone"
    : "border-2 border-cyan bg-white text-ink shadow-[0_0_28px_-12px_rgba(61,214,189,0.5)]";

  return (
    <section
      id={study.slug}
      className={`relative overflow-hidden section-space ${dark ? "hw-dots bg-ink" : "bg-bone"} ${text}`}
    >
      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <Pill>
            {study.tag} {resultsPage.caseStudyLabel}
          </Pill>
          <h2 className="display mt-6 text-[clamp(2rem,4.6vw,3.4rem)]">{study.title}</h2>
          <p className={`mt-5 max-w-[62ch] text-base leading-relaxed md:text-lg ${muted}`}>{study.subhead}</p>
        </Reveal>

        <div className="section-gap grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className={`display text-xl ${text}`}>{resultsPage.challengeHeading}</h3>
            <ul className="mt-5 space-y-3.5">
              {study.challenge.map((point: any) => (
                <li key={point} className={`flex gap-3 text-[0.97rem] leading-relaxed ${muted}`}>
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <h3 className={`display text-xl ${text}`}>{resultsPage.solutionHeading}</h3>
            <ul className="mt-5 space-y-4">
              {study.solution.map((item: any) => (
                <li key={item.title} className={`rounded-(--radius-card) p-6 ${card}`}>
                  <p className="text-[0.97rem] font-semibold leading-snug">{item.title}</p>
                  <p className={`mt-2 text-sm font-semibold ${dark ? "text-cyan" : "text-cyan-dim"}`}>{item.result}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-12">
          <div
            className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 ${
              study.results.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-4"
            }`}
          >
            {study.results.map((r: any, i: number) => {
              const accent = cardAccents[i % cardAccents.length];
              return (
                <div
                  key={r.label}
                  className={`rounded-(--radius-card) border-2 border-cyan p-5 shadow-[0_0_24px_-10px_rgba(61,214,189,0.55)] ${accent.card}`}
                >
                  <p className={`display text-2xl ${accent.stat}`}>{r.value}</p>
                  <p className={`mt-1 text-xs font-semibold leading-snug ${accent.meta}`}>{r.label}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={180} className="mx-auto mt-16 max-w-4xl text-center md:mt-20">
          <blockquote className={`display text-[clamp(1.4rem,2.8vw,2.2rem)] leading-tight ${text}`}>
            &ldquo;{study.quote}&rdquo;
          </blockquote>
          <p className={`mt-5 text-sm font-semibold ${dark ? "text-cyan" : "text-cyan-dim"}`}>{study.attributionRole}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Story posters, then the full write-up for each case study. */
export function CaseStudies() {
  const { caseStudies, resultsPage } = useContent();
  return (
    <>
      <section
        id="case-studies"
        className="hw-dots relative scroll-mt-18 overflow-hidden bg-ink section-space text-bone"
        aria-label="Case studies"
      >
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">{resultsPage.storiesHeadline}</h2>
            <p className="mt-6 text-lg leading-relaxed text-bone/70">{resultsPage.storiesBody}</p>
          </Reveal>
          <div className="section-gap grid gap-6 lg:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 110}>
                <StoryCard study={study} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {caseStudies.map((study, i) => (
        <CaseStudyDetail key={study.slug} study={study} index={i} />
      ))}
    </>
  );
}
