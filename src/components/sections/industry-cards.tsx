"use client";

import Image from "next/image";
import Link from "next/link";

// Industry docs from Tina: slug, name, subhead and heroImage { src, focus }.
type Industry = any;

/**
 * The industry photo cards: grayscale photo, name, one-liner and an arrow,
 * two large over three, on the dot grid (homepage 10/15; the Industries page
 * uses the same cards since the 10/22 live review, W-65). Phones: one row
 * that swipes sideways and bleeds to the screen edge.
 */
export function IndustryCards({ industries, headingLevel = "h2" }: { industries: Industry[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      {industries.map((industry, i) => (
        <li
          key={industry.slug}
          className={`w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}
        >
          <Link
            href={`/industries/${industry.slug}`}
            className={`group relative block aspect-4/5 overflow-hidden rounded-(--radius-card) border-2 border-white/15 transition-colors duration-300 hover:border-cyan focus-visible:border-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 ${
              i < 2 ? "md:aspect-16/10" : "md:aspect-4/3"
            }`}
          >
            <Image
              src={industry.heroImage.src}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 80vw"
              className="object-cover grayscale transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              style={{ objectPosition: industry.heroImage.focus }}
            />
            <div className="halftone absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/10" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
              <Heading className="display text-[clamp(1.35rem,2.4vw,2rem)] leading-tight text-white">{industry.name}</Heading>
              <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-bone/80 md:text-base">{industry.subhead}</p>
              <span
                aria-hidden="true"
                className="mt-3 inline-block text-xl text-cyan transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                &rarr;
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
