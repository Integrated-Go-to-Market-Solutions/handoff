"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button, CtaNote, Eyebrow } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Finale } from "@/components/sections/finale";
import { tinaField, useContent, useLiveDoc } from "@/components/tina/content";

/**
 * Department (role) page, redesigned 10/15 per the 10/14 feedback ("less
 * black and repetitive, add imagery and more descriptive content", after
 * Near's finance and design pages):
 *
 * - A light hero with the department's intro and a grayscale photo. Where the
 *   talent map has a profile in this department, a small card for that
 *   person sits on the photo; otherwise there's no card.
 * - One card per role with what the role does and a link to book a call.
 *
 * PLACEHOLDERS: the intros and role descriptions are AI-drafted (Handoff
 * approved that 10/15) and the photos are reused from the industry pages
 * and team shots until Handoff sends department photos.
 */

type RoleDetail = { role: string; icon?: string; text?: string };
type Profile = { name: string; city: string; country: string; role: string; department: string; photo: string };

/** "Hire a Bookkeeper", "Hire an AP/AR Specialist", "Hire an SDR/BDR". */
function hireLabel(role: string) {
  const name = role.replace(/\s*\(.*\)$/, "");
  const first = name.split(/[\s/]/)[0];
  const acronym = first.length > 1 && first === first.toUpperCase();
  const an = acronym ? /^[AEFHILMNORSX]/.test(first) : /^[AEIO]/i.test(first);
  return `Hire ${an ? "an" : "a"} ${name}`;
}

export function DepartmentView({ payload }: { payload: { data: any; query: string; variables: { relativePath?: string } } }) {
  const department = useLiveDoc(payload, "department");
  const { departments, rolesPage, site, talentMap } = useContent();
  const others = (departments as { slug: string; name: string }[]).filter((item) => item.slug !== department.slug);
  const person = (talentMap.profiles as Profile[]).find((p) => p.department === department.slug);
  const details = (department.roleDetails ?? []) as RoleDetail[];

  return (
    <>
      <section className="relative overflow-hidden bg-bone section-py-tight text-ink">
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-ink/55">
              <Link href="/roles" className="-my-2.5 inline-block py-2.5 transition-colors hover:text-royal">
                {rolesPage.crumb}
              </Link>
              <span aria-hidden="true" className="mx-2">
                &rarr;
              </span>
              <span className="text-ink/80">{department.name}</span>
            </nav>
            <Eyebrow tone="royal" className="mb-4">
              {rolesPage.headline}
            </Eyebrow>
            <h1 data-tina-field={tinaField(department, "name")} className="display text-[clamp(2.5rem,6vw,4.6rem)] text-ink">
              {department.name}
            </h1>
            <p
              data-tina-field={tinaField(department, "intro")}
              className="mt-5 text-pretty text-lg leading-relaxed text-ink/75 md:text-xl"
            >
              {department.intro || rolesPage.subhead}
            </p>
            <div className="mt-8">
              <Button href={site.bookCall}>{rolesPage.cta}</Button>
              <CtaNote tone="onLight" className="mt-3" />
            </div>
          </Reveal>

          {department.image && (
            <Reveal delay={90} className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-card)" data-tina-field={tinaField(department, "image")}>
                <Image
                  src={department.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover grayscale"
                />
                <div className="halftone absolute inset-0" aria-hidden="true" />
              </div>
              {person && (
                <div className="absolute -bottom-6 left-4 z-10 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] sm:left-6">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image src={person.photo} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{person.name}</span>
                    <span className="block text-xs text-ink/60">
                      {person.city}, {person.country}
                    </span>
                    <span className="mt-1 inline-block rounded-full bg-cyan/20 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-ink">
                      {person.role}
                    </span>
                  </span>
                </div>
              )}
            </Reveal>
          )}
        </div>

        {department.video?.src && (
          <div className="shell relative">
            <Reveal delay={90} className="mt-16">
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
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-white section-space text-ink">
        <div className="shell relative">
          <Reveal className="max-w-3xl">
            <h2 className="display text-balance text-[clamp(2rem,4.4vw,3.2rem)] leading-tight">
              The {department.name} roles we place most
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink/70 md:text-lg">{rolesPage.closing}</p>
          </Reveal>

          <ul className="section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(department.roles as string[]).map((role, i) => {
              const detail = details.find((d) => d.role === role);
              return (
                <Reveal key={role} delay={Math.min(i, 5) * 60} as="li" className="h-full">
                  <div className="flex h-full flex-col rounded-(--radius-card) border-2 border-ink/8 bg-bone/60 p-6 transition-[border-color,box-shadow] duration-300 hover:border-royal/35 hover:shadow-md md:p-7">
                    <Icon name={(detail?.icon as IconName) || "users"} strokeWidth={1.25} className="h-10 w-10 text-royal" />
                    <h3 className="display mt-5 text-xl leading-tight text-ink">{role}</h3>
                    {detail?.text && <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-ink/75">{detail.text}</p>}
                    <Link
                      href={site.bookCall}
                      className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-royal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/40"
                    >
                      {hireLabel(role)}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <nav aria-labelledby="other-departments" className="mt-16 border-t border-ink/10 pt-10">
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
