import { Reveal } from "../reveal";
import { VideoLoop } from "../video-loop";
import { soul } from "@/lib/content";

/** The team's culture footage, grayscale and darkened, behind both versions. */
function Backdrop() {
  return (
    <div className="absolute inset-0 grayscale" aria-hidden="true">
      <VideoLoop src="/video/culture.mp4" poster="/video/culture.jpg" name="" caption="" bare />
      <div className="absolute inset-0 bg-ink/70" />
    </div>
  );
}

/**
 * `variant="dictionary"` (homepage and /about): Alma as a dictionary entry,
 * after design-refs/alma/image.png. A small lead-in line, then the headword
 * in a classic serif, "[al·ma] • noun", a hairline the width of the
 * headword, and the definition. White, centred, nothing else: the serif
 * does the work. The headword fades in first, then the rest.
 *
 * The default is the older statement version ("We named our platform Alma.
 * It means soul."), kept for /v2. It was stripped back in three rounds of
 * direct feedback until only the Alma line was left, huge, in display type.
 */
export function Soul({ variant = "statement" }: { variant?: "statement" | "dictionary" } = {}) {
  if (variant === "dictionary") {
    const { intro, headword, pronunciation, partOfSpeech, definition } = soul.dictionary;
    return (
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink section-py-hero text-bone">
        <Backdrop />
        <div className="shell relative text-center">
          <Reveal delay={250}>
            <p className="text-base font-medium tracking-[0.02em] text-bone/75 md:text-lg">{intro}</p>
          </Reveal>

          {/* Shrink-wrapped to the headword, so the rule underneath matches its width. */}
          <div className="mt-4 inline-flex flex-col items-center md:mt-6">
            <Reveal>
              <h2 className="font-serif text-[clamp(5.5rem,21vw,15rem)] lowercase leading-[0.85] tracking-[-0.01em] text-bone">
                {headword}
              </h2>
            </Reveal>
            <Reveal delay={450} className="w-full">
              <p className="mt-4 font-serif text-[clamp(1.25rem,2.4vw,1.85rem)] leading-none text-bone/80 md:mt-6">
                {pronunciation} <span aria-hidden="true">•</span> <em className="italic">{partOfSpeech}</em>
              </p>
              <hr className="mt-6 w-full border-t border-bone/45 md:mt-8" />
            </Reveal>
          </div>

          <Reveal delay={650}>
            <p className="mx-auto mt-6 max-w-[30ch] font-serif text-[clamp(1.35rem,2.8vw,2.1rem)] leading-snug text-bone md:mt-8">
              {definition}
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink section-py-hero text-bone">
      <Backdrop />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-6xl text-center">
          <h2 className="display text-[clamp(2.2rem,5.6vw,5rem)] leading-[1.05] text-bone">
            {soul.closerParts.before}{" "}
            <span className="text-cyan">{soul.closerParts.accent}</span>
            {soul.closerParts.after}
          </h2>
          <p className="mx-auto mt-8 font-gotham text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-snug text-bone/90">
            {soul.closerParts.sub.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
