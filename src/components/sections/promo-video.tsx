"use client";

import { tinaField, useContent } from "@/components/tina/content";

/**
 * Brand promo under the Handoff Hiring System on /how-it-works. Grayscale
 * like the site's other footage; plays only when the visitor presses play,
 * starting muted.
 */
export function PromoVideo() {
  const { process } = useContent();
  return (
    <section className="hw-dots relative bg-ink pb-20 text-bone md:pb-32">
      <div className="shell relative">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-(--radius-brand) border-2 border-cyan/50 bg-ink shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)]">
          <video
            className="block aspect-video w-full bg-ink grayscale"
            src={process.promo.src}
            poster={process.promo.poster}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label={process.promo.label}
            data-tina-field={tinaField(process, "promo")}
          />
        </div>
      </div>
    </section>
  );
}
