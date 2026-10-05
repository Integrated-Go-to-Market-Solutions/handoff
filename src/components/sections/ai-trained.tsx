import Image from "next/image";
import { Reveal } from "../reveal";
import { aiTrained } from "@/lib/content";

/* TODO: swap for Jazmin's ORIGINAL badge asset, NOT the version Nicole
   updated. This is the badge file already on the site, as a stand-in. */
const BADGE_SRC = "/images/badge-new.webp";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-[0.72rem] tracking-[0.2em] text-cyan">{children}</p>;
}

/**
 * The hero claims AI TRAINED; this block says what that means. One dark
 * panel: the claim on the left (label, headline, short body, the badge
 * with its Coursera line), the detail in a bordered card on the right
 * (training topics, a featured course, the tool logos). Below 1024px the
 * card stacks under the claim.
 *
 * A tight aside between two heavier sections, so the tight-padding tier.
 */
export function AiTrained() {
  return (
    <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
      <div className="shell relative">
        <div className="grid gap-8 rounded-[var(--radius-card)] border border-white/10 bg-ink-100 p-5 sm:p-8 md:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
          <Reveal>
            <Label>{aiTrained.eyebrow}</Label>
            <h2 className="mt-3 max-w-[16ch] text-balance text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-tight text-white">
              {aiTrained.headline}
            </h2>
            <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-bone/80 md:text-lg">{aiTrained.body}</p>

            <div className="mt-7 flex items-center gap-4">
              <Image
                src={BADGE_SRC}
                alt={aiTrained.badgeAlt}
                width={240}
                height={240}
                unoptimized
                className="h-16 w-16 shrink-0 md:h-[4.5rem] md:w-[4.5rem]"
              />
              <p className="text-sm font-medium leading-snug text-bone/85 md:text-base">
                {aiTrained.certLines.map((line, i) => (
                  <span key={line} className="block">
                    {line}
                    {i < aiTrained.certLines.length - 1 && <span className="sr-only">, </span>}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-7">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div>
                  <Label>{aiTrained.topicsLabel}</Label>
                  <ul className="mt-3 space-y-2.5">
                    {aiTrained.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-3 text-base font-medium text-bone">
                        <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true">
                          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M6.5 10.2l2.4 2.4 4.6-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label>{aiTrained.coursesLabel}</Label>
                  {/* Static since the redesign. The old typing animation
                      (TypingCycle over aiTrained.courses) can go back here
                      if the title should rotate. */}
                  <p className="mt-3 text-balance text-lg font-semibold leading-snug text-white md:text-xl">{aiTrained.courses[0]}</p>
                  <p className="mt-2 text-sm text-smoke">{aiTrained.coursesNote}</p>
                </div>
              </div>

              <hr className="my-6 border-white/10" />

              <Label>{aiTrained.toolsLabel}</Label>
              {/* Five across from 640px; phones wrap to 3 + 2. */}
              <ul className="mt-4 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5">
                {aiTrained.tools.map((tool) => (
                  <li key={tool.name} className="flex flex-col items-center gap-2 text-center text-xs font-medium text-bone sm:text-sm">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-ink/60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/images/ai-tools/${tool.file}.svg`} alt="" width={28} height={28} className="h-7 w-7" />
                    </span>
                    {tool.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
