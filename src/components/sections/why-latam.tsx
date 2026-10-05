import { Reveal } from "../reveal";
import { IconBadge, type IconName } from "../icon";
import { LatamMap } from "../latam-map";
import { whyLatam } from "@/lib/content";

/**
 * Straight from the sales deck's "Why LATAM" slide — same three reasons,
 * same bullets. Per direct instruction: light gray background, a subtle
 * darker-gray sketch of the LATAM outline as a watermark rather than a
 * literal map graphic, reasons listed without numbers, icons in the
 * cyan-outline treatment from the brand guide's Elements Usage page.
 *
 * Royal blue is the section's accent: the map outline, the icon rings and
 * the icons themselves at rest. The headline is black.
 */
export function WhyLatam() {
  return (
    <section className="relative overflow-hidden bg-bone pb-10 pt-24 text-ink md:pb-12 md:pt-[8.5rem]">
      {/* The LATAM outline, traced from the reference map in
          "background ideas" (the watermarked stock file itself is never
          embedded). A line sketch in slightly darker gray at low opacity:
          enough to place the section, not enough to compete with it. */}
      <LatamMap
        className="pointer-events-none absolute -right-6 top-1/2 h-[135%] aspect-[1014/1293] -translate-y-1/2 md:right-2 lg:right-8"
        tone="royal"
        baseClassName="bg-royal opacity-20"
        glowClassName="opacity-30 max-md:opacity-20"
      />

      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.7rem)] text-ink">
            {whyLatam.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyLatam.categories.map((category, i) => (
            <Reveal
              key={category.title}
              delay={i * 100}
              className="group h-full rounded-[var(--radius-card)] border-2 border-ink/10 bg-white/85 p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-royal/40 hover:shadow-md md:p-7"
            >
              <IconBadge name={category.icon as IconName} className="h-14 w-14" />
              <h3 className="display mt-5 text-xl leading-tight text-ink">
                {category.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-ink/65">
                {category.tagline}
              </p>
              <ul className="mt-4 space-y-2.5">
                {category.bullets.map((bullet) => (
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
