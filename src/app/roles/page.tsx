import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button, cardGlow, cardTones } from "@/components/brand";
import { Finale } from "@/components/sections/finale";
import { departments, rolesPage, site } from "@/lib/content";

export const metadata: Metadata = {
  title: rolesPage.title,
  description: rolesPage.subhead,
};

/**
 * The roles hub: one card per department from Anthony's 10/5 list, each
 * linking to its department page. Copy is the Roles tab of Tom's content
 * doc. Cards carry no role count or repeated "see all" line (Tom, 10/5):
 * a count reads as a ceiling, and "not the limit" is said once, under the
 * grid. Replaces /talent, whose role groups predated Anthony's list
 * (/talent redirects here).
 */
export default function RolesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Reveal>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {rolesPage.headline}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-bone/80">
              {rolesPage.subhead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Light gray with the site's colored cards (10/5 color pass). */}
      <section className="relative overflow-hidden bg-bone section-py text-ink">
        <div className="shell relative">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, i) => {
              const tone = cardTones[i % cardTones.length];
              return (
                <Reveal key={department.slug} delay={Math.min(i, 5) * 60} as="li" className="h-full">
                  <Link
                    href={`/roles/${department.slug}`}
                    className={`group flex h-full flex-col rounded-(--radius-card) p-6 focus-visible:outline-none md:p-7 ${cardGlow} ${tone.card}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="display text-xl leading-tight md:text-2xl">
                        {department.name}
                      </h2>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-1 ${tone.accent}`}
                      >
                        &rarr;
                      </span>
                    </div>
                    <ul className={`mt-4 space-y-1.5 text-[0.95rem] leading-snug ${tone.muted}`}>
                      {department.roles.slice(0, 3).map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <p className="mt-10 border-l-4 border-cyan pl-5 text-base leading-relaxed text-ink/80 md:text-lg">
            {rolesPage.closing}
          </p>
          <div className="mt-8">
            <Button href={site.bookCall}>{rolesPage.cta}</Button>
          </div>
        </div>
      </section>

      <Finale />
    </>
  );
}
