import type { Metadata } from "next";
import { TestimonialMix } from "@/components/testimonial-mix";
import { clientQuotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials preview | Handoff",
  robots: { index: false, follow: false },
};

export default function TestimonialsPreview() {
  return (
    <section className="relative overflow-hidden bg-bone section-py text-ink">
      <div className="shell relative">
        <p className="mb-6 inline-block rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan">
          Preview · videos use a placeholder
        </p>
        <h2 className="display max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] text-ink">
          {clientQuotes.headline}
        </h2>
        <TestimonialMix />
      </div>
    </section>
  );
}
