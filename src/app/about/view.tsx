"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { VideoLoop } from "@/components/video-loop";
import { YouTubeCard } from "@/components/youtube-card";
import { SocialLinks } from "@/components/social-links";
import { Finale } from "@/components/sections/finale";
import { tinaField, useContent } from "@/components/tina/content";

/** "01 — Our values": the number, a short rule, then the label. */
function SectionLabel({ n, children, tone }: { n: string; children: React.ReactNode; tone: "royal" | "cyan" | "ink" }) {
  const color = { royal: "text-royal", cyan: "text-cyan", ink: "text-ink" }[tone];
  return (
    <p className={`eyebrow flex items-center gap-2.5 text-xs tracking-[0.2em] md:text-[0.8125rem] ${color}`}>
      <span>{n}</span>
      <span aria-hidden="true" className="h-px w-5 bg-current" />
      <span>{children}</span>
    </p>
  );
}

/** Letter badges on the value pills: teal, royal, ink. */
const badgeTones = ["bg-cyan text-ink", "bg-royal text-white", "bg-ink text-white"];

/**
 * /about, rebuilt to Handoff's 11/1 mockup: hero with the LATAM Excellence
 * video, the values beside the values reel, the 1,000,000 goal on teal, the
 * purpose on white, Alma as a dictionary entry over the team photo, then the
 * site-wide closing scene. "Talent is everywhere", "A win on both sides",
 * "The founder", "Our team" and the old closing line stay in Tina, unused.
 */
export function AboutView() {
  const { aboutPage } = useContent();
  const { values, goal, purpose, alma, heroVideo, valuesVideo } = aboutPage;

  return (
    <>
      {/* 1. Hero and the LATAM Excellence video */}
      <section className="relative overflow-hidden bg-ink section-py-hero text-bone">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full border border-cyan/20 max-md:hidden"
        />
        <div className="shell relative">
          <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-14">
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5 text-xs tracking-[0.2em] text-cyan md:text-[0.8125rem]">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                {aboutPage.eyebrow}
              </p>
              <h1 data-tina-field={tinaField(aboutPage, "headline")} className="display mt-5 text-[clamp(3rem,7.5vw,6rem)] text-bone">
                {aboutPage.headline} <span className="block text-cyan">{aboutPage.headlineAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-pretty text-base leading-relaxed text-bone/75 md:text-lg">
                {aboutPage.lead} <strong className="font-semibold text-bone">{aboutPage.leadStrong}</strong>
              </p>
              <SocialLinks pills />
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-12 md:mt-16">
            <div data-tina-field={tinaField(aboutPage, "heroVideo")}>
              <YouTubeCard id={heroVideo.youtubeId} title={heroVideo.title} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Values beside the values reel */}
      <section className="relative overflow-hidden bg-bone section-space text-ink">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_minmax(0,320px)] md:gap-16 lg:grid-cols-[1fr_minmax(0,340px)]">
          <Reveal>
            <SectionLabel n="01" tone="royal">
              {values.eyebrow}
            </SectionLabel>
            <h2 data-tina-field={tinaField(aboutPage, "values")} className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">
              {values.headline}
            </h2>
            <ul className="mt-8 max-w-lg space-y-3">
              {values.items.map((value: { name: string; line: string }, i: number) => (
                <li key={value.name} className="flex items-center gap-4 rounded-full bg-white py-2.5 pl-2.5 pr-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <span
                    aria-hidden="true"
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${badgeTones[i % badgeTones.length]}`}
                  >
                    {value.name.charAt(0)}
                  </span>
                  <span>
                    <span className="display block text-lg leading-tight text-royal md:text-xl">{value.name}</span>
                    <span className="block text-sm leading-snug text-ink/70 md:text-base">{value.line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={110} className="relative mx-auto w-full max-w-80 lg:max-w-85">
            <div aria-hidden="true" className="absolute -right-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-cyan md:-right-16 md:h-56 md:w-56" />
            <div className="relative shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
              <VideoLoop src={valuesVideo.src} poster={valuesVideo.poster} name={valuesVideo.name} caption={valuesVideo.caption} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. The goal, on teal */}
      <section className="relative overflow-hidden bg-cyan section-space text-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full border border-ink/15 max-md:hidden"
        />
        <div className="shell relative">
          <Reveal>
            <SectionLabel n="02" tone="ink">
              {goal.eyebrow}
            </SectionLabel>
            <p data-tina-field={tinaField(goal, "number")} className="display mt-5 text-[clamp(4rem,15vw,11rem)] leading-[0.85] tracking-[-0.04em]">
              {goal.number}
            </p>
            <p className="mt-6 max-w-[34ch] text-pretty text-xl font-semibold leading-snug md:mt-8 md:text-2xl">{goal.body}</p>
          </Reveal>
        </div>
      </section>

      {/* 4. Purpose, on white */}
      <section className="relative overflow-hidden bg-white section-space text-ink">
        <div className="shell grid gap-8 md:grid-cols-2 md:gap-14">
          <Reveal>
            <SectionLabel n="03" tone="royal">
              {purpose.eyebrow}
            </SectionLabel>
            <h2 data-tina-field={tinaField(purpose, "headline")} className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">
              {purpose.headline}
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:pt-8">
            <p className="text-pretty text-xl font-semibold leading-snug md:text-2xl">
              {purpose.lead} <span className="text-royal">{purpose.accent}</span>
            </p>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/70 md:text-lg">{purpose.body}</p>
          </Reveal>
        </div>
      </section>

      {/* 5. Alma, as a dictionary entry over the team photo */}
      <section className="relative overflow-hidden bg-ink section-space text-bone">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={alma.background} alt="" fill sizes="100vw" className="object-cover grayscale" />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] bg-size-[14px_14px]" />
        </div>
        <div className="shell relative text-center">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel n="04" tone="cyan">
                {alma.eyebrow}
              </SectionLabel>
            </div>
          </Reveal>
          <div className="mx-auto mt-4 inline-flex flex-col items-center md:mt-6">
            <Reveal>
              <h2 data-tina-field={tinaField(alma, "headword")} className="font-serif text-[clamp(5.5rem,20vw,14rem)] lowercase leading-[0.85] tracking-[-0.01em] text-bone">
                {alma.headword}
              </h2>
            </Reveal>
            <Reveal delay={300} className="w-full">
              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-bone/70 md:text-base">
                <span>{alma.pronunciation}</span>
                <span aria-hidden="true" className="text-cyan">•</span>
                <em className="italic">{alma.partOfSpeech}</em>
                <span aria-hidden="true" className="text-cyan">•</span>
                <span>{alma.gloss}</span>
              </p>
              <hr className="mt-6 w-full border-t border-bone/25 md:mt-8" />
            </Reveal>
          </div>
          <Reveal delay={450}>
            <p className="mx-auto mt-6 max-w-[46ch] text-pretty text-base leading-relaxed text-bone/75 md:mt-8 md:text-lg">{alma.body}</p>
            <p className="mt-5 text-lg font-semibold text-bone/45 line-through decoration-bone/60 md:text-xl">{alma.struck}</p>
            <p className="mt-2 text-[clamp(1.6rem,3.6vw,2.6rem)] font-bold leading-tight tracking-[-0.02em]">
              {alma.line} <span className="text-cyan">{alma.accent}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <Finale />
    </>
  );
}
