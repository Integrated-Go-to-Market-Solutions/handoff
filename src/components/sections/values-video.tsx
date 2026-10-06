import { Reveal } from "../reveal";
import { VideoLoop } from "../video-loop";
import { aboutPage } from "@/lib/content";

/**
 * The Handoff Values reel on /about: Humanize, Hustle, Connect on the left
 * (Anthony, 10/5 call), the 9:16 clip right.
 */
export function ValuesVideo() {
  return (
    <section className="relative bg-ink pb-16 text-bone md:pb-24">
      <div className="shell grid items-center gap-10 md:grid-cols-[1fr_minmax(0,340px)] md:gap-16">
        <Reveal>
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)]">{aboutPage.values.headline}</h2>
          <dl className="mt-8 space-y-6">
            {aboutPage.values.items.map((value) => (
              <div key={value.name} className="border-l-4 border-cyan pl-5">
                <dt className="display text-2xl text-cyan md:text-3xl">{value.name}</dt>
                <dd className="mt-1 text-lg leading-relaxed text-bone/80">{value.line}</dd>
              </div>
            ))}
          </dl>
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
