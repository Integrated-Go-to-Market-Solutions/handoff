import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/brand";
import { Finale } from "@/components/sections/finale";
import { departments, rolesPage, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roles we place | Handoff",
  description: rolesPage.subhead,
};

/**
 * The roles hub: one card per department from Anthony's 10/5 list, each
 * linking to its department page. Copy is the Roles tab of Tom's content
 * doc. Replaces /talent, whose role groups predated Anthony's list
 * (/talent redirects here).
 */
export default function RolesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Reveal className="max-w-4xl">
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">
              {rolesPage.headline}
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg font-medium leading-relaxed text-bone/80">
              {rolesPage.subhead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink pb-16 text-bone md:pb-24">
        <div className="shell relative">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, i) => (
              <Reveal key={department.slug} delay={Math.min(i, 5) * 60} as="li" className="h-full">
                <Link
                  href={`/roles/${department.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-cyan focus-visible:border-cyan focus-visible:outline-none md:p-7"
                >
                  <h2 className="display text-xl leading-tight text-bone md:text-2xl">
                    {department.name}
                  </h2>
                  <ul className="mt-4 space-y-1.5 text-[0.95rem] leading-snug text-bone/70">
                    {department.roles.slice(0, 3).map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-cyan">
                    All {department.roles.length} roles
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 max-w-[62ch] border-l-4 border-cyan pl-5 text-base leading-relaxed text-bone/80 md:text-lg">
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
