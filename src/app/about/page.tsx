import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { TalentCard } from "@/components/talent-card";
import { Soul } from "@/components/sections/soul";
import { ValuesVideo } from "@/components/sections/values-video";
import { aboutPage, site, socialLinks, team } from "@/lib/content";
import { Button } from "@/components/brand";

function SocialMark({ platform }: { platform: "youtube" | "linkedin" | "instagram" }) {
  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#0A66C2" />
        <circle cx="10.3" cy="11.1" r="1.6" fill="#ffffff" />
        <path d="M8.9 13.5h2.8v9.6H8.9z" fill="#ffffff" />
        <path
          d="M13.4 13.5h2.7v1.3h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 2 3.5 4.5v5.3h-2.8V18.5c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.7h-2.8z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
        <defs>
          <linearGradient id="ig" x1="0" y1="32" x2="32" y2="0">
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="35%" stopColor="#FA7E1E" />
            <stop offset="65%" stopColor="#D62976" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="16" fill="url(#ig)" />
        <rect x="9" y="9" width="14" height="14" rx="4" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <circle cx="16" cy="16" r="3.4" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <circle cx="21.2" cy="10.8" r="1.2" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#FF0000" />
      <path d="M12 10.3h8c2 0 3.4 1.4 3.4 3.4v4.6c0 2-1.4 3.4-3.4 3.4h-8c-2 0-3.4-1.4-3.4-3.4v-4.6c0-2 1.4-3.4 3.4-3.4z" fill="#ffffff" />
      <path d="M14.4 13.3l5.2 2.7-5.2 2.7z" fill="#FF0000" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About | Handoff",
  description: aboutPage.lead,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-hero">
        <div className="shell relative">
          <Reveal>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-bone">{aboutPage.headline}</h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{aboutPage.lead}</p>
          </Reveal>

          <Reveal delay={150}>
            <nav aria-label="Handoff social media" className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="group grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal md:h-20 md:w-20"
                >
                  <span className="grid h-full w-full place-items-center">
                    <span className="scale-[1.8] md:scale-[2]">
                      <SocialMark platform={social.platform} />
                    </span>
                  </span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Why Handoff exists, in Anthony's words from the 10/5 call. */}
      <section className="relative overflow-hidden bg-ink pb-16 text-bone md:pb-24">
        <div className="shell relative">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.8vw,3.6rem)]">{aboutPage.gap.headline}</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{aboutPage.gap.body}</p>
          </Reveal>

          <Reveal delay={90} className="mt-16">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{aboutPage.winWin.headline}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {aboutPage.winWin.sides.map((side, i) => (
              <Reveal key={side.title} delay={i * 90} className="h-full">
                <div className="h-full rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-7 md:p-8">
                  <h3 className="text-base font-semibold uppercase tracking-[0.04em] text-cyan md:text-lg">
                    {side.title}
                  </h3>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-bone/80 md:text-lg">{side.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-pretty border-l-4 border-cyan pl-5 text-base leading-relaxed text-bone/80 md:text-lg">
            {aboutPage.winWin.closer}
          </p>

          <Reveal className="mt-16">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{aboutPage.founder.headline}</h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-bone/75 md:text-xl">{aboutPage.founder.body}</p>
          </Reveal>
        </div>
      </section>

      <ValuesVideo />

      <section className="bg-ink pb-16 text-bone md:pb-20">
        <div className="shell">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{aboutPage.teamHeadline}</h2>
          </Reveal>
        </div>
        <div className="shell mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
          {team.map((person, i) => (
            <TalentCard key={person.slug} {...person} index={i} />
          ))}
        </div>
      </section>

      {/* Same Alma-over-the-footage section as the homepage, per direct
          instruction, in place of the old quote-and-panel layout. */}
      <Soul variant="dictionary" />

      <section className="bg-ink section-py-tight text-bone">
        <div className="shell">
          <Reveal>
            <p className="display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-tight">{aboutPage.close}</p>
            <div className="mt-8">
              <Button href={site.bookCall}>{aboutPage.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
