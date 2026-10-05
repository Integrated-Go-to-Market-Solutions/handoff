import { Reveal } from "../reveal";
import { VideoLoop } from "../video-loop";

/** The Handoff Values reel on /about: headline left, the 9:16 clip right. */
export function ValuesVideo() {
  return (
    <section className="relative bg-ink pb-16 text-bone md:pb-24">
      <div className="shell grid items-center gap-10 md:grid-cols-[1fr_minmax(0,340px)] md:gap-16">
        <Reveal>
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">
            Our values are <span className="text-cyan">simple.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-bone/70">
            In our own words, from the people who hold us to them.
          </p>
        </Reveal>
        <Reveal delay={110} className="mx-auto w-full max-w-[340px]">
          <VideoLoop
            src="/videos/handoff-values.mp4"
            poster="/videos/handoff-values.jpg"
            name="Handoff values"
            caption="This is how we lead."
          />
        </Reveal>
      </div>
    </section>
  );
}
