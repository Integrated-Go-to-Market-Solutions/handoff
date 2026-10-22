"use client";

import { IndustryCards } from "./industry-cards";
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
            <IndustryCards industries={industries} headingLevel="h3" />
          </nav>
        </div>
      </div>
    </section>
  );
}
