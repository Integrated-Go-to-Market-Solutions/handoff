"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/brand";
import { Finale } from "@/components/sections/finale";
import { TalentVideos } from "@/components/sections/talent-videos";
import { tinaField, useContent } from "@/components/tina/content";

export function RolesView() {
  const { departments, rolesPage, site } = useContent();
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Reveal>
            <h1 data-tina-field={tinaField(rolesPage, "headline")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {rolesPage.headline}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-bone/80">{rolesPage.subhead}</p>
          </Reveal>
        </div>
        <TalentVideos videos={rolesPage.videos ?? []} departments={departments} hint={rolesPage.videosHint} />
      </section>

      <section className="relative overflow-hidden bg-bone section-space text-ink">
        <div className="shell relative">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* One gray box style instead of the multicolor cards (10/28 live review, W-74). */}
            {departments.map((department, i) => {
              const tone = { accent: "text-cyan", muted: "text-bone/70" };
              return (
                <Reveal key={department.slug} delay={Math.min(i, 5) * 60} as="li" className="h-full">
                  <Link
                    href={`/roles/${department.slug}`}
                    className="group flex h-full flex-col rounded-(--radius-card) border-2 border-ink bg-linear-to-br from-ink-300 to-ink p-6 text-bone transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan focus-visible:border-cyan focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="display text-xl leading-tight md:text-2xl">{department.name}</h2>
                      <span aria-hidden="true" className={`mt-0.5 shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-1 ${tone.accent}`}>
                        &rarr;
                      </span>
                    </div>
                    <ul className={`mt-4 space-y-1.5 text-[0.95rem] leading-snug ${tone.muted}`}>
                      {(department.roles || []).slice(0, 3).map((role: string) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <p className="mt-10 border-l-4 border-cyan pl-5 text-base leading-relaxed text-ink/80 md:text-lg">{rolesPage.closing}</p>
          <div className="mt-8">
            <Button href={site.bookCall}>{rolesPage.cta}</Button>
          </div>
        </div>
      </section>

      <Finale />
    </>
  );
}
