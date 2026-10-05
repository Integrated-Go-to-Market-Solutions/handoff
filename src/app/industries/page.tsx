import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Icon, type IconName } from "@/components/icon";
import { industries, industriesPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries | Handoff",
  description: industriesPage.body,
};

/** Every industry as a card linking to its own page. */
export default function IndustriesPage() {
  return (
    <section className="bg-ink section-py-hero text-bone">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h1 className="display text-[clamp(2.3rem,6vw,4.2rem)]">{industriesPage.headline}</h1>
          <p className="mx-auto mt-5 max-w-[56ch] text-balance text-lg leading-relaxed text-bone/70">
            {industriesPage.body}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal as="li" key={industry.slug} delay={i * 80}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border-2 border-cyan/25 bg-ink-100 p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-cyan hover:shadow-[0_0_36px_-8px_rgba(61,214,189,0.6)] focus-visible:border-cyan focus-visible:outline-none"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-cyan/50 text-cyan transition-colors group-hover:bg-cyan group-hover:text-ink">
                  <Icon name={industry.icon as IconName} className="h-7 w-7" />
                </span>
                <h2 className="display mt-6 text-xl leading-tight">{industry.name}</h2>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-bone/70">{industry.subhead}</p>
                <span className="mt-6 text-sm font-semibold text-cyan">
                  See the roles <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
