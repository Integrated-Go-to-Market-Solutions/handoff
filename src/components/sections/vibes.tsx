import { Reveal } from "../reveal";
import { VideoLoop } from "../video-loop";
import { VibesPlayer } from "../vibes-player";
import { vibes } from "@/lib/content";

/**
 * The headline used to X out "We don't talk about overseas talent", erase
 * and retype. Rejected as "not good". Now one static line, "We are the
 * overseas talent.", with the same cyan swipe the Hiring Highway headline
 * uses, so the two sections read as one system. The body carries the
 * competitor contrast on its own.
 *
 * Plain carbon behind the videos, per direct instruction (2026-09-08). The
 * duotone team photo that used to sit here competed with the three clips.
 */
export function Vibes({
  order,
  slider = false,
  tightTop = false,
}: {
  /** Clip indexes in display order; defaults to the content order (used by /v2). */
  order?: number[];
  /** One-at-a-time player with the middle reel as the main one (homepage). */
  slider?: boolean;
  /** Less space above, when it follows another dark section (homepage). /v2 keeps the default. */
  tightTop?: boolean;
} = {}) {
  const clips = order ? order.map((i) => vibes.clips[i]) : vibes.clips;
  return (
    <section
      className={`relative overflow-hidden bg-ink text-bone ${
        tightTop ? "pb-24 pt-10 md:pb-34 md:pt-14" : "section-py"
      }`}
    >
      <div className="shell relative z-10">
        <Reveal>
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">
            {vibes.headline}{" "}
            <span className="swipe">{vibes.headlineAccent}</span>
            {vibes.headlineAfter}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {vibes.body}
          </p>
        </Reveal>

        {slider ? (
          <Reveal className="mt-14">
            <VibesPlayer clips={clips} />
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {clips.map((clip, i) => (
              <Reveal key={clip.slug} delay={i * 110}>
                <VideoLoop
                  src={`/videos/${clip.slug}.mp4`}
                  poster={`/videos/${clip.slug}.jpg`}
                  name={clip.name}
                  caption={clip.caption}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
