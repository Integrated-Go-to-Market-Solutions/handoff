"use client";

import { Icon, type IconName } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Button, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { VideoLoop } from "@/components/video-loop";
import { tinaField, useContent } from "@/components/tina/content";

export function CareersView() {
  const { careersPage } = useContent();
  const [dayReel, cultureReel] = careersPage.reels;

  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative grid items-center gap-10 md:grid-cols-[1fr_minmax(0,320px)] md:gap-16">
          <Reveal>
            <Eyebrow className="mb-4">{careersPage.eyebrow}</Eyebrow>
            <h1 data-tina-field={tinaField(careersPage, "headline")} className="display text-[clamp(2.4rem,5.6vw,4.4rem)] text-bone">
              {careersPage.headline}
            </h1>
            <p className="mt-5 text-pretty text-lg font-medium leading-relaxed text-bone/85 md:text-xl">{careersPage.subhead}</p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-bone/70 md:text-lg">{careersPage.body}</p>
            <div className="mt-8">
              <Button href={careersPage.cta.href}>{careersPage.cta.label}</Button>
            </div>
          </Reveal>
          <Reveal delay={110} className="mx-auto w-full max-w-[320px]">
            <VideoLoop {...dayReel} />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone section-space text-ink">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{careersPage.whyHeadline}</h2>
          </Reveal>
          <ul className="section-gap grid gap-4 sm:grid-cols-2">
            {/* Gray cards with an icon each (10/28 live review, W-79). */}
            {careersPage.why.map((item: { lead: string; rest: string; icon?: string }, i: number) => (
              <Reveal as="li" key={item.lead} delay={i * 80} className="h-full">
                <div className="h-full rounded-(--radius-card) border-2 border-ink bg-linear-to-br from-ink-300 to-ink p-7 text-bone md:p-8">
                  <Icon name={(item.icon || "star") as IconName} strokeWidth={1.4} className="h-10 w-10 text-cyan" />
                  <p className="mt-6 text-pretty text-base leading-relaxed text-bone/75 md:text-lg">
                    <span className="font-semibold text-white">{item.lead}</span> {item.rest}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-space text-bone">
        <div className="shell relative grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <Reveal className="order-2 mx-auto w-full max-w-[320px] md:order-1">
            <VideoLoop {...cultureReel} />
          </Reveal>
          <Reveal className="order-1 md:order-2">
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{careersPage.lookForHeadline}</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/80 md:text-xl">{careersPage.lookFor}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink pb-20 text-bone md:pb-32">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{careersPage.stepsHeadline}</h2>
          </Reveal>
          <ol className="section-gap grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {careersPage.steps.map((step: { title: string; body: string }, i: number) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal as="li" key={step.title} delay={i * 90} className="h-full">
                  <div className={`flex h-full flex-col rounded-(--radius-card) p-6 ${cardGlow} ${tone.card}`}>
                    <span className={`display text-2xl ${tone.accent}`} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 text-lg font-semibold leading-snug">{step.title}</h3>
                    <p className={`mt-2 text-pretty text-base leading-relaxed ${tone.muted}`}>{step.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <div className="mt-12 rounded-(--radius-card) border-2 border-cyan bg-linear-to-br from-royal to-azure-deep p-7 text-center shadow-[0_0_44px_-14px_rgba(61,214,189,0.55)] md:p-10">
            <Button href={careersPage.cta.href} size="lg">
              {careersPage.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
