"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button, CtaNote, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Finale } from "@/components/sections/finale";
import { tinaField, useContent, useLiveDoc } from "@/components/tina/content";

function ServiceSwitch({ current, className = "", light = false }: { current: string; className?: string; light?: boolean }) {
  const { services } = useContent();
  return (
    <nav aria-label="Switch service" className={className}>
      <ul className={`inline-flex rounded-full border p-1 ${light ? "border-ink/15 bg-white" : "border-white/15 bg-white/4"}`}>
        {(services as { slug: string; name: string }[]).map((service) => {
          const active = service.slug === current;
          return (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                  active ? "bg-cyan text-ink" : light ? "text-ink/70 hover:text-royal" : "text-bone/75 hover:text-cyan"
                }`}
              >
                {service.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ServiceView({ payload }: { payload: { data: any; query: string; variables: { relativePath?: string } } }) {
  const service = useLiveDoc(payload, "service");
  const { servicesPage, modelsIntro, site } = useContent();

  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative z-2">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: servicesPage.crumb }, { label: service.name }]} />
          <ServiceSwitch current={service.slug} className="mb-8" />
          <Reveal>
            <Eyebrow className="mb-4">{modelsIntro.headline}</Eyebrow>
            <h1 data-tina-field={tinaField(service, "name")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {service.name}
            </h1>
            <p className="mt-5 text-pretty text-lg font-medium leading-relaxed text-bone/80 md:text-xl">{service.subhead}</p>
            <div className="mt-8">
              <Button href={site.bookCall}>{modelsIntro.cta}</Button>
              <CtaNote className="mt-3" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink pb-20 text-bone md:pb-32">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{servicesPage.howHeadline}</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{service.howItWorks}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone section-space text-ink">
        <div className="shell relative">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <div className={`h-full rounded-(--radius-card) p-7 md:p-8 ${cardGlow} ${cardTones[1].card}`}>
                <h2 className="text-base font-semibold uppercase tracking-[0.04em] text-white md:text-lg">{service.detailHeadline}</h2>
                {service.detailBody && (
                  <p className="mt-3 text-pretty text-base leading-relaxed text-bone/90 md:text-lg">{service.detailBody}</p>
                )}
                {service.detailList?.length > 0 && (
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {service.detailList.map((item: string) => (
                      <li key={item} className="flex items-center gap-3 text-base text-bone md:text-lg">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            <Reveal delay={90} className="h-full">
              <div className={`flex h-full flex-col rounded-(--radius-card) p-7 md:p-8 ${cardGlow} ${cardTones[0].card}`}>
                <h2 className="text-base font-semibold uppercase tracking-[0.04em] md:text-lg">{servicesPage.bestFitHeadline}</h2>
                <p className="mt-3 flex-1 text-pretty text-base leading-relaxed text-ink/80 md:text-lg">{service.bestFit}</p>
                <Link
                  href={`/services/${service.other.slug}`}
                  className="-mb-2.5 mt-3.5 inline-flex items-center gap-1.5 py-2.5 text-sm font-bold text-ink underline-offset-4 hover:underline"
                >
                  {service.other.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={site.bookCall}>{modelsIntro.cta}</Button>
            <ServiceSwitch current={service.slug} light />
          </div>
        </div>
      </section>

      <HiringHighway compact />
      <Finale />
    </>
  );
}
