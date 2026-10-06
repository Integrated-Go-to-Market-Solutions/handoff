import Link from "next/link";
import { Icon, type IconName } from "../icon";
import { KpiRibbon } from "../kpi-ribbon";
import { LogoMarquee } from "./logo-marquee";
import { industries, industriesStrip } from "@/lib/content";

/**
 * Homepage section 2, reworked per the 10/5 call: it does one job, the
 * industries. The logo band stays on top. Below it: an industries headline
 * (Tom's copy for the industries point Anthony asked for, 10/5), the five
 * industry tiles at a larger size, and a thin, static ribbon of three KPIs
 * underneath. "Trusted by teams that keep moving forward" and the "See the
 * roles" button were cut on the call.
 *
 * No photo behind the panel: the culture footage was cut (10/5) so the
 * hero's team photo isn't followed straight away by a second photo, and to
 * keep homepage motion down on phones.
 * The logo band rides white because most of the logo files are dark
 * artwork; the loop runs ~15% slower than 46s.
 */
export function CredibilityStrip() {
  return (
    <section
      className="relative overflow-hidden bg-ink pb-16 text-bone md:pb-20"
      aria-labelledby="credibility-heading"
    >
      {/* White logo band on top: a clear seam between the hero and this section. */}
      <div className="relative z-10 border-b border-ink/10 bg-white py-3">
        <LogoMarquee bare durationSeconds={53} exclude={["fragomen"]} />
      </div>

      <div className="shell relative pt-14 md:pt-16">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-ink-100/90 px-4 py-8 backdrop-blur-md sm:px-8 md:px-12 md:py-12">
          <h2
            id="credibility-heading"
            className="display mx-auto max-w-[30ch] text-balance text-center text-[clamp(1.6rem,4.4vw,3rem)] leading-tight text-white"
          >
            {industriesStrip.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-[68ch] text-balance text-center text-base leading-relaxed text-bone/75 md:text-lg">
            {industriesStrip.body}
          </p>

          {/* Phones: one row that scrolls, bleeding to the panel edge so the
              cut-off tile reads as "more this way". 640px up: five equal tiles. */}
          <nav aria-labelledby="credibility-heading" className="mt-8 md:mt-10">
            <ul className="-mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5 [&::-webkit-scrollbar]:hidden">
              {industries.map((industry) => (
                <li key={industry.slug} className="w-[9rem] shrink-0 snap-start sm:w-auto">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col items-center justify-center gap-4 rounded-[var(--radius-card)] border-2 border-white/15 px-3 py-7 text-center transition-colors duration-300 hover:border-cyan hover:bg-white/[0.04] focus-visible:border-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 motion-reduce:transition-none md:py-10"
                  >
                    <Icon
                      name={industry.icon as IconName}
                      strokeWidth={1.25}
                      className="h-10 w-10 text-cyan md:h-12 md:w-12"
                    />
                    <span className="text-sm font-semibold uppercase leading-tight tracking-[0.04em] text-white md:text-base">
                      {"tileLabel" in industry && industry.tileLabel ? industry.tileLabel : industry.navLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Thin, static KPI ribbon. */}
          <KpiRibbon className="mt-8 border-t border-white/10 pt-6 md:mt-10 md:pt-8" />
        </div>
      </div>
    </section>
  );
}
