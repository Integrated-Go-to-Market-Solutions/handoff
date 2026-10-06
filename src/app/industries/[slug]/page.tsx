import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { HeroBright } from "@/components/sections/hero-bright";
import { Stats } from "@/components/sections/stats";
import { Models } from "@/components/sections/models";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { Finale } from "@/components/sections/finale";
import { industries } from "@/lib/content";

/**
 * One template, one data file. The homepage stays deliberately general so
 * nobody bounces because they do not see their own industry; these pages sit
 * underneath it and talk to one room at a time.
 *
 * Structure is the homepage's, in the homepage's order: same header, the
 * industry's own problem and triggers, the roles we fill there, the same
 * three models, proof, the same closing CTA.
 */
const findIndustry = (slug: string) =>
  industries.find((industry) => industry.slug === slug);

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const industry = findIndustry((await params).slug);
  if (!industry) return {};

  return {
    title: `${industry.name} | Handoff`,
    description: industry.subhead,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const industry = findIndustry((await params).slug);
  if (!industry) notFound();

  return (
    <>
      <HeroBright subhead={industry.subhead} />
      <Stats />

      <section className="relative overflow-hidden bg-ink section-py text-bone">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">
              {industry.problemHeadline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-bone/70 md:text-lg">
              {industry.problemBody}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {industry.triggers.map((trigger, i) => (
              <Reveal key={trigger} delay={i * 90} as="li" className="h-full">
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6">
                  <span
                    className="display text-2xl text-cyan"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-8 text-base font-semibold leading-snug text-bone">
                    {trigger}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-py text-bone">
        {/* Stacked, not side by side (10/5): the content doc's roles
            headlines run long, and in a half-width column they broke into
            five or six lines. */}
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.1rem)]">
              {industry.rolesHeadline}
            </h2>
          </Reveal>

          <Reveal delay={110} className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industry.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] px-6 py-5 text-base font-bold text-bone"
                >
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>

          <p className="mt-8 border-l-4 border-cyan pl-5 text-base leading-relaxed text-bone/80 md:text-lg">
            {industry.rolesCloser}
          </p>
        </div>
      </section>

      <Models detailed />
      <ClientQuotes />
      <Finale />
    </>
  );
}
