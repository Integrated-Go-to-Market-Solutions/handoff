"use client";

import { tinaField, useContent } from "@/components/tina/content";

/**
 * The thin, static row of three KPIs (Tom, 10/5 call): under the homepage
 * industry tiles and on each industry page. No motion, by design. `light`
 * is for light gray sections: royal numbers, ink labels. The numbers sit
 * level at the top even when one label wraps onto more lines (10/28).
 */
export function KpiRibbon({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { credibilityStats } = useContent();
  const light = tone === "light";
  return (
    <dl className={`grid grid-cols-3 divide-x ${light ? "divide-ink/10" : "divide-white/15"} ${className}`}>
      {credibilityStats.map((stat) => (
        <div key={stat.label} data-tina-field={tinaField(stat, "value")} className="flex flex-col-reverse items-center justify-end px-2 text-center">
          <dt
            className={`mt-1.5 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.14em] sm:text-xs md:mt-2 md:tracking-[0.18em] ${
              light ? "text-ink/70" : "text-bone/80"
            }`}
          >
            {stat.label}
          </dt>
          <dd className={`display text-[clamp(1.3rem,4.2vw,2.4rem)] leading-none ${light ? "text-royal" : "text-cyan"}`}>
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
