"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button, Eyebrow } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { KpiRibbon } from "@/components/kpi-ribbon";
import { WhyLatam } from "@/components/sections/why-latam";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { Finale } from "@/components/sections/finale";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { FlightPaths } from "@/components/flight-paths";
import { tinaField, useContent, useLiveDoc } from "@/components/tina/content";

/** Problem cards: dark gray, teal and light gray, no royal blue (W-68). */
const triggerTones = [
  { card: "border-ink bg-linear-to-br from-ink-300 to-ink text-bone", icon: "text-cyan" },
  { card: "border-cyan bg-linear-to-br from-cyan to-cyan-dim text-ink", icon: "text-ink" },
  { card: "border-ink/10 bg-white text-ink", icon: "text-cyan-dim" },
  { card: "border-ink bg-linear-to-br from-ink-300 to-ink text-bone", icon: "text-cyan" },
] as const;

export function IndustryView({ payload }: { payload: { data: any; query: string; variables: { relativePath?: string } } }) {
  const industry = useLiveDoc(payload, "industry");
  const slug = payload.variables.relativePath?.split("/").pop()?.replace(/\.json$/, "");
  const { logos, caseStudies, industriesPage, resultsPage, site } = useContent();
  // In the order listed on the industry, not the homepage order.
  const allLogos = logos as { slug: string; name: string; image?: string; hasImage?: boolean; stacked?: boolean }[];
  const proofLogos = ((industry.proofLogos as string[] | undefined) ?? [])
    .map((slug) => allLogos.find((logo) => logo.slug === slug))
    .filter((logo): logo is (typeof allLogos)[number] => Boolean(logo));
  const shownLogos = proofLogos.filter((logo) => logo.hasImage && logo.image);
  const study = industry.caseStudy
    ? (caseStudies as { slug: string; tag: string; title: string; subhead: string; heroStats: { label: string; value: string }[] }[]).find(
        (item) => item.slug === industry.caseStudy,
      )
    : null;

  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="absolute inset-0 md:left-auto md:w-[60%]">
          <Image
            src={industry.heroImage.src}
            alt={industry.heroImage.alt ?? ""}
            fill
            preload
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover grayscale mask-[linear-gradient(to_right,transparent,black_45%)] max-md:mask-none"
            style={{ objectPosition: industry.heroImage.focus }}
          />
          <div className="absolute inset-0 bg-ink/80 md:bg-ink/60 lg:bg-ink/45" aria-hidden="true" />
          {/* Scrim under the headline and subhead where they run onto the
              photo, so the text keeps WCAG AA contrast at every width. */}
          <div
            className="absolute inset-0 hidden bg-linear-to-r from-ink/90 via-ink/60 via-55% to-transparent md:block"
            aria-hidden="true"
          />
          {/* Above the tint so it reads on wide screens; phones crop the
              photo to the middle and dim it, so it's left off there. */}
          {slug === "corporate-relocation" && (
            <FlightPaths className="mask-[linear-gradient(to_right,transparent,black_45%)] max-md:hidden" />
          )}
        </div>
        <div className="shell relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: industriesPage.crumb, href: "/industries" },
              { label: industry.name },
            ]}
          />
          <Reveal>
            <Eyebrow className="mb-4">{industriesPage.eyebrow}</Eyebrow>
            <h1 data-tina-field={tinaField(industry, "name")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {industry.name}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-bone/80 md:text-xl">{industry.subhead}</p>
            {/* No "Dedicated teammates..." line under the button here (10/22 live review, W-66). */}
            <div className="mt-8">
              <Button href={site.bookCall}>{industriesPage.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* This industry's clients, grayed out on the same frosted dark strip as
          the homepage logos (10/22 live review, W-70). Logos without a file
          yet are left out rather than shown as text. */}
      {shownLogos.length > 0 && (
        <section
          className="border-y border-white/10 bg-ink py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          aria-label="Clients"
        >
          {/* More than six won't fit on one line, so those scroll like the homepage strip. */}
          {shownLogos.length > 6 ? (
            <LogoMarquee bare onDark only={shownLogos.map((logo) => logo.slug)} durationSeconds={shownLogos.length * 5} />
          ) : (
            <ul className="shell flex flex-wrap items-center justify-center gap-x-12 gap-y-3 md:gap-x-16">
              {shownLogos.map((logo) => (
                <li key={logo.slug} className="grid h-17 w-38 place-items-center">
                  <span className={`relative block w-full ${logo.stacked ? "h-15" : "h-8.5"}`}>
                    <Image src={logo.image!} alt={logo.name} fill sizes="160px" className="object-contain grayscale opacity-80 invert" />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="relative overflow-hidden bg-bone section-space text-ink">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{industry.problemHeadline}</h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-ink/70 md:text-lg">{industry.problemBody}</p>
          </Reveal>

          <ul className="section-gap grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Icons instead of numbers, in gray and teal only (10/22 live review, W-68). */}
            {industry.triggers.map((trigger: string, i: number) => {
              const tone = triggerTones[i % triggerTones.length];
              const icon = (industry.triggerIcons?.[i] || "target") as IconName;
              return (
                <Reveal key={trigger} delay={i * 90} as="li" className="h-full">
                  <div className={`flex h-full flex-col justify-between rounded-(--radius-card) border-2 p-6 ${tone.card}`}>
                    <Icon name={icon} strokeWidth={1.4} className={`h-10 w-10 ${tone.icon}`} />
                    <p className="mt-8 text-base font-semibold leading-snug">{trigger}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <KpiRibbon tone="light" className="mt-14 border-t border-ink/10 pt-8" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink section-space text-bone">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.1rem)]">{industry.rolesHeadline}</h2>
          </Reveal>

          <Reveal delay={110} className="section-gap">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industry.roles.map((role: { name: string; department?: string }) => {
                const department = role.department || "";
                const inner = (
                  <>
                    <span className="text-base font-bold leading-snug text-bone">{role.name}</span>
                    {department && (
                      <span aria-hidden="true" className="shrink-0 text-cyan transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    )}
                  </>
                );
                const box = "flex h-full items-center justify-between gap-4 rounded-(--radius-card) border-2 border-cyan/30 bg-ink-100 px-6 py-5";
                return (
                  <li key={role.name}>
                    {department ? (
                      <Link href={`/roles/${department}`} className={`group ${box} transition-colors duration-300 hover:border-cyan focus-visible:border-cyan focus-visible:outline-none`}>
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

          <p className="mt-8 border-l-4 border-cyan pl-5 text-base leading-relaxed text-bone/80 md:text-lg">{industry.rolesCloser}</p>
          <div className="mt-8">
            <Button href={site.bookCall}>{industriesPage.cta}</Button>
          </div>
        </div>
      </section>

      <WhyLatam />
      <HiringHighway compact />

      {study && (
        <section className="relative overflow-hidden bg-ink section-space text-bone" aria-label="Case study">
          <div className="shell relative">
            <Reveal>
              <Link
                href={`/results#${study.slug}`}
                className="group block rounded-(--radius-card) bg-linear-to-br from-royal to-azure-deep p-7 text-bone transition-transform duration-300 hover:-translate-y-1 md:p-10"
              >
                <p className="eyebrow text-sm text-bone/75">
                  {resultsPage.caseStudyKicker} &middot; {study.tag}
                </p>
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
                  {resultsPage.readStory}
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
