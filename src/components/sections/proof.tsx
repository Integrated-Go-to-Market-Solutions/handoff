import { Button } from "../brand";
import { Reveal } from "../reveal";
import { TalentCard } from "../talent-card";
import { proof, team, site } from "@/lib/content";

export function Proof() {
  return (
    <section id="talent" className="relative bg-ink pb-0 pt-24 md:pt-32">
      <div className="shell relative">
        <Reveal className="max-w-4xl">
          <h2 className="display mt-5 text-[clamp(2.1rem,4.8vw,3.7rem)] text-bone">
            {proof.headline}
            <br />
            <span className="text-cyan">{proof.headlineAccent}</span>
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-bone/70">
            {proof.body}
          </p>
        </Reveal>
      </div>

      {/* Scroll-snap row on small screens, grid from sm up.
          The negative bottom margin lets the last row cross the section seam
          into the block below, so the page reads as one surface rather than
          a stack of sealed panels. Vibes carries matching top padding. */}
      <div className="relative z-10 mt-14 sm:-mb-28 lg:-mb-32">
        <div className="shell flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
          {team.map((person, i) => (
            <TalentCard key={person.slug} {...person} index={i} />
          ))}

          <Reveal
            delay={team.length * 70}
            className="w-67 shrink-0 snap-start sm:w-auto"
          >
            <div className="flex h-full flex-col justify-between rounded-(--radius-brand) bg-ink-300 p-7 border border-cyan/30">
              <p className="display text-2xl leading-tight text-bone">
                Your next hire
                <br />
                <span className="text-cyan">goes here.</span>
              </p>
              <Button href={site.bookCall} className="mt-8 w-full">
                Get Started Today
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
