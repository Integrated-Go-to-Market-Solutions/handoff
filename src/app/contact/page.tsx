import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/brand";
import { ContactForm } from "@/components/contact-form";
import { contactPage, models } from "@/lib/content";

export const metadata: Metadata = {
  title: contactPage.title,
  description: contactPage.description,
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight">
        <div className="shell relative grid gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <Reveal delay={80}>
              <Eyebrow className="mb-5 md:mb-6">{contactPage.eyebrow}</Eyebrow>
              <h1 className="display text-[clamp(2.4rem,5.4vw,4.1rem)] text-bone">
                {contactPage.headline}{" "}
                <span className="text-cyan">{contactPage.headlineAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-bone/70">
                {contactPage.body}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 rounded-(--radius-card) border border-white/10 bg-white/4 p-7">
                <ul className="mt-5 space-y-3.5">
                  {contactPage.expect.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.97rem] text-bone/80">
                      <svg
                        viewBox="0 0 20 20"
                        className="mt-1 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10.5l4 4 8-9"
                          fill="none"
                          stroke="var(--color-royal)"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <dl className="mt-10 grid gap-5 sm:grid-cols-3">
                {models.map((model) => (
                  <div key={model.name}>
                    <dt className="text-[0.82rem] font-semibold text-bone">
                      {model.name}
                    </dt>
                    <dd className="mt-1 text-[0.82rem] leading-snug text-bone/55">
                      {model.price}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
