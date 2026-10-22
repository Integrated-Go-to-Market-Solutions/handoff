"use client";

import { Reveal } from "@/components/reveal";
import { Button, Eyebrow } from "@/components/brand";
import { IndustryCards } from "@/components/sections/industry-cards";
import { Finale } from "@/components/sections/finale";
import { tinaField, useContent } from "@/components/tina/content";

export function IndustriesView() {
  const { industries, industriesPage, site } = useContent();
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Reveal>
            <Eyebrow className="mb-4">{industriesPage.eyebrow}</Eyebrow>
            <h1 data-tina-field={tinaField(industriesPage, "headline")} className="display text-[clamp(2.3rem,5.5vw,4.2rem)]">
              {industriesPage.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-bone/75 md:text-xl">{industriesPage.body}</p>
          </Reveal>
        </div>
      </section>

      {/* Same photo cards as the homepage (10/22 live review, W-65). */}
      <section className="relative overflow-hidden bg-ink text-bone" aria-label={industriesPage.crumb}>
        <div className="hw-dots pb-20 md:pb-28">
          <div className="shell relative">
            <IndustryCards industries={industries} />

            <Reveal className="mt-10 rounded-(--radius-card) border-2 border-cyan/40 bg-ink-100 p-7 md:flex md:items-center md:justify-between md:gap-10 md:p-9">
              <div>
                <h2 className="text-base font-semibold uppercase tracking-[0.04em] text-white md:text-lg">{industriesPage.otherHeadline}</h2>
                <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-bone/80">{industriesPage.otherBody}</p>
              </div>
              <div className="mt-6 shrink-0 md:mt-0">
                <Button href={site.bookCall}>{industriesPage.cta}</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Finale />
    </>
  );
}
