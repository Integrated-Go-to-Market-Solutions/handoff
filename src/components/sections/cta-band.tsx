import { Button, CtaNote } from "../brand";
import { Reveal } from "../reveal";
import { cta, site } from "@/lib/content";

/**
 * A compact repeat of the main CTA between sections: one "Book a call"
 * button and the line under it. Deliberately small (no heading, little
 * padding), so it reads as a pause in the page, not another section.
 * `className` sets the background and spacing, to blend with the section
 * above it.
 */
export function CtaBand({ tone = "onDark", className = "" }: { tone?: "onDark" | "onLight"; className?: string }) {
  return (
    <div className={className}>
      <Reveal className="shell text-center">
        <Button href={site.bookingUrl}>{cta.book}</Button>
        <CtaNote tone={tone} className="mt-3" />
      </Reveal>
    </div>
  );
}
