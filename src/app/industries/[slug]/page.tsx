import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Button, CtaNote, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { KpiRibbon } from "@/components/kpi-ribbon";
import { WhyLatam } from "@/components/sections/why-latam";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { Finale } from "@/components/sections/finale";
import { caseStudies, industries, logos, site } from "@/lib/content";

/**
 * One template, one data file, in the order of Near's industry pages
 * (hirewithnear.com/industries/marketing), which Anthony pointed to on 10/5
 * for its UX: breadcrumb and industry hero, client logos, the problem,
 * proof numbers, the roles (each linking to its department page), why
 * nearshore, the process, a case study, quotes, the closing CTA. These stay
 * part of the site (same header and footer), not standalone landing pages.
 *
 * Copy is Tom's content doc. Near's sections with no Handoff content behind
 * them (differentiator cards, salary table, industry FAQ) are left out.
 * Logos show only where the doc marks the names as cleared, and the case
 * study only where an existing /results write-up fits.
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

  const proofLogos = logos.filter((logo) =>
    (industry.proofLogos as readonly string[]).includes(logo.slug),
  );
  const study = caseStudies.find((s) => s.slug === industry.caseStudy);

  return (
    <>
      {/* Hero: breadcrumb, industry name, the doc's subhead, one CTA. */}
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        {/* Tom's header photo (10/7): grayscale, on the right, fading in from
            the left so the text keeps a solid dark background. Phones get it
            behind the text under a heavier scrim. */}
        <div className="absolute inset-0 md:left-auto md:w-[60%]" aria-hidden="true">
          <Image
            src={industry.heroImage.src}
            alt=""
            fill
            preload
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover grayscale [mask-image:linear-gradient(to_right,transparent,black_45%)] max-md:[mask-image:none]"
            style={{ objectPosition: industry.heroImage.focus }}
          />
          <div className="absolute inset-0 bg-ink/80 md:bg-ink/35" />
        </div>
        <div className="shell relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-bone/60">
            {/* Links get a 36px-tall tap area; the negative margin keeps the
                trail's spacing (UX QA, 10/6). */}
            <Link href="/" className="-my-2.5 inline-block py-2.5 transition-colors hover:text-cyan">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2">
              &rarr;
            </span>
            <Link href="/industries" className="-my-2.5 inline-block py-2.5 transition-colors hover:text-cyan">
              Industries
            </Link>
            <span aria-hidden="true" className="mx-2">
              &rarr;
            </span>
            <span className="text-bone/85">{industry.name}</span>
          </nav>
          <Reveal>
            <Eyebrow className="mb-4">Industries we serve</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">{industry.name}</h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-bone/80 md:text-xl">
              {industry.subhead}
            </p>
            <div className="mt-8">
              <Button href={site.bookCall}>Book a call</Button>
              <CtaNote className="mt-3" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cleared client names only (per the content doc). Static, no marquee. */}
      {proofLogos.length > 0 && (
        <section className="border-y border-ink/10 bg-white py-3" aria-label="Clients">
          <ul className="shell flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
            {proofLogos.map((logo) => (
              <li key={logo.slug}>
                {logo.hasImage ? (
                  <span className="relative block h-24 w-[240px]">
                    <Image
                      src={`/images/logos/${logo.slug}.webp`}
                      alt={logo.name}
                      fill
                      sizes="240px"
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <span className="display text-xl text-ink/70">{logo.name}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* The problem and the four triggers, on light gray with the site's
          colored cards (10/5: color pass). */}
      <section className="relative overflow-hidden bg-bone section-py text-ink">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{industry.problemHeadline}</h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-ink/70 md:text-lg">
              {industry.problemBody}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {industry.triggers.map((trigger, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal key={trigger} delay={i * 90} as="li" className="h-full">
                  <div className={`flex h-full flex-col justify-between rounded-[var(--radius-card)] p-6 ${cardGlow} ${tone.card}`}>
                    <span className={`display text-2xl ${tone.accent}`} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-8 text-base font-semibold leading-snug">{trigger}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <KpiRibbon tone="light" className="mt-14 border-t border-ink/10 pt-8" />
        </div>
      </section>

      {/* The roles. Each links to its department page (10/5 call); a role
          with no clear department in Anthony's list stays plain. */}
      <section className="relative overflow-hidden bg-ink section-py text-bone">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.1rem)]">{industry.rolesHeadline}</h2>
          </Reveal>

          <Reveal delay={110} className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industry.roles.map((role) => {
                const department = "department" in role ? role.department : null;
                const inner = (
                  <>
                    <span className="text-base font-bold leading-snug text-bone">{role.name}</span>
                    {department && (
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-cyan transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    )}
                  </>
                );
                const box =
                  "flex h-full items-center justify-between gap-4 rounded-[var(--radius-card)] border-2 border-cyan/30 bg-ink-100 px-6 py-5";
                return (
                  <li key={role.name}>
                    {department ? (
                      <Link
                        href={`/roles/${department}`}
                        className={`group ${box} transition-colors duration-300 hover:border-cyan focus-visible:border-cyan focus-visible:outline-none`}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className={box}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <p className="mt-8 border-l-4 border-cyan pl-5 text-base leading-relaxed text-bone/80 md:text-lg">
            {industry.rolesCloser}
          </p>
          <div className="mt-8">
            <Button href={site.bookCall}>Book a call</Button>
          </div>
        </div>
      </section>

      <WhyLatam />
      <HiringHighway compact />

      {study && (
        <section className="relative overflow-hidden bg-ink section-py text-bone" aria-label="Case study">
          <div className="shell relative">
            <Reveal>
              <Link
                href={`/results#${study.slug}`}
                className="group block rounded-[var(--radius-card)] bg-gradient-to-br from-royal to-azure-deep p-7 text-bone transition-transform duration-300 hover:-translate-y-1 md:p-10"
              >
                <p className="eyebrow text-sm text-bone/75">Case study &middot; {study.tag}</p>
                <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight">{study.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-bone/85 md:text-lg">{study.subhead}</p>
                <dl className="mt-8 grid grid-cols-3 gap-4">
                  {study.heroStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className="mt-1 text-xs font-semibold text-bone/75 md:text-sm">{stat.label}</dt>
                      <dd className="display text-[clamp(1.3rem,3.6vw,2.4rem)] leading-none">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold">
                  Read the story
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <ClientQuotes />
      <Finale />
    </>
  );
}
