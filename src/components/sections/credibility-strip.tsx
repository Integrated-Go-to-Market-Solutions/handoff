import Link from "next/link";
import { Button } from "../brand";
import { Icon, type IconName } from "../icon";
import { VideoLoop } from "../video-loop";
import { LogoMarquee } from "./logo-marquee";
import { industries, proofStats } from "@/lib/content";

const flankStats = ["Saved per hire", "Client retention"].map(
  (label) => proofStats.find((stat) => stat.label === label)!,
);

function FlankStat({ value, label }: { value: string; label: string }) {
  return (
    <p className="flex flex-col items-center text-center">
      <span className="display text-[clamp(1.4rem,6.4vw,3.6rem)] leading-none text-cyan">{value}</span>
      <span className="mt-1.5 text-[0.55rem] font-semibold uppercase leading-snug tracking-[0.14em] text-bone/85 sm:text-[0.7rem] md:mt-2.5 md:text-sm md:tracking-[0.18em]">
        {label}
      </span>
    </p>
  );
}

/**
 * Homepage proof band: who trusts us, the two numbers, and the industries
 * we hire for, in one dark panel over the team's culture footage. The
 * stats flank the headline at every width (phones included, per the 10/5
 * request); the five industry tiles sit in one row, which scrolls
 * sideways on phones where five can't fit at a readable size. The logos
 * ride a white band on top because most of the logo files are dark
 * artwork. The logo loop runs ~15% slower than 46s.
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

      <div className="absolute inset-0 grayscale" aria-hidden="true">
        <VideoLoop src="/video/culture.mp4" poster="/video/culture.jpg" name="" caption="" bare />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/80" />
      </div>

      <div className="shell relative pt-14 md:pt-16">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-ink-100/90 px-4 py-7 backdrop-blur-md sm:px-8 md:px-12 md:py-10">
          {/* Stat | headline | stat. */}
          <div className="grid grid-cols-[1fr_1.3fr_1fr] items-center gap-2 sm:gap-6 md:gap-10">
            <FlankStat {...flankStats[0]} />
            <h2
              id="credibility-heading"
              className="text-balance text-center text-[clamp(0.9rem,3.6vw,2.1rem)] font-bold leading-tight text-white"
            >
              Trusted by teams that keep moving forward
            </h2>
            <FlankStat {...flankStats[1]} />
          </div>

          <hr className="mt-7 border-white/10 md:mt-9" />

          <nav aria-labelledby="industries-label" className="mt-6 md:mt-8">
            <p id="industries-label" className="eyebrow text-center text-cyan md:text-sm">
              Built for your industry
            </p>
            {/* Phones: one row that scrolls, bleeding to the panel edge so the
                cut-off tile reads as "more this way". 640px up: five equal tiles. */}
            <ul className="-mx-4 mt-4 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-5 md:gap-4 [&::-webkit-scrollbar]:hidden">
              {industries.map((industry) => (
                <li key={industry.slug} className="w-[6.75rem] shrink-0 snap-start sm:w-auto">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/15 px-2 py-4 text-center transition-colors duration-300 hover:border-cyan hover:bg-white/[0.04] focus-visible:border-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 motion-reduce:transition-none md:py-5"
                  >
                    <Icon
                      name={industry.icon as IconName}
                      strokeWidth={2}
                      className="h-6 w-6 text-cyan md:h-7 md:w-7"
                    />
                    <span className="whitespace-nowrap text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.04em] text-white lg:text-sm">
                      {"tileLabel" in industry && industry.tileLabel ? industry.tileLabel : industry.navLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 text-center md:mt-9">
            <Button href="/talent">See the roles</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
