"use client";

import { Button, CtaNote } from "../brand";
import { Reveal } from "../reveal";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * A compact repeat of the main CTA between sections: one "Book a call"
 * button and the line under it. Deliberately small (no heading, little
 * padding), so it reads as a pause in the page, not another section.
 * `className` sets the background and spacing, to blend with the section
 * above it.
 */
export function CtaBand({ tone = "onDark", className = "" }: { tone?: "onDark" | "onLight"; className?: string }) {
  const { cta, site } = useContent();
  return (
    <div className={className}>
      <Reveal className="shell text-center">
        <span data-tina-field={tinaField(cta, "book")}>
          <Button href={site.bookingUrl}>{cta.book}</Button>
        </span>
        <CtaNote tone={tone} className="mt-3" />
      </Reveal>
    </div>
  );
}
