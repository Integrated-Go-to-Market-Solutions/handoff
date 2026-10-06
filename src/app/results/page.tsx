import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Pill } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { Finale } from "@/components/sections/finale";
import { resultsPage, caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Results | Handoff",
  description:
    "Case studies, retention numbers and client testimonials from companies that hired through Handoff.",
};

type Study = (typeof caseStudies)[number];

/* The site's one card system: each its own gradient, outlined in cyan. */
const cardAccents = [
  { card: "bg-gradient-to-br from-cyan to-cyan-dim text-ink", pill: "!border-ink/30 !text-ink", stat: "text-ink", meta: "text-ink/70", ring: "border-ink/40 text-ink" },
  { card: "bg-gradient-to-br from-royal to-azure text-bone", pill: "!border-bone/40 !text-bone", stat: "text-bone", meta: "text-bone/70", ring: "border-bone/50 text-bone" },
  { card: "bg-gradient-to-br from-ink-300 to-ink text-bone", pill: "!border-bone/30 !text-bone", stat: "text-cyan", meta: "text-bone/65", ring: "border-cyan text-cyan" },
] as const;

const glow =
  "border-2 border-cyan shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_36px_-6px_rgba(61,214,189,0.75)]";

/**
 * Story poster: gradient card, cyan outline, cyan-ringed icon, the tag as
 * a pill, the title and the three headline numbers. Links down to the
 * story's full section on this page.
 */
function StoryCard({ study, index }: { study: Study; index: number }) {
  const accent = cardAccents[index % cardAccents.length];
  return (
    <a
      href={`#${study.slug}`}
      className={`group flex h-full flex-col rounded-[var(--radius-card)] p-8 md:p-10 ${glow} ${accent.card}`}
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
        {study.heroStats.map((stat) => (
          <div key={stat.label}>
            <p className={`display text-2xl md:text-3xl ${accent.stat}`}>{stat.value}</p>
            <p className={`mt-1 text-xs font-semibold leading-snug ${accent.meta}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-bold">
        Read the story
        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </span>
    </a>
  );
}

/**
 * Full story. Sections alternate light gray and carbon, same rhythm as
 * the homepage. Cards carry the cyan outline; the quote runs as a centred
 * display statement with no border rule.
 */
function CaseStudyDetail({ study, index }: { study: Study; index: number }) {
  const dark = index % 2 === 1;
  const text = dark ? "text-bone" : "text-ink";
  const muted = dark ? "text-bone/70" : "text-ink/70";
  const card = dark
    ? "border-2 border-cyan/30 bg-ink-100 text-bone"
    : "border-2 border-cyan bg-white text-ink shadow-[0_0_28px_-12px_rgba(61,214,189,0.5)]";

  return (
    <section
      id={study.slug}
      className={`relative overflow-hidden section-py ${dark ? "hw-dots bg-ink" : "bg-bone"} ${text}`}
    >
      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <Pill>{study.tag} case study</Pill>
          <h2 className="display mt-6 text-[clamp(2rem,4.6vw,3.4rem)]">{study.title}</h2>
          <p className={`mt-5 max-w-[62ch] text-base leading-relaxed md:text-lg ${muted}`}>
            {study.subhead}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className={`display text-xl ${text}`}>The challenge</h3>
            <ul className="mt-5 space-y-3.5">
              {study.challenge.map((point) => (
                <li key={point} className={`flex gap-3 text-[0.97rem] leading-relaxed ${muted}`}>
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <h3 className={`display text-xl ${text}`}>What we did</h3>
            <ul className="mt-5 space-y-4">
              {study.solution.map((item) => (
                <li key={item.title} className={`rounded-[var(--radius-card)] p-6 ${card}`}>
                  <p className="text-[0.97rem] font-semibold leading-snug">{item.title}</p>
                  <p className={`mt-2 text-sm font-semibold ${dark ? "text-cyan" : "text-cyan-dim"}`}>
                    {item.result}
                  </p>
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
            {study.results.map((r, i) => {
              const accent = cardAccents[i % cardAccents.length];
              return (
                <div
                  key={r.label}
                  className={`rounded-[var(--radius-card)] border-2 border-cyan p-5 shadow-[0_0_24px_-10px_rgba(61,214,189,0.55)] ${accent.card}`}
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
          <p className={`mt-5 text-sm font-semibold ${dark ? "text-cyan" : "text-cyan-dim"}`}>
            {study.attributionRole}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function ResultsPage() {
  return (
    <>
      {/* Same page top as the homepage: black brick, halftone screen. */}
      <section className="halftone relative overflow-hidden bg-ink pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src="/textures/brick.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="shell relative z-10">
          <Reveal className="max-w-4xl">
            <Eyebrow className="mb-5 md:mb-6">{resultsPage.eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {resultsPage.headline}
              <br />
              <span className="text-cyan">{resultsPage.headlineAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={90} className="max-w-4xl">
            <p className="mt-6 max-w-[62ch] text-lg font-semibold leading-relaxed text-bone md:text-xl">
              {resultsPage.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The numbers, on the same tiles as the homepage stats row. */}
      <section className="bg-bone py-16 md:py-20" aria-label="Results by the numbers">
        <div className="shell grid gap-5 md:grid-cols-3">
          {resultsPage.numbers.map((figure, i) => {
            const accent = cardAccents[i % cardAccents.length];
            return (
              <Reveal key={figure.label} delay={i * 100}>
                <div className={`h-full rounded-[var(--radius-card)] p-7 md:p-8 ${glow} ${accent.card}`}>
                  <p className={`display text-4xl md:text-5xl ${accent.stat}`}>{figure.value}</p>
                  <p className={`mt-3 text-sm font-semibold leading-relaxed ${accent.meta}`}>
                    {figure.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* The stories, as posters that link down to the full write-ups. */}
      <section id="case-studies" className="hw-dots relative scroll-mt-[72px] overflow-hidden bg-ink section-py text-bone" aria-label="Case studies">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">The stories</h2>
            <p className="mt-6 text-lg leading-relaxed text-bone/70">
              Two real engagements, written up with the client&rsquo;s numbers and the client&rsquo;s words.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
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

      <ClientQuotes />

      <Finale />
    </>
  );
}
