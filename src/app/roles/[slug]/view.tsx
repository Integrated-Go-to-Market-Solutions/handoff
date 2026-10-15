"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Finale } from "@/components/sections/finale";
import { tinaField, useContent, useLiveDoc } from "@/components/tina/content";

export function DepartmentView({ payload }: { payload: { data: any; query: string; variables: { relativePath?: string } } }) {
  const department = useLiveDoc(payload, "department");
  const { departments, rolesPage, site } = useContent();
  const others = (departments as { slug: string; name: string }[]).filter((item) => item.slug !== department.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Breadcrumb items={[{ label: rolesPage.crumb, href: "/roles" }, { label: department.name }]} />
          <Reveal>
            <Eyebrow className="mb-4">{rolesPage.headline}</Eyebrow>
            <h1 data-tina-field={tinaField(department, "name")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {department.name}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-bone/80">{rolesPage.subhead}</p>
            <div className="mt-8">
              <Button href={site.bookCall}>{rolesPage.cta}</Button>
            </div>
          </Reveal>

          {department.video?.src && (
            <Reveal delay={90} className="mt-12">
              <video
                controls
                playsInline
                preload="none"
                poster={department.video.poster}
                className="aspect-video w-full rounded-(--radius-card) bg-ink-100 object-cover"
              >
                <source src={department.video.src} type="video/mp4" />
              </video>
            </Reveal>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone section-py text-ink">
        <div className="shell relative">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(department.roles as string[]).map((role, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal key={role} delay={Math.min(i, 5) * 60} as="li" className="h-full">
                  <Link
                    href={site.bookCall}
                    className={`group flex h-full items-center justify-between gap-4 rounded-(--radius-card) px-6 py-5 focus-visible:outline-none ${cardGlow} ${tone.card}`}
                  >
                    <span className="text-base font-bold leading-snug">{role}</span>
                    <span aria-hidden="true" className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${tone.accent}`}>
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <p className="mt-8 border-l-4 border-cyan pl-5 text-base leading-relaxed text-ink/80 md:text-lg">{rolesPage.closing}</p>

          <nav aria-labelledby="other-departments" className="mt-14 border-t border-ink/10 pt-10">
            <h2 id="other-departments" className="eyebrow text-sm text-ink/60">
              {rolesPage.otherDepartments}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/roles/${item.slug}`}
                    className="inline-block rounded-full border-2 border-royal/25 bg-white px-4 py-2 text-sm font-semibold text-ink/85 transition-colors hover:border-royal hover:text-royal"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <HiringHighway compact />
      <Finale />
    </>
  );
}
