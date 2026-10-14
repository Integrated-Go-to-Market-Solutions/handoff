import { Reveal } from "../reveal";
import { dayInLife } from "@/lib/content";

/**
 * Separate from "meet the team" and separate from Vibes (the real footage
 * that already exists). Anthony described this as a distinct series: short,
 * calendar-driven clips per role. No footage exists yet, so this ships as
 * clearly-labeled placeholder slots.
 */
export function DayInLife() {
  return (
    <section className="relative overflow-hidden bg-ink section-py text-bone">
      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)] text-bone">
            {dayInLife.headline}
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-bone/70">
            {dayInLife.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dayInLife.slots.map((slot, i) => (
            <Reveal key={slot.id} delay={i * 90}>
              <div className="flex aspect-9/16 flex-col items-center justify-center rounded-(--radius-brand) border-2 border-dashed border-white/20 bg-white/3 p-6 text-center transition-colors duration-300 hover:border-cyan/40">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-bone/40">
                  Coming soon
                </span>
                <span className="mt-3 text-lg font-bold leading-snug text-bone/70">
                  {slot.role}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
