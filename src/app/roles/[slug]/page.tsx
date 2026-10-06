import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Button, Eyebrow, cardGlow, cardTones } from "@/components/brand";
import { HiringHighway } from "@/components/sections/hiring-highway";
import { Finale } from "@/components/sections/finale";
import { departments, rolesPage, site } from "@/lib/content";

/**
 * One template for every department, per the 10/5 call and Anthony's
 * reference (hirewithnear.com/hire/marketing): the department's role video
 * up top, then the full list of roles in that department, so a visitor who
 * came for one role sees the others. A single role books a call; there is no
 * page per role. Each page is a standalone link sales can send.
 *
 * Copy is limited to what exists: Anthony's role list and the Roles tab of
 * Tom's content doc. Near's per-role one-liners, salary table and FAQ have
 * no Handoff content behind them, so they are not here.
 */
const findDepartment = (slug: string) =>
  departments.find((department) => department.slug === slug);

export function generateStaticParams() {
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const department = findDepartment((await params).slug);
  if (!department) return {};

  return {
    title: `${department.name} roles | Handoff`,
    description: `${department.name} roles Handoff places: ${department.roles.join(", ")}.`,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const department = findDepartment((await params).slug);
  if (!department) notFound();

  const others = departments.filter((d) => d.slug !== department.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-bone/60">
            <Link href="/roles" className="transition-colors hover:text-cyan">
              Roles
            </Link>
            <span aria-hidden="true" className="mx-2">
              &rarr;
            </span>
            <span className="text-bone/85">{department.name}</span>
          </nav>
          <Reveal>
            <Eyebrow className="mb-4">{rolesPage.headline}</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {department.name}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-bone/80">
              {rolesPage.subhead}
            </p>
            <div className="mt-8">
              <Button href={site.bookCall}>{rolesPage.cta}</Button>
            </div>
          </Reveal>

          {department.video && (
            <Reveal delay={90} className="mt-12">
              {/* Plays on tap, not on load: inner pages can carry video,
                  but phones shouldn't download it unasked (Tom, 10/5). */}
              <video
                controls
                playsInline
                preload="none"
                poster={department.video.poster}
                className="aspect-video w-full rounded-[var(--radius-card)] bg-ink-100 object-cover"
              >
                <source src={department.video.src} type="video/mp4" />
              </video>
            </Reveal>
          )}
        </div>
      </section>

      {/* Light gray with the site's colored cards (10/5 color pass). */}
      <section className="relative overflow-hidden bg-bone section-py text-ink">
        <div className="shell relative">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {department.roles.map((role, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal key={role} delay={Math.min(i, 5) * 60} as="li" className="h-full">
                  <Link
                    href={site.bookCall}
                    className={`group flex h-full items-center justify-between gap-4 rounded-[var(--radius-card)] px-6 py-5 focus-visible:outline-none ${cardGlow} ${tone.card}`}
                  >
                    <span className="text-base font-bold leading-snug">{role}</span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${tone.accent}`}
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <p className="mt-8 border-l-4 border-cyan pl-5 text-base leading-relaxed text-ink/80 md:text-lg">
            {rolesPage.closing}
          </p>

          <nav aria-labelledby="other-departments" className="mt-14 border-t border-ink/10 pt-10">
            <h2 id="other-departments" className="eyebrow text-sm text-ink/60">
              Other departments
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {others.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/roles/${d.slug}`}
                    className="inline-block rounded-full border-2 border-royal/25 bg-white px-4 py-2 text-sm font-semibold text-ink/85 transition-colors hover:border-royal hover:text-royal"
                  >
                    {d.name}
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
