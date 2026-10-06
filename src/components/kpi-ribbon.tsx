import { credibilityStats } from "@/lib/content";

/**
 * The thin, static row of three KPIs (Tom, 10/5 call): under the homepage
 * industry tiles and on each industry page. No motion, by design.
 */
export function KpiRibbon({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-3 divide-x divide-white/10 ${className}`}>
      {credibilityStats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse items-center px-2 text-center">
          <dt className="mt-1.5 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.14em] text-bone/75 sm:text-xs md:mt-2 md:tracking-[0.18em]">
            {stat.label}
          </dt>
          <dd className="display text-[clamp(1.3rem,4.2vw,2.4rem)] leading-none text-cyan">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
