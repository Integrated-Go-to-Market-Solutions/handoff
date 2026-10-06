import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Button, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { VideoLoop } from "@/components/video-loop";
import { careersPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers | Handoff",
  description: careersPage.subhead,
};

/**
 * Careers, for talent rather than clients: Tom's content doc (10/5). Hero
 * with the "day with Handoff" reel, why Handoff, who we look for beside the
 * remote-culture reel, the four steps, and the apply CTA again. The client
 * Finale is left off on purpose; this page's ask is "apply", not "hire".
 */
export default function CareersPage() {
  const [dayReel, cultureReel] = careersPage.reels;

  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative grid items-center gap-10 md:grid-cols-[1fr_minmax(0,320px)] md:gap-16">
          <Reveal>
            <Eyebrow className="mb-4">{careersPage.eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.4rem,5.6vw,4.4rem)] text-bone">{careersPage.headline}</h1>
            <p className="mt-5 text-pretty text-lg font-medium leading-relaxed text-bone/85 md:text-xl">
              {careersPage.subhead}
            </p>
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

      {/* Light gray with the shared colored cards (10/5 color pass). */}
      <section className="relative overflow-hidden bg-bone section-py text-ink">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{careersPage.whyHeadline}</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {careersPage.why.map((item, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal as="li" key={item.lead} delay={i * 80} className="h-full">
                  <div className={`h-full rounded-[var(--radius-card)] p-7 md:p-8 ${cardGlow} ${tone.card}`}>
                    <p className={`text-pretty text-base leading-relaxed md:text-lg ${tone.muted}`}>
                      <span className={`font-semibold ${tone.accent}`}>{item.lead}</span> {item.rest}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-py text-bone">
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

      <section className="relative overflow-hidden bg-ink pb-16 text-bone md:pb-24">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{careersPage.stepsHeadline}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {careersPage.steps.map((step, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal as="li" key={step.title} delay={i * 90} className="h-full">
                  <div className={`flex h-full flex-col rounded-[var(--radius-card)] p-6 ${cardGlow} ${tone.card}`}>
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

          <div className="mt-12 rounded-[var(--radius-card)] border-2 border-cyan bg-gradient-to-br from-royal to-azure-deep p-7 text-center shadow-[0_0_44px_-14px_rgba(61,214,189,0.55)] md:p-10">
            <Button href={careersPage.cta.href} size="lg">
              {careersPage.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
