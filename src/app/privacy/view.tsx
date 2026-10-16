"use client";

import { tinaField, useLiveDoc } from "@/components/tina/content";

type Section = { heading: string; paragraphs?: string[]; bullets?: string[] };

/**
 * The privacy policy (10/16): a plain, readable long-form page. While the
 * draft notice is on, a banner says the policy isn't in effect yet.
 */
export function PrivacyView({ payload }: { payload: { data: any; query: string; variables: { relativePath?: string } } }) {
  const page = useLiveDoc(payload, "privacy");
  const sections = (page.sections ?? []) as Section[];

  return (
    <>
      <section className="relative overflow-hidden bg-ink section-py-tight text-bone">
        <div className="shell relative">
          <h1 data-tina-field={tinaField(page, "headline")} className="display text-[clamp(2.4rem,5.6vw,4.4rem)] text-bone">
            {page.headline}
          </h1>
          <p data-tina-field={tinaField(page, "effectiveDate")} className="mt-5 text-base text-bone/70">
            Effective date: {page.effectiveDate}
          </p>
        </div>
      </section>

      <section className="relative bg-bone section-space text-ink">
        <div className="shell relative">
          <div className="max-w-[72ch]">
            {page.draft && (
              <p
                role="note"
                data-tina-field={tinaField(page, "draftNotice")}
                className="mb-12 rounded-2xl border-2 border-royal/40 bg-white px-5 py-4 text-sm font-semibold leading-relaxed text-royal"
              >
                {page.draftNotice}
              </p>
            )}
            {sections.map((section, i) => (
              <div key={section.heading} className={i > 0 ? "mt-12" : ""}>
                <h2 className="text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
                {(section.paragraphs ?? []).map((text) => (
                  <p key={text} className="mt-4 leading-relaxed text-ink/80">
                    {text}
                  </p>
                ))}
                {(section.bullets ?? []).length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/80 marker:text-royal">
                    {(section.bullets ?? []).map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
