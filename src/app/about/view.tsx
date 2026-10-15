"use client";

import { Reveal } from "@/components/reveal";
import { TalentCard } from "@/components/talent-card";
import { Soul } from "@/components/sections/soul";
import { ValuesVideo } from "@/components/sections/values-video";
import { SocialLinks } from "@/components/social-links";
import { tinaField, useContent } from "@/components/tina/content";
import { Button, cardGlow, cardTones } from "@/components/brand";

export function AboutView() {
  const { aboutPage, site, team } = useContent();
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-hero">
        <div className="shell relative">
          <Reveal>
            <h1 data-tina-field={tinaField(aboutPage, "headline")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {aboutPage.headline}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{aboutPage.lead}</p>
          </Reveal>

          <Reveal delay={150}>
            <SocialLinks />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink pb-20 text-bone md:pb-32">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{aboutPage.gap.headline}</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{aboutPage.gap.body}</p>
          </Reveal>

          <Reveal delay={90} className="mt-16">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{aboutPage.winWin.headline}</h2>
          </Reveal>
          <div className="section-gap grid gap-4 md:grid-cols-2">
            {aboutPage.winWin.sides.map((side: { title: string; body: string }, i: number) => {
              const tone = cardTones[i === 0 ? 1 : 0];
              return (
                <Reveal key={side.title} delay={i * 90} className="h-full">
                  <div className={`h-full rounded-(--radius-card) p-7 md:p-8 ${cardGlow} ${tone.card}`}>
                    <h3 className="text-base font-semibold uppercase tracking-[0.04em] md:text-lg">{side.title}</h3>
                    <p className={`mt-3 text-pretty text-base leading-relaxed md:text-lg ${tone.muted}`}>{side.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-8 text-pretty border-l-4 border-cyan pl-5 text-base leading-relaxed text-bone/80 md:text-lg">
            {aboutPage.winWin.closer}
          </p>

          <Reveal className="mt-16">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{aboutPage.founder.headline}</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{aboutPage.founder.body}</p>
          </Reveal>
        </div>
      </section>

      <ValuesVideo />

      <section className="bg-ink section-space text-bone">
        <div className="shell">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{aboutPage.teamHeadline}</h2>
          </Reveal>
        </div>
        <div className="shell section-gap flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
          {team.map((person, i) => (
            <TalentCard key={person.slug} slug={person.slug} name={person.name} role={person.role} photo={person.photo} index={i} />
          ))}
        </div>
      </section>

      <Soul variant="dictionary" />

      <section className="bg-ink section-space text-bone">
        <div className="shell">
          <Reveal>
            <p className="display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-tight">{aboutPage.close}</p>
            <div className="mt-8">
              <Button href={site.bookCall}>{aboutPage.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
