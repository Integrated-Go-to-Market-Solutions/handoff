import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Button, CtaNote, Eyebrow } from "@/components/brand";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Finale } from "@/components/sections/finale";
import { services, site } from "@/lib/content";

/**
 * The two service pages, Direct Hire and Managed Staffing, from Tom's
 * content doc (10/5). Same page frame as the department and industry pages:
 * breadcrumb, name, subhead, one CTA; then how it works, what the client
 * handles or what's included, best fit with a link to the other model, the
 * hiring system both run on, and the closing CTA. Linked from the pricing
 * table's column headers.
 */
const findService = (slug: string) => services.find((service) => service.slug === slug);

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/**
 * Two-way switch between the service pages (Tom, 10/5: visitors got stuck
 * on one model). Shown under the hero and again above the final CTA; the
 * current page is the filled option.
 */
function ServiceSwitch({ current, className = "" }: { current: string; className?: string }) {
  return (
    <nav aria-label="Switch service" className={className}>
      <ul className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1">
        {services.map((s) => {
          const active = s.slug === current;
          return (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                  active ? "bg-cyan text-ink" : "text-bone/75 hover:text-cyan"
                }`}
              >
                {s.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return { title: `${service.name} | Handoff`, description: service.subhead };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-bone/60">
            <Link href="/" className="transition-colors hover:text-cyan">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2">
              &rarr;
            </span>
            <Link href="/#models" className="transition-colors hover:text-cyan">
              Pricing
            </Link>
            <span aria-hidden="true" className="mx-2">
              &rarr;
            </span>
            <span className="text-bone/85">{service.name}</span>
          </nav>
          <ServiceSwitch current={service.slug} className="mb-8" />
          <Reveal>
            <Eyebrow className="mb-4">Two ways to work together</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">{service.name}</h1>
            <p className="mt-5 text-pretty text-lg font-medium leading-relaxed text-bone/80 md:text-xl">
              {service.subhead}
            </p>
            <div className="mt-8">
              <Button href={site.bookCall}>Book a call</Button>
              <CtaNote className="mt-3" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink pb-16 text-bone md:pb-24">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">How it works</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{service.howItWorks}</p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7 md:p-8">
                <h2 className="text-base font-semibold uppercase tracking-[0.04em] text-cyan md:text-lg">
                  {service.detailHeadline}
                </h2>
                {service.detailBody && (
                  <p className="mt-3 text-pretty text-base leading-relaxed text-bone/80 md:text-lg">{service.detailBody}</p>
                )}
                {service.detailList.length > 0 && (
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {service.detailList.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-base text-bone/85 md:text-lg">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            <Reveal delay={90} className="h-full">
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border-2 border-cyan/40 bg-white/[0.04] p-7 md:p-8">
                <h2 className="text-base font-semibold uppercase tracking-[0.04em] text-cyan md:text-lg">Best fit</h2>
                <p className="mt-3 flex-1 text-pretty text-base leading-relaxed text-bone/80 md:text-lg">{service.bestFit}</p>
                <Link
                  href={`/services/${service.other.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cyan hover:underline"
                >
                  {service.other.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={site.bookCall}>Book a call</Button>
            <ServiceSwitch current={service.slug} />
          </div>
        </div>
      </section>

      <HiringHighway compact />
      <Finale />
    </>
  );
}
