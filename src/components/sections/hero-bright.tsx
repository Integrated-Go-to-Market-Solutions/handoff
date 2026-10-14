"use client";

import Image from "next/image";
import { Button, CtaNote, Eyebrow } from "../brand";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Type-led hero: the two-line headline carries it, centred over a team photo.
 * The LATAM map moved out to its own interactive section (TalentMap) further
 * down the page.
 */
export function HeroBright({ subhead }: { subhead?: string } = {}) {
  const { hero } = useContent();
  return (
    <section className="halftone relative overflow-hidden bg-ink pb-16 pt-14 md:pb-20 md:pt-20">
      {/* Team photo, grayscale and heavily darkened so it only adds texture
          behind the headline. Preloaded: it's the first thing on the page. */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-[50%_35%] grayscale"
      />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(31_31_31/0.55),transparent_75%)]" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/60" />
      </div>
      <div className="shell relative z-10 text-center">
        <Eyebrow className="mb-5 md:mb-6">
          <span data-tina-field={tinaField(hero, "eyebrow")}>{hero.eyebrow}</span>
        </Eyebrow>
        {/* Line 1 big, the two short claims together on line 2. Both sized off
            the viewport so neither line wraps or overflows. Line 2 divides by
            19, not 15, since "AI Powered People." is longer than "AI trained." */}
        <h1 className="display text-bone leading-[1.08]">
          {/* "Hire" lengthened line 1 (10/7), so it divides by 13.5, not 10.4,
              to stay on one line from phones up. */}
          <span className="hero-rise block whitespace-nowrap text-[clamp(1.5rem,calc((100vw-56px)/13.5),6rem)]">
            {hero.headlineLead.before} <span className="text-cyan">{hero.headlineLead.accent}</span>
          </span>
          <span className="mt-2 block whitespace-nowrap text-[clamp(1rem,calc((100vw-56px)/19),3.6rem)] md:mt-3">
            {hero.headlineLines.slice(1).map((line: any, i: number) => (
              <span
                key={line.text}
                className={`hero-rise inline-block ${i > 0 ? "ml-[0.35em]" : ""} ${
                  line.tone === "cyan" ? "hero-shine" : ""
                }`}
                style={{
                  animationDelay:
                    line.tone === "cyan" ? `${0.25 + i * 0.2}s, ${1.4 + i * 0.2}s` : `${0.25 + i * 0.2}s`,
                }}
              >
                {line.text}
              </span>
            ))}
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-full text-lg font-semibold leading-relaxed text-bone text-balance md:text-xl">
          {subhead ?? hero.body}
        </p>

        <div className="mt-8">
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <CtaNote className="mt-4" />
        </div>
      </div>
    </section>
  );
}
