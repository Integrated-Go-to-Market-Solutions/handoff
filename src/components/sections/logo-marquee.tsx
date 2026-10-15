"use client";

import Image from "next/image";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Client proof bar. Duplicated once so the CSS marquee loops seamlessly at
 * -50% translation.
 *
 * `bare` drops the section chrome so this can sit inside the hero, letting the
 * hero photograph bleed down behind it instead of stopping at a hard edge.
 */
export function LogoMarquee({
  bare = false,
  durationSeconds,
  onDark = false,
  exclude = [],
}: {
  bare?: boolean;
  /** Overrides the default 46s loop from globals.css. */
  durationSeconds?: number;
  /** Recolour logos light for dark backgrounds. */
  onDark?: boolean;
  /** Logo slugs to leave out of this instance (the full list stays for /v2). */
  exclude?: readonly string[];
}) {
  const { logos, site } = useContent();
  const shown = logos.filter((logo) => !exclude.includes(logo.slug));
  const row = [...shown, ...shown];

  const track = (
    <div className="marquee-mask relative overflow-hidden">
      <div
        className="marquee-track flex w-max items-center gap-14 px-7"
        style={durationSeconds ? { animationDuration: `${durationSeconds}s` } : undefined}
      >
        {row.map((logo, i) =>
          logo.hasImage ? (
            // Wide wordmarks get a shorter box than stacked logos, so a
            // long name doesn't dwarf an icon-over-name logo (10/13).
            // Logos are monochrome on every background (10/14 feedback,
            // replacing the 10/13 call for color).
            // Everything here is 70% of its 10/13 size: "reduce homepage
            // logo sizes by at least 30%" (10/14 feedback).
            <div
              key={`${logo.slug}-${i}`}
              className="grid h-17 w-38 shrink-0 place-items-center transition-transform duration-500 hover:scale-105"
            >
              <div className={`relative w-full ${logo.stacked ? "h-15" : "h-8.5"}`}>
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                sizes="160px"
                className={`object-contain object-center grayscale ${onDark ? "opacity-80 invert" : ""}`}
              />
              </div>
            </div>
          ) : (
            // Real client, no logo file yet (a pasted reference image can't
            // be extracted into individual files) — a clean text wordmark
            // instead of a broken image or a fabricated mark.
            <div
              key={`${logo.slug}-${i}`}
              className="grid h-17 w-45 shrink-0 place-items-center transition-transform duration-500 hover:scale-105"
            >
              <span className={`display text-sm ${onDark ? "text-bone/80" : "text-ink/70"}`}>{logo.name}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );

  if (bare) return track;

  return (
    <section className="bg-bone py-14" aria-label="Client logos">
      <div className="shell mb-8">
        <p className="eyebrow text-base font-bold text-ink/70 md:text-lg">
          <span data-tina-field={tinaField(site, "marqueeCaption")}>{site.marqueeCaption}</span>
        </p>
      </div>
      {track}
    </section>
  );
}
