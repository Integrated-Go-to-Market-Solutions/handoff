"use client";

import { useState } from "react";
import { Reveal } from "../reveal";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Native `<details>` opened with no transition at all — Nico's feedback on
 * the follow-up call: "you click it and it instantly goes into the text. It
 * doesn't have like a motion on it... those little micro interactions is,
 * in my experience, what makes a site look great." Grid-rows 0fr/1fr gives
 * a smooth open/close without measuring heights in JS.
 */
function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink transition-colors hover:text-royal"
        >
          <span className={open ? "text-royal" : undefined}>{q}</span>
          <span className="relative h-4 w-4 shrink-0">
            <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current" />
            <span
              className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 ${
                open ? "rotate-90 opacity-0" : ""
              }`}
            />
          </span>
        </button>
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="mb-6 mt-4 max-w-[68ch] leading-relaxed text-ink/70">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faq() {
  const { faqs } = useContent();
  return (
    <section className="relative overflow-hidden bg-bone section-py-hero text-ink">
      <div className="shell relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <h2 className="display mt-5 text-[clamp(2.1rem,4.5vw,3.4rem)] text-ink">
            The questions
            <br />
            <span className="text-royal">we actually get</span>
          </h2>
          <p className="mt-6 max-w-[42ch] leading-relaxed text-ink/70">
            If the honest answer is that we are not your fit, that is the answer
            you will get on the call.
          </p>
        </Reveal>

        <div>
          {faqs.map((faq, i) => (
            <div key={faq.q} data-tina-field={tinaField(faq, "q")}>
              <FaqItem q={faq.q} a={faq.a} delay={i * 60} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
