import Image from "next/image";
import { logos } from "@/lib/content";

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
  const shown = logos.filter((logo) => !exclude.includes(logo.slug));
  const row = [...shown, ...shown];

  const track = (
    <div className="marquee-mask relative overflow-hidden">
      <div
        className="marquee-track flex w-max items-center gap-20 px-10"
        style={durationSeconds ? { animationDuration: `${durationSeconds}s` } : undefined}
      >
        {row.map((logo, i) =>
          logo.hasImage ? (
            // Wide wordmarks get a shorter box than stacked logos, so a
            // long name doesn't dwarf an icon-over-name logo (10/13).
            <div
              key={`${logo.slug}-${i}`}
              className="grid h-24 w-55 shrink-0 place-items-center transition-transform duration-500 hover:scale-105"
            >
              <div className={`relative w-full ${"stacked" in logo ? "h-21" : "h-12"}`}>
              <Image
                src={`/images/logos/${logo.slug}.webp`}
                alt={logo.name}
                fill
                sizes="220px"
                className={`object-contain object-center ${onDark ? "opacity-80 grayscale invert" : ""}`}
              />
              </div>
            </div>
          ) : (
            // Real client, no logo file yet (a pasted reference image can't
            // be extracted into individual files) — a clean text wordmark
            // instead of a broken image or a fabricated mark.
            <div
              key={`${logo.slug}-${i}`}
              className="grid h-24 w-65 shrink-0 place-items-center transition-transform duration-500 hover:scale-105"
            >
              <span className={`display text-xl ${onDark ? "text-bone/80" : "text-ink/70"}`}>{logo.name}</span>
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
          Trusted by teams that keep moving
        </p>
      </div>
      {track}
    </section>
  );
}
