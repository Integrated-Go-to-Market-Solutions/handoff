import { Button, Pill } from "../brand";
import { Reveal } from "../reveal";
import { TypedPoints } from "../typed-points";
import Link from "next/link";
import { models, modelsCompare, modelsFootnote, modelsIntro, services, site } from "@/lib/content";

/* Two equally strong gradients with the same cyan outline, so neither
   option reads as the lesser choice. Each card also carries its own list in
   the same treatment, so neither reads as "the base plan plus extras". */
const cardAccents = [
  {
    card: "bg-gradient-to-br from-cyan to-cyan-dim text-ink",
    pill: "!border-ink/30 !text-ink",
    panel: "bg-ink/10",
    button: "ink" as const,
  },
  {
    card: "bg-gradient-to-br from-royal to-azure-deep text-bone",
    pill: "!border-bone/40 !text-bone",
    panel: "bg-white/10",
    button: "cyan" as const,
  },
] as const;

/** The earlier single-list cards, kept as the default so /v2 is unchanged. */
function ClassicModels() {
  return (
    <section id="models" className="relative overflow-hidden bg-ink section-py-hero text-bone">
      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <h2 className="display mt-5 text-[clamp(2.1rem,4.8vw,3.7rem)]">
            Two ways to work together
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-bone/70">
            Start with the level of ownership that fits your team. Managed
            Staffing is the full-service path, and Recruitment & Placement is
            the simplest way to make one great hire.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {models.map((model, i) => {
            const accent = cardAccents[i % cardAccents.length];
            return (
              <Reveal key={model.name} delay={i * 110}>
                <article
                  className={`flex h-full flex-col rounded-[var(--radius-card)] border-2 border-cyan p-8 shadow-[0_0_28px_-10px_rgba(61,214,189,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_36px_-6px_rgba(61,214,189,0.75)] ${accent.card}`}
                >
                  <Pill tone="outline" className={accent.pill}>
                    {model.tag}
                  </Pill>
                  <h3 className="display mt-5 text-2xl md:text-[1.75rem]">{model.name.replace("-", "‑")}</h3>
                  <p className="display mt-2 text-[clamp(2.2rem,4vw,2.9rem)] leading-none">{model.price}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] opacity-75">{model.terms}</p>
                  <p className="mt-5 text-sm font-medium opacity-80">{model.forWho}</p>
                  <div className="mt-6 border-t-2 border-current/15 pt-6">
                    <TypedPoints points={model.points} />
                  </div>
                  <p className="mb-9 mt-6 text-[0.97rem] leading-relaxed opacity-80">{model.copy}</p>
                  <Button href={site.bookCall} variant={accent.button} size="lg" className="mt-auto w-full">
                    Find out more
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={models.length * 110} className="mt-8">
          <p className="max-w-[58ch] text-sm leading-relaxed text-bone/55">{modelsFootnote}</p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * `detailed` (homepage and industry pages): the two models as one compact
 * comparison table. Shared features are one row; the differences are
 * itemised. The featured column (Managed staffing) sits on a soft glowing
 * panel that runs from its header to the last row.
 *
 * Built on a CSS grid rather than a <table> so the panel can span the
 * column behind the cells; ARIA table roles keep it a table to screen
 * readers. Each row is a subgrid of the three columns.
 *
 * Motion: the whole table reveals on scroll (Reveal), and its rows follow
 * with a light stagger while the checks draw in. Reduced motion shows the
 * final state.
 */
const ROW_STAGGER_MS = 70;

/** Row entrance, keyed off the Reveal wrapper's `is-in`. */
const rowMotion =
  "translate-y-3 opacity-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-brand)] group-[.is-in]:translate-y-0 group-[.is-in]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

function DrawnCheck({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 20 20" className="mx-auto h-5 w-5 text-cyan" role="img" aria-label="Included">
      <path
        d="M4 10.5l4 4 8-9"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1"
        style={{ transitionDelay: `${delay}ms` }}
        className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-[.is-in]:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0] motion-reduce:transition-none"
      />
    </svg>
  );
}

function CompareValue({ value, delay }: { value: (typeof modelsCompare.rows)[number]["values"][number]; delay: number }) {
  if (value === true) return <DrawnCheck delay={delay} />;
  if (value === false) {
    return (
      <span className="mx-auto block h-0.5 w-3.5 rounded-full bg-bone/25" role="img" aria-label="Not included" />
    );
  }
  if (typeof value === "string") return <span className="text-bone/90">{value}</span>;
  return <span className={value.accent ? "text-cyan" : "text-bone/90"}>{value.text}</span>;
}

function CompareModels({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  const { columns, rows, featured } = modelsCompare;
  const cell = "flex items-center justify-center px-1.5 py-3.5 text-center sm:px-4 md:py-4";
  return (
    <section id="models" className="relative overflow-hidden bg-ink section-py-hero text-bone">
      <div className="shell relative">
        <div className="mx-auto max-w-5xl rounded-[var(--radius-card)] border border-white/10 bg-ink-100 px-3 py-9 sm:px-8 md:px-10 md:py-12">
          <Reveal className="text-center">
            <Heading className="text-balance text-[clamp(1.7rem,4vw,2.9rem)] font-bold leading-tight text-white">
              {modelsIntro.headline}
            </Heading>
            <p className="mx-auto mt-3 text-pretty text-base leading-relaxed text-bone/75 md:text-lg">
              {modelsIntro.subhead}
            </p>
            <p className="mt-4 text-base font-medium text-bone/80 md:text-xl">
              {modelsIntro.startingAt.label}{" "}
              <span className="font-semibold text-cyan">{modelsIntro.startingAt.price}</span>
            </p>
          </Reveal>

          <Reveal className="group mt-8 md:mt-10">
            {/* Scrolls inside itself only if the three columns can't fit. */}
            <div className="overflow-x-auto [scrollbar-width:thin]">
              <div
                role="table"
                aria-label="Compare Direct Hire with Managed Staffing"
                // Templates inline: arbitrary grid-template classes did not
                // generate reliably here, and rows must not auto-place.
                style={{
                  gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr)",
                  gridTemplateRows: `repeat(${rows.length + 1}, auto)`,
                }}
                className="grid min-w-[15rem] text-[0.8rem] sm:text-[0.95rem] md:text-base"
              >
                {/* The featured column's panel, behind its cells. */}
                <div
                  aria-hidden="true"
                  style={{ gridColumn: featured + 2, gridRow: `1 / ${rows.length + 2}` }}
                  className="rounded-2xl bg-gradient-to-b from-cyan/[0.11] to-cyan/[0.05] shadow-[0_0_0_1px_rgba(61,214,189,0.22),0_0_44px_-14px_rgba(61,214,189,0.4)]"
                />

                <div role="row" style={{ gridRow: 1, gridColumn: "1 / -1" }} className={`grid grid-cols-subgrid ${rowMotion}`}>
                  <span role="columnheader" className="sr-only">
                    Feature
                  </span>
                  {columns.map((name, c) => {
                    const service = services.find((entry) => entry.name === name);
                    return (
                      <span
                        key={name}
                        role="columnheader"
                        style={{ gridColumn: c + 2 }}
                        className={`${cell} flex-col gap-1 py-4 font-semibold leading-snug text-white md:py-5`}
                      >
                        {name}
                        {/* The doc's "See Direct Hire" / "See Managed Staffing" links. */}
                        {service && (
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-[0.7rem] font-semibold text-cyan hover:underline sm:text-sm"
                          >
                            See {name} <span aria-hidden="true">&rarr;</span>
                          </Link>
                        )}
                      </span>
                    );
                  })}
                </div>

                {rows.map((row, r) => {
                  const delay = (r + 1) * ROW_STAGGER_MS;
                  return (
                    <div
                      key={row.label}
                      role="row"
                      style={{ gridRow: r + 2, gridColumn: "1 / -1", transitionDelay: `${delay}ms` }}
                      className={`grid grid-cols-subgrid border-t border-white/10 ${rowMotion}`}
                    >
                      <div role="rowheader" className="flex flex-col justify-center py-3.5 pl-1 pr-2 text-left sm:pl-4 md:py-4">
                        <span className="font-semibold leading-snug text-white">{row.label}</span>
                        {row.note && (
                          <span className="mt-1 text-[0.68rem] leading-snug text-smoke sm:text-[0.8rem]">{row.note}</span>
                        )}
                      </div>
                      {row.values.map((value, c) => (
                        <div key={c} role="cell" className={`${cell} leading-snug`}>
                          <CompareValue value={value} delay={delay + 250} />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <p className="mx-auto mt-8 text-balance text-center text-xs leading-relaxed text-smoke md:text-sm">
            {modelsCompare.footnote} {modelsIntro.addOns}
          </p>
          <div className="mt-6 text-center">
            <Button href={site.bookCall}>{modelsIntro.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** `asPage`: on /pricing the section headline is the page's h1. */
export function Models({ detailed = false, asPage = false }: { detailed?: boolean; asPage?: boolean } = {}) {
  return detailed ? <CompareModels asPage={asPage} /> : <ClassicModels />;
}
