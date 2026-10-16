"use client";

import { Reveal } from "@/components/reveal";
import { Breadcrumb } from "@/components/breadcrumb";
import { Eyebrow } from "@/components/brand";
import { AshbyJobBoard } from "@/components/ashby-job-board";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Where the Careers "Apply" buttons go (10/16): the careers hero style, then
 * Handoff's Ashby job board on a light section, with a plain link to the
 * board in case the embed can't load.
 */
export function OpenPositionsView() {
  const { careersPage } = useContent();
  const open = careersPage.openPositions;

  return (
    <>
      <section className="halftone relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <Breadcrumb items={[{ label: careersPage.eyebrow, href: "/careers" }, { label: open.headline }]} />
          <Reveal>
            <Eyebrow className="mb-4">{careersPage.eyebrow}</Eyebrow>
            <h1 data-tina-field={tinaField(open, "headline")} className="display text-[clamp(2.4rem,5.6vw,4.4rem)] text-bone">
              {open.headline}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-white section-space text-ink">
        <div className="shell relative">
          <AshbyJobBoard boardUrl={open.jobBoardUrl} />
          <a
            href={open.jobBoardUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-tina-field={tinaField(open, "fallbackLink")}
            className="mt-8 inline-block py-2 text-sm font-semibold text-royal underline-offset-4 hover:underline"
          >
            {open.fallbackLink}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </>
  );
}
