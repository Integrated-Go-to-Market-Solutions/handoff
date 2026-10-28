"use client";

import { Reveal } from "@/components/reveal";
import { Soul } from "@/components/sections/soul";
import { ValuesVideo } from "@/components/sections/values-video";
import { SocialLinks } from "@/components/social-links";
import { tinaField, useContent } from "@/components/tina/content";
import { Button } from "@/components/brand";

export function AboutView() {
  const { aboutPage, site } = useContent();
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

      {/* After the hero: what holds us together, Alma, and where we're going,
          in that order (10/28 live review, W-76). "Talent is everywhere",
          "A win on both sides", "The founder" and "Our team" came off the
          page (W-77); their copy stays in Tina. */}
      {(aboutPage.beats ?? []).map((beat: { lead: string; body: string }, i: number) => {
        const light = i % 2 === 1;
        return (
          <section
            key={beat.lead}
            className={`relative overflow-hidden section-space ${light ? "bg-bone text-ink" : "bg-ink text-bone"} ${i === 0 ? "pt-0!" : ""}`}
          >
            <div className="shell relative">
              <Reveal className="max-w-4xl">
                <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{beat.lead}</h2>
                <p className={`mt-6 text-pretty text-lg leading-relaxed md:text-xl ${light ? "text-ink/75" : "text-bone/80"}`}>
                  {beat.body}
                </p>
              </Reveal>
            </div>
          </section>
        );
      })}

      <ValuesVideo />

      <Soul variant="dictionary" />

      {/* Ends on the tagline and Book a call (W-78). */}
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
