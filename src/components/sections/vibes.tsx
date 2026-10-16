"use client";

import { Reveal } from "../reveal";
import { VideoLoop } from "../video-loop";
import { VibesPlayer } from "../vibes-player";
import { tinaField, useContent } from "@/components/tina/content";

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
}: {
  /** Clip indexes in display order; defaults to the content order (used by /v2). */
  order?: number[];
  /** One-at-a-time player with the middle reel as the main one (homepage). */
  slider?: boolean;
} = {}) {
  const { vibes } = useContent();
  const clips = order ? order.map((i) => vibes.clips[i]) : vibes.clips;
  return (
    <section className="relative overflow-hidden bg-ink section-space text-bone">
      <div className="shell relative z-10">
        <Reveal>
          <h2 data-tina-field={tinaField(vibes, "headline")} className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">
            {vibes.headline}{" "}
            <span className="swipe">{vibes.headlineAccent}</span>
            {vibes.headlineAfter}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {vibes.body}
          </p>
        </Reveal>

        {slider ? (
          <Reveal className="section-gap">
            <VibesPlayer clips={clips} />
          </Reveal>
        ) : (
          <div className="section-gap grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {clips.map((clip: any, i: number) => (
              <Reveal key={clip.slug} delay={i * 110}>
                <VideoLoop
                  src={clip.video}
                  poster={clip.poster}
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
