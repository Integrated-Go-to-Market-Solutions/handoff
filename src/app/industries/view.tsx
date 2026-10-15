"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
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

      <section className="relative overflow-hidden bg-bone section-space text-ink">
        <div className="shell relative">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal as="li" key={industry.slug} delay={Math.min(i, 5) * 70} className="h-full">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className={`group flex h-full flex-col rounded-(--radius-card) p-7 focus-visible:outline-none md:p-8 ${cardGlow} ${tone.card}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Icon name={industry.icon as IconName} strokeWidth={1.25} className={`h-11 w-11 ${tone.accent}`} />
                      <span aria-hidden="true" className={`text-xl transition-transform duration-300 group-hover:translate-x-1 ${tone.accent}`}>
                        &rarr;
                      </span>
                    </div>
                    <h2 className="mt-6 text-base font-semibold uppercase tracking-[0.04em] md:text-lg">{industry.name}</h2>
                    <p className={`mt-2 text-[0.95rem] leading-relaxed ${tone.muted}`}>{industry.descriptor}</p>
                  </Link>
                </Reveal>
              );
            })}
            <Reveal as="li" delay={350} className="h-full">
              <div className="flex h-full flex-col rounded-(--radius-card) border-2 border-cyan bg-linear-to-br from-royal to-azure-deep p-7 text-bone shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] md:p-8">
                <h2 className="text-base font-semibold uppercase tracking-[0.04em] text-white md:text-lg">{industriesPage.otherHeadline}</h2>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-bone/90">{industriesPage.otherBody}</p>
                <div className="mt-6">
                  <Button href={site.bookCall}>{industriesPage.cta}</Button>
                </div>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      <Finale />
    </>
  );
}
