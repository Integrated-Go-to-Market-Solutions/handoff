"use client";

import { Reveal } from "../reveal";
import { IconBadge, type IconName } from "../icon";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Straight from the sales deck's "Why LATAM" slide — same three reasons,
 * same bullets. Per direct instruction: light gray background, reasons
 * listed without numbers.
 *
 * Royal blue is the section's accent: the thin line icons, matched to the
 * homepage industry tiles (10/5). The headline is black.
 *
 * The LATAM outline was removed 10/5: the talent map above already places
 * the region, so this section doesn't need a second geography anchor. A
 * light people image goes behind it once Handoff sends a new team shot.
 */
export function WhyLatam() {
  const { whyLatam } = useContent();
  return (
    <section className="relative overflow-hidden bg-bone pb-10 pt-24 text-ink md:pb-12 md:pt-34">
      <div className="shell relative">
        <Reveal className="max-w-5xl">
          <h2 data-tina-field={tinaField(whyLatam, "headline")} className="display text-[clamp(2.1rem,4.8vw,3.7rem)] text-ink">
            {whyLatam.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70 md:text-xl">
            {whyLatam.subhead}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyLatam.categories.map((category: any, i: number) => (
            <Reveal
              key={category.title}
              delay={i * 100}
              className="group h-full rounded-(--radius-card) border-2 border-ink/10 bg-white/85 p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-royal/40 hover:shadow-md md:p-7"
            >
              <IconBadge name={category.icon as IconName} />
              <h3 className="display mt-5 text-xl leading-tight text-ink">
                {category.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-ink/65">
                {category.tagline}
              </p>
              <ul className="mt-4 space-y-2.5">
                {category.bullets.map((bullet: any) => (
                  <li key={bullet} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink/75">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-dim" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
