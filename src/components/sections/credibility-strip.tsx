"use client";

import Image from "next/image";
import Link from "next/link";
import { LogoMarquee } from "./logo-marquee";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Homepage section 2: the logo band, then the industries. Reworked 10/15
 * per the 10/14 feedback ("spread out more using grayscale and optional
 * dot-matrix texture"), option A from Tom's mockups: each industry is a
 * grayscale photo card (the photo from its industry page) with its name,
 * one-liner and an arrow, two large over three, on the dot grid. This
 * replaced the royal panel with icon tiles (10/5).
 *
 * Phones: one row of cards that swipes sideways, bleeding to the screen
 * edge so the cut-off card reads as "more this way".
 *
 * The logo band is a frosted dark strip; the logos are inverted to light
 * gray to read on it. The loop runs ~15% slower than 46s.
 */
export function CredibilityStrip() {
  const { industries, industriesStrip } = useContent();
  return (
    <section className="relative overflow-hidden bg-ink text-bone" aria-labelledby="credibility-heading">
      {/* Logo band on top: a faint frosted strip with the logos in light gray
          (10/14 call: the white bar felt disruptive; Anthony suggested
          something like iPhone's glass). Replaced the white band 10/15. */}
      <div className="relative z-10 border-y border-white/10 bg-white/5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
        <LogoMarquee bare onDark durationSeconds={53} />
      </div>

      <div className="hw-dots section-space">
        <div className="shell relative">
          <div className="max-w-4xl">
            <h2
              id="credibility-heading"
              data-tina-field={tinaField(industriesStrip, "headline")}
              className="display text-balance text-[clamp(2rem,4.4vw,3.4rem)] leading-tight text-white"
            >
              {industriesStrip.headline}
            </h2>
            <p
              data-tina-field={tinaField(industriesStrip, "body")}
              className="mt-6 text-pretty text-base leading-relaxed text-bone/75 md:text-lg"
            >
              {industriesStrip.body}
            </p>
          </div>

          <nav aria-labelledby="credibility-heading" className="section-gap">
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
                      <h3 className="display text-[clamp(1.35rem,2.4vw,2rem)] leading-tight text-white">{industry.name}</h3>
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
          </nav>
        </div>
      </div>
    </section>
  );
}
