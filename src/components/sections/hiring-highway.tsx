"use client";

import { useEffect, useRef } from "react";
import { Button, CtaNote } from "../brand";
import { Reveal } from "../reveal";
import { HandoffCheckIcon, HuntIcon, ScopeIcon, ShortlistIcon } from "../highway-icons";
import { tinaField, useContent } from "@/components/tina/content";

/** Discovery = magnifying glass, The Vet = scope, The Shortlist = two people, The Guarantee = the Handoff check. */
const stepIcons = [HuntIcon, ScopeIcon, ShortlistIcon, HandoffCheckIcon];

/** Share of the sticky scroll spent filling the line; the rest holds the finished state. */
const FILL_SHARE = 0.8;

/**
 * The Hands-off Hiring System. Desktop: the section pins while a horizontal
 * line fills left to right, and each step's icon pops in as the line
 * reaches it; once all four are in, the page scrolls on. Below 1024px it is
 * a plain vertical stack whose icons pop in as they enter the viewport.
 * Reduced motion gets no pinning and every step shown at once.
 *
 * `compact` is the homepage version: shorter pin, the body copy hidden on
 * phones, and a button through to /how-it-works.
 *
 * `hero` opens /how-it-works (10/22 live review, W-61): the title is the
 * page's h1 and the button scrolls down to the step-by-step detail. No
 * scroll animation there, and the cards show the step names only, since
 * the copy is right below (10/28, W-72).
 *
 * All four cards are the same size: each icon sits in an identical slot, so
 * the cards start on one line, and the cards stretch to the tallest one.
 * The closing line and button sit inside the pinned view, just under the
 * cards.
 */
export function HiringHighway({ compact = false, hero = false }: { compact?: boolean; hero?: boolean }) {
  const { process, site } = useContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const line = lineRef.current;
    if (!track || !sticky || !line) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const steps = stepRefs.current;
    const n = steps.length;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduced.matches || hero) {
        line.style.setProperty("--hs-fill", "1");
        for (const s of steps) s?.classList.add("in");
        return;
      }

      if (desktop.matches) {
        const rect = track.getBoundingClientRect();
        const travel = Math.max(track.offsetHeight - sticky.offsetHeight, 1);
        const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
        const fill = Math.min(progress / FILL_SHARE, 1);
        line.style.setProperty("--hs-fill", String(fill));
        steps.forEach((s, i) => {
          if (!s) return;
          const reached = i === 0 ? rect.top < window.innerHeight * 0.6 : fill >= i / (n - 1) - 0.001;
          s.classList.toggle("in", reached);
        });
        return;
      }

      // Stacked layout: each step pops in as it scrolls into view, and stays.
      for (const s of steps) {
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.85) s.classList.add("in");
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hero]);

  const steps = process.steps;
  const last = steps.length - 1;
  const Heading = hero ? "h1" : "h2";

  return (
    <section id="process" className="hw-dots relative scroll-mt-20 bg-ink text-bone">
      <div
        ref={trackRef}
        className={`relative ${hero ? "" : compact ? "lg:h-[210vh]" : "lg:h-[250vh]"} motion-reduce:lg:h-auto`}
      >
        <div
          ref={stickyRef}
          className={
            hero
              ? ""
              : "lg:sticky lg:top-18 lg:flex lg:h-[calc(100vh-72px)] lg:flex-col lg:justify-center motion-reduce:lg:static motion-reduce:lg:h-auto"
          }
        >
          <div
            className={`shell w-full lg:py-8 short:py-4 ${
              compact ? "section-space" : "pb-14 pt-14 md:pb-20 md:pt-20"
            }`}
          >
            <Reveal className="mx-auto max-w-6xl text-center">
              <Heading
                data-tina-field={tinaField(process, "titleParts")}
                className={`display short:text-[2.6rem] ${
                  compact ? "text-[clamp(2rem,4.4vw,3.4rem)]" : "text-[clamp(2.1rem,4.8vw,3.8rem)]"
                }`}
              >
                {process.titleParts.before}{" "}
                <span className="hw-swipe">{process.titleParts.swipe}</span>{" "}
                {process.titleParts.after}
              </Heading>
              {/* Supporting line (not the old "Four steps…" tagline). */}
              <p className="mx-auto mt-4 max-w-[58ch] text-balance text-base leading-relaxed text-bone/70 md:text-lg short:mt-2 short:text-base">
                {process.body}
              </p>
            </Reveal>

            <div className="relative section-gap short:mt-7">
              {/* Desktop only: the line runs through the centres of the icon slots. */}
              <div
                className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-1 rounded-full bg-white/10 lg:block"
                aria-hidden="true"
              >
                <div ref={lineRef} className="hs-fill h-full rounded-full bg-cyan shadow-[0_0_14px_rgba(61,214,189,0.7)]" />
              </div>

              <ol className="grid gap-4 lg:grid-cols-4 lg:gap-6">
                {steps.map((step: any, i: number) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  const isEnd = i === last;
                  return (
                    <li
                      key={step.title}
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      className="hs-step relative flex items-start gap-4 lg:flex-col lg:items-stretch lg:gap-0"
                    >
                      {/* Same slot for every icon (64px wide on phones, 84px
                          tall on desktop), so the Guarantee's larger icon no
                          longer pushes its card out of line. */}
                      <span className="grid w-16 shrink-0 place-items-center lg:h-21 lg:w-full">
                        <span
                          className={`hs-icon relative z-10 grid place-items-center rounded-full border-2 ${
                            isEnd
                              ? "h-16 w-16 border-cyan bg-cyan shadow-[0_0_32px_-4px_rgba(61,214,189,0.85)] lg:h-21 lg:w-21"
                              : "h-14 w-14 border-cyan/40 bg-ink lg:h-17 lg:w-17"
                          }`}
                        >
                          <Icon cut="#1f1f1f" className="h-9 w-9 lg:h-11 lg:w-11" />
                        </span>
                      </span>

                      <div
                        className={`hs-card min-w-0 flex-1 rounded-(--radius-card) border-2 p-5 lg:mt-5 lg:text-center short:mt-4 short:p-4 ${
                          isEnd
                            ? "border-cyan bg-cyan text-ink shadow-[0_0_36px_-8px_rgba(61,214,189,0.8)]"
                            : "border-cyan/25 bg-ink-100 text-bone"
                        } ${compact ? "" : "md:p-6"}`}
                      >
                        <h3 className="display text-xl leading-tight">{step.title}</h3>
                        {!hero && (
                        <p
                          className={`mt-2 font-text leading-relaxed ${isEnd ? "text-ink/85" : "text-bone/75"} ${
                            compact ? "hidden text-sm md:block" : "text-[0.95rem] short:text-sm"
                          }`}
                        >
                          {step.body}
                        </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <Reveal className="mt-8 text-center lg:mt-10 short:mt-5">
              <p
                className={`mx-auto max-w-[62ch] font-text font-medium leading-relaxed text-bone/85 ${
                  compact ? "text-base md:text-lg short:text-base" : "text-lg md:text-xl short:text-base"
                }`}
              >
                {process.closer.line}
              </p>
              <div className="mt-5 short:mt-4">
                {hero ? (
                  <Button href="#timeline">{process.teaserCta}</Button>
                ) : compact ? (
                  <Button href={process.teaserHref}>{process.teaserCta}</Button>
                ) : (
                  <>
                    <Button href={site.bookCall} size="lg">
                      {process.closer.cta}
                    </Button>
                    <CtaNote className="mt-3" />
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
