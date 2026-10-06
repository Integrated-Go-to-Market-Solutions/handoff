import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button, Eyebrow } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { Finale } from "@/components/sections/finale";
import { industries, industriesPage, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries | Handoff",
  description: industriesPage.body,
};

/**
 * The industries overview, after Near's /industries page: a short intro, a
 * tile per industry, then the catch-all and the CTA full width under the
 * grid. Copy and layout notes are from Tom's content doc (Industries Menu
 * tab): tiles carry name, one-line descriptor and link only, no fees,
 * numbers or logos, and match the homepage industry tiles so the two read
 * as one system. Grid on desktop, single column on phones.
 */
export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Reveal>
            <Eyebrow className="mb-4">{industriesPage.eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.3rem,5.5vw,4.2rem)]">{industriesPage.headline}</h1>
            <p className="mt-5 text-lg leading-relaxed text-bone/75 md:text-xl">{industriesPage.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink pb-16 text-bone md:pb-24">
        <div className="shell relative">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal as="li" key={industry.slug} delay={Math.min(i, 5) * 70} className="h-full">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border-2 border-white/15 p-7 transition-colors duration-300 hover:border-cyan hover:bg-white/[0.04] focus-visible:border-cyan focus-visible:outline-none md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon name={industry.icon as IconName} strokeWidth={1.25} className="h-11 w-11 text-cyan" />
                    <span
                      aria-hidden="true"
                      className="text-xl text-cyan transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </div>
                  <h2 className="mt-6 text-base font-semibold uppercase tracking-[0.04em] text-white md:text-lg">
                    {industry.name}
                  </h2>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/70">{industry.descriptor}</p>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-6 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7 md:p-10">
            <h2 className="display text-[clamp(1.5rem,3vw,2.2rem)] leading-tight">{industriesPage.otherHeadline}</h2>
            <p className="mt-4 text-base leading-relaxed text-bone/75 md:text-lg">{industriesPage.otherBody}</p>
            <div className="mt-7">
              <Button href={site.bookCall}>{industriesPage.cta}</Button>
            </div>
          </div>
        </div>
      </section>

      <Finale />
    </>
  );
}
