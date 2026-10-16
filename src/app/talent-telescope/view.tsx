"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { tinaField, useContent } from "@/components/tina/content";

type Role = { title: string; hire: number; handoff: number };
type Card = { name: string; role: string; city: string; photo: string };
type Callout = { icon: string; title: string; body: string };
type Stat = { value: string; label: string };

type TelescopePage = {
  event: {
    headline: string;
    headlineAccent: string;
    venue: string;
    dates: string;
    booth: string;
  };
  cta: {
    barLabel: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
  };
  form: {
    headline: string;
    body: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    companyPlaceholder: string;
    industryLabel: string;
    industryPlaceholder: string;
    companies: string[];
    industries: string[];
  };
  report: {
    headline: string;
    body: string;
    hireColumn: string;
    handoffColumn: string;
    includeLabel: string;
    annualLabel: string;
    percentLabel: string;
    empty: string;
    roles: Role[];
  };
  talent: { headline: string; cards: Card[] };
  proof: {
    headline: string;
    talentLabel: string;
    handoffLabel: string;
    talentItems: Callout[];
    handoffItems: Callout[];
  };
  education: { headline: string; body: string; stats: Stat[] };
  close: { headline: string; body: string };
};

const emptyRoles: Role[] = [];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const field =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[0.97rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-royal focus:ring-4 focus:ring-royal/10";
const labelClass = "mb-2 block text-sm font-semibold text-ink";

function externalLink(href: string) {
  return /^https?:\/\//.test(href) ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

function CalloutGroup({ label, items }: { label: string; items: Callout[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-royal">{label}</h3>
      <ul className="mt-5 space-y-5">
        {(items ?? []).map((item) => (
          <li key={item.title} className="flex gap-4">
            <Icon name={item.icon as IconName} className="mt-0.5 h-7 w-7 shrink-0 text-cyan" />
            <div>
              <p className="font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/70">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComboField({
  id,
  name,
  label,
  placeholder,
  value,
  options,
  onChange,
  allowCustom = false,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  allowCustom?: boolean;
  autoComplete?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const listId = useId();
  const search = allowCustom ? value : query;
  const normalized = search.trim().toLocaleLowerCase();
  const matches = options
    .filter((item) => item !== "Not listed" && (!normalized || item.toLocaleLowerCase().includes(normalized)))
    .sort((a, b) => {
      const aStarts = a.toLocaleLowerCase().startsWith(normalized);
      const bStarts = b.toLocaleLowerCase().startsWith(normalized);
      return Number(bStarts) - Number(aStarts) || a.localeCompare(b);
    })
    .slice(0, 7);
  const isKnown = options.some((item) => item.toLocaleLowerCase() === value.trim().toLocaleLowerCase());
  const displayValue = allowCustom ? value : open ? query : value;

  const choose = (option: string) => {
    onChange(option);
    setQuery("");
    setOpen(false);
  };

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div
        className="relative"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <input
          id={id}
          name={name}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-expanded={open}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={displayValue}
          onChange={(event) => {
            if (allowCustom) onChange(event.target.value);
            else setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
            if (event.key === "Enter" && matches[0]) {
              event.preventDefault();
              choose(matches[0]);
            }
          }}
          className={`${field} pr-11`}
        />
        <Icon
          name="search"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
        />
        {open && (
          <div
            id={listId}
            role="listbox"
            aria-label={`${label} suggestions`}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-ink/10 bg-white p-2 shadow-xl"
          >
            {matches.map((item) => (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={item === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(item)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-bone focus:bg-bone focus:outline-none ${
                  item === value ? "bg-cyan/15" : ""
                }`}
              >
                {item}
                {item === value && <span className="text-royal">✓</span>}
              </button>
            ))}
            {allowCustom && value.trim() && !isKnown && (
              <button
                type="button"
                role="option"
                aria-selected="false"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setOpen(false)}
                className="mt-1 flex w-full items-center gap-2 rounded-xl bg-cyan/15 px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-cyan/25 focus:bg-cyan/25 focus:outline-none"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan text-xs">+</span>
                Use “{value.trim()}”
              </button>
            )}
            {allowCustom && !value.trim() && (
              <p className="px-3 pb-1 pt-2 text-xs text-ink/50">Start typing to search, or enter a new company.</p>
            )}
            {!allowCustom && normalized && matches.length === 0 && (
              <p className="px-3 py-2 text-sm text-ink/50">No matches found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function TalentTelescopeView() {
  const page = useContent().talentTelescopePage as TelescopePage;
  const reportRoles = page.report.roles;
  const roles = useMemo(() => reportRoles ?? emptyRoles, [reportRoles]);
  const [selection, setSelection] = useState<string[] | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [barHidden, setBarHidden] = useState(false);
  const summaryId = useId();
  const visible = useRef(new Set<Element>());

  const checked = useMemo(() => {
    const titles = new Set(roles.map((role) => role.title));
    const chosen = selection ?? roles.map((role) => role.title);
    return chosen.filter((title) => titles.has(title));
  }, [roles, selection]);

  useEffect(() => {
    const targets = [document.getElementById("telescope-close"), document.querySelector("footer")].filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target);
          else visible.current.delete(entry.target);
        }
        setBarHidden(visible.current.size > 0);
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0 },
    );
    targets.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  const selected = useMemo(
    () => roles.filter((role) => checked.includes(role.title)),
    [roles, checked],
  );
  const hireTotal = selected.reduce((sum, role) => sum + (Number(role.hire) || 0), 0);
  const handoffTotal = selected.reduce((sum, role) => sum + (Number(role.handoff) || 0), 0);
  const savings = Math.max(hireTotal - handoffTotal, 0);
  const percent = hireTotal > 0 ? Math.round((savings / hireTotal) * 100) : 0;
  const summary =
    selected.length === 0
      ? page.report.empty
      : `${page.report.annualLabel}: ${money.format(savings)}, ${percent}% ${page.report.percentLabel}.`;

  const toggleRole = (title: string) => {
    setSelection((current) => {
      const base = current ?? roles.map((role) => role.title);
      return base.includes(title) ? base.filter((item) => item !== title) : [...base, title];
    });
  };

  return (
    <>
      <section className="tex-brick relative overflow-hidden pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="shell relative">
          <Reveal className="max-w-4xl">
            <ul className="mb-4 flex flex-wrap gap-1.5">
              {(
                [
                  ["venue", page.event.venue],
                  ["dates", page.event.dates],
                  ["booth", page.event.booth],
                ] as const
              ).map(([field, value]) => (
                <li key={field}>
                  <span
                    data-tina-field={tinaField(page.event, field)}
                    className="inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[0.8125rem] font-medium text-bone/80"
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
            <h1 data-tina-field={tinaField(page.event, "headline")} className="display text-[clamp(2.6rem,6.2vw,4.8rem)] text-bone">
              {page.event.headline}
              <br />
              <span className="text-cyan">{page.event.headlineAccent}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section id="telescope" className="scroll-mt-24 bg-bone py-16 text-ink md:py-24">
        <Reveal className="shell">
          <div className="overflow-hidden rounded-(--radius-card) border border-ink/10 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
            <form
              onSubmit={(event) => event.preventDefault()}
              aria-label="Sample Talent Telescope report"
              className="order-1 p-7 md:p-9 lg:border-t-0"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-royal lg:hidden">
                1 · Make it yours
              </p>
              <h2 data-tina-field={tinaField(page.form, "headline")} className="display text-3xl text-ink md:text-4xl">
                {page.form.headline}
              </h2>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-ink/70">{page.form.body}</p>
              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="telescope-name" className={labelClass}>
                      {page.form.nameLabel}
                    </label>
                    <input
                      id="telescope-name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="telescope-email" className={labelClass}>
                      {page.form.emailLabel}
                    </label>
                    <input
                      id="telescope-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={field}
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <ComboField
                    id="telescope-company"
                    name="company"
                    label={page.form.companyLabel}
                    placeholder={page.form.companyPlaceholder}
                    value={company}
                    options={page.form.companies ?? []}
                    onChange={setCompany}
                    allowCustom
                    autoComplete="organization"
                  />
                  <ComboField
                    id="telescope-industry"
                    name="industry"
                    label={page.form.industryLabel}
                    placeholder={page.form.industryPlaceholder}
                    value={industry}
                    options={page.form.industries ?? []}
                    onChange={setIndustry}
                  />
                </div>
              </div>
            </form>

            <div className="order-2 border-t border-ink/10 bg-[#f7f7f5] p-5 sm:p-7 md:p-9 lg:border-l lg:border-t-0 lg:border-ink/10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-royal">
                    <span className="lg:hidden">2 · Pick your roles</span>
                    <span className="hidden lg:inline">Your comparison</span>
                  </p>
                  <h2 data-tina-field={tinaField(page.report, "headline")} className="display mt-2 text-3xl text-ink md:text-4xl">
                    {page.report.headline}
                  </h2>
                </div>
                <span className="w-fit rounded-full bg-cyan px-3 py-1.5 text-xs font-bold text-ink">Live estimate</span>
              </div>
              <p className="mt-4 max-w-[55ch] text-[0.97rem] leading-relaxed text-ink/70">{page.report.body}</p>
              <div className="mt-5 hidden text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/45 lg:grid lg:grid-cols-[1.45fr_0.72fr_1fr] lg:items-center lg:pl-7">
                <span>Role</span>
                <span>Typical US hire</span>
                <span className="rounded-t-xl bg-cyan/20 px-3 py-2 text-ink">Your Handoff cost</span>
              </div>
              <ul className="mt-5 space-y-3 lg:mt-0 lg:space-y-0 lg:divide-y lg:divide-ink/10">
                {roles.map((role) => {
                  const on = checked.includes(role.title);
                  const roleSavings = Math.max((Number(role.hire) || 0) - (Number(role.handoff) || 0), 0);
                  const inputId = `telescope-role-${role.title.replace(/\s+/g, "-").toLowerCase()}`;
                  return (
                    <li
                      key={role.title}
                      className={`overflow-hidden rounded-2xl border transition-all lg:rounded-none lg:border-0 ${
                        on ? "border-cyan bg-white shadow-sm lg:bg-transparent lg:shadow-none" : "border-ink/10 bg-white/50 opacity-55"
                      }`}
                    >
                      <div className="grid gap-3 p-4 lg:grid-cols-[1.45fr_0.72fr_1fr] lg:items-stretch lg:p-0">
                        <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3 font-semibold text-ink lg:py-4">
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={on}
                            onChange={() => toggleRole(role.title)}
                            className="mt-0.5 h-5 w-5 shrink-0 accent-royal lg:my-auto lg:h-4 lg:w-4"
                          />
                          <span className="lg:my-auto">
                            <span className="sr-only">{page.report.includeLabel} </span>
                            {role.title}
                          </span>
                        </label>
                        <p className="pl-8 text-sm tabular-nums text-ink/55 lg:my-auto lg:pl-0 lg:text-base">
                          <span className="mr-2 font-semibold uppercase tracking-wider text-ink/40 lg:hidden">
                            Typical US
                          </span>
                          {money.format(Number(role.hire) || 0)}
                        </p>
                        <div className="rounded-xl bg-cyan/20 px-4 py-3 lg:rounded-none lg:px-3">
                          <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-ink/55 lg:hidden">
                            Your Handoff cost
                          </span>
                          <p className="text-2xl font-bold tabular-nums text-ink lg:text-base">{money.format(Number(role.handoff) || 0)}</p>
                          <p className="mt-1 text-sm font-bold text-royal lg:mt-0.5 lg:text-xs">
                            You save {money.format(roleSavings)}/year
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 rounded-(--radius-card) bg-ink p-5 text-bone lg:hidden" aria-labelledby={`${summaryId}-mobile`}>
                <p id={`${summaryId}-mobile`} className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan">
                  Hell yes — your estimated annual savings
                </p>
                <p className="mt-2">
                  <span className="display text-[clamp(2.6rem,13vw,4rem)] text-cyan">
                    {selected.length ? money.format(savings) : "—"}
                  </span>
                </p>
                {selected.length > 0 ? (
                  <p className="mt-2 text-sm font-semibold text-bone/70">
                    That is {percent}% of typical US salary costs back in your budget.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-bone/70">{page.report.empty}</p>
                )}
              </div>
            </div>
            </div>
            <div className="hidden bg-ink px-7 py-7 text-bone md:px-9 lg:block" aria-labelledby={summaryId}>
              <p id={summaryId} className="text-xs font-semibold uppercase tracking-[0.16em] text-bone/55">
                Your estimated {page.report.annualLabel.toLocaleLowerCase()}
              </p>
              <p className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="display text-4xl text-cyan md:text-5xl">
                  {selected.length ? money.format(savings) : "—"}
                </span>
                {selected.length > 0 && (
                  <span className="pb-1 text-lg font-semibold text-bone">
                    {percent}% <span className="font-medium text-bone/60">{page.report.percentLabel}</span>
                  </span>
                )}
              </p>
              <p className="sr-only" aria-live="polite">
                {summary}
              </p>
              {selected.length === 0 && <p className="mt-3 text-sm text-bone/70">{page.report.empty}</p>}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="overflow-hidden bg-ink py-16 text-bone md:py-24" aria-label={page.talent.headline}>
        <div className="shell">
          <Reveal>
            <h2 data-tina-field={tinaField(page.talent, "headline")} className="display text-[clamp(2.1rem,4.8vw,3.6rem)]">
              {page.talent.headline}
            </h2>
          </Reveal>
        </div>
        <ul
          tabIndex={0}
          aria-label={page.talent.headline}
          className="shell mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
        >
          {(page.talent.cards ?? []).map((card) => (
            <li key={`${card.name}-${card.role}`} className="w-64 shrink-0 snap-start sm:w-72">
              <article className="overflow-hidden rounded-(--radius-card) bg-cyan text-ink">
                <div className="px-5 pb-4 pt-5">
                  <p className="text-sm font-medium text-ink/70">{card.name}</p>
                  <p className="text-lg font-bold leading-tight">{card.role}</p>
                  <p className="mt-1 text-sm text-ink/70">{card.city}</p>
                </div>
                <div className="relative aspect-3/4">
                  <Image src={card.photo} alt="" fill sizes="288px" className="object-cover object-[50%_22%]" />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-bone py-16 text-ink md:py-24">
        <div className="shell">
          <Reveal>
            <h2 data-tina-field={tinaField(page.proof, "headline")} className="display text-[clamp(2.1rem,4.8vw,3.6rem)]">
              {page.proof.headline}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <CalloutGroup label={page.proof.talentLabel} items={page.proof.talentItems} />
            </Reveal>
            <Reveal delay={80}>
              <CalloutGroup label={page.proof.handoffLabel} items={page.proof.handoffItems} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#141414] py-16 text-bone md:py-24">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <h2 data-tina-field={tinaField(page.education, "headline")} className="display text-[clamp(2.1rem,4.8vw,3.6rem)]">
              {page.education.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-bone/70">{page.education.body}</p>
          </Reveal>
          <ol className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
            {(page.education.stats ?? []).map((stat, index) => (
              <li key={stat.value} className="flex">
                <Reveal delay={index * 80} className="flex flex-1">
                  <article className="flex-1 rounded-(--radius-card) border border-white/10 bg-white/4 p-7">
                    <p
                      className={`display leading-none text-cyan whitespace-nowrap! ${
                        stat.value.length > 4 ? "text-[clamp(2.15rem,4.8vw,3rem)] lg:text-5xl" : "text-5xl"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-4 text-[0.97rem] leading-relaxed text-bone/75">{stat.label}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="telescope-close" className="scroll-mt-24 bg-bone py-16 text-ink md:py-24">
        <div className="shell max-w-3xl">
          <Reveal>
            <h2 data-tina-field={tinaField(page.close, "headline")} className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[0.95] tracking-tight text-ink">
              {page.close.headline}
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink/70">{page.close.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={page.cta.primaryHref}>{page.cta.primaryLabel}</Button>
              <Button href="#telescope" variant="ghost">
                {page.cta.secondaryLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div
        className={`telescope-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-lg transition-[opacity,transform] duration-300 ${
          barHidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
        aria-hidden={barHidden}
      >
        <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p data-tina-field={tinaField(page.cta, "barLabel")} className="text-sm font-semibold text-bone/70">
            {page.cta.barLabel}
            <span className="mx-2 text-bone/30">·</span>
            {page.event.booth}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href="#telescope"
              tabIndex={barHidden ? -1 : undefined}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/25 px-5 py-2.5 text-sm font-semibold text-bone transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/40"
            >
              {page.cta.secondaryLabel}
            </a>
            <a
              href={page.cta.primaryHref}
              tabIndex={barHidden ? -1 : undefined}
              {...externalLink(page.cta.primaryHref)}
              className="inline-flex items-center justify-center rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/40"
            >
              {page.cta.primaryLabel}
              {/^https?:\/\//.test(page.cta.primaryHref) && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
