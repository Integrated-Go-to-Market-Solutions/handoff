"use client";

import { useEffect, useRef, useState } from "react";
import { CtaNote } from "./brand";
import { contactPage, roleGroups } from "@/lib/content";

/**
 * Two short steps: the role first (what, how many, when), then contact
 * details. Answers live in state, so "Back" keeps them. Each step is checked
 * before moving on; errors sit under their field (aria-invalid +
 * aria-describedby), focus jumps to the first one, and a live region
 * announces them. "Next" moves focus to the top of step 2. Submits JSON to
 * /api/contact, with the honeypot ("fax") kept from the old form.
 */

type Values = {
  role: string;
  roleOther: string;
  headcount: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
  fax: string; // honeypot
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "ok" | "error";

const copy = contactPage.form;
const OTHER = copy.role.other;
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const field =
  "w-full rounded-2xl border bg-white px-4 py-3 text-[0.97rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-royal focus:ring-4 focus:ring-royal/10";
const label = "mb-2 block text-sm font-semibold text-ink";

function validate(step: 1 | 2, v: Values): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!v.role) e.role = "Choose the role you're hiring for.";
    else if (v.role === OTHER && !v.roleOther.trim()) e.roleOther = "Tell us which role.";
    if (!v.headcount) e.headcount = "Choose how many people.";
    if (!v.timeline) e.timeline = "Choose when you need them.";
  } else {
    if (!v.name.trim()) e.name = "Add your name.";
    if (!v.email.trim()) e.email = "Add your work email.";
    else if (!isEmail(v.email.trim())) e.email = "That email address doesn't look right.";
    if (!v.company.trim()) e.company = "Add your company name.";
  }
  return e;
}

/** Shown under a field when it has an error. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}

/** A row of pill-style radio buttons (How many / When). */
function Choice({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: "headcount" | "timeline";
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset
      role="radiogroup"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={label}>{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option, i) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              id={i === 0 ? name : undefined}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-w-[4.5rem] items-center justify-center rounded-full border-2 px-4 py-2.5 text-[0.95rem] font-semibold transition-colors peer-checked:border-royal peer-checked:bg-royal peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-royal/25 ${
                error ? "border-red-400 text-ink" : "border-ink/15 text-ink hover:border-royal/50"
              }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

export function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Values>({
    role: "",
    roleOther: "",
    headcount: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    message: "",
    fax: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const step2Ref = useRef<HTMLHeadingElement>(null);
  const step1Ref = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // After a step change (not on first load), move focus to the top of the new step.
  useEffect(() => {
    if (!moved.current) return;
    (step === 2 ? step2Ref : step1Ref).current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "ok") successRef.current?.focus();
  }, [status]);

  /** Shows the errors, announces them and focuses the first invalid field. */
  const report = (found: Errors) => {
    setErrors(found);
    const keys = Object.keys(found) as (keyof Values)[];
    const count = keys.length;
    setAnnounce(`${count} ${count === 1 ? "field needs" : "fields need"} attention: ${keys.map((k) => found[k]).join(" ")}`);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`#${keys[0]}`)?.focus());
  };

  const next = () => {
    const found = validate(1, values);
    if (Object.keys(found).length) return report(found);
    setErrors({});
    setAnnounce("");
    moved.current = true;
    setStep(2);
  };

  const back = () => {
    setErrors({});
    setAnnounce("");
    moved.current = true;
    setStep(1);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) return next();
    const found = validate(2, values);
    if (Object.keys(found).length) return report(found);

    setErrors({});
    setAnnounce("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const describe = (key: keyof Values) => (errors[key] ? `${key}-error` : undefined);
  const border = (key: keyof Values) => (errors[key] ? "border-red-400" : "border-ink/15");

  if (status === "ok") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-brand)] border border-ink/12 bg-white p-7 text-center text-ink shadow-sm outline-none md:p-9"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cyan">
          <svg viewBox="0 0 20 20" className="h-7 w-7" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="display mt-5 text-2xl">{copy.success.title}</h2>
        <p className="mx-auto mt-3 max-w-[40ch] leading-relaxed text-ink/70">{copy.success.body}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label="Book a call"
      className="rounded-[var(--radius-brand)] border border-ink/12 bg-white p-7 text-ink shadow-sm md:p-9"
    >

      {/* Progress */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/55">
          Step {step} of 2 <span className="text-ink/35">·</span> {copy.steps[step - 1]}
        </p>
        <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
          {[1, 2].map((n) => (
            <span key={n} className={`h-1.5 flex-1 rounded-full transition-colors ${n <= step ? "bg-royal" : "bg-ink/10"}`} />
          ))}
        </div>
      </div>

      {/* Announces validation errors to screen readers. */}
      <p className="sr-only" role="alert" aria-live="assertive">
        {announce}
      </p>

      {step === 1 ? (
        <div className="mt-7 space-y-6">
          <h2 ref={step1Ref} tabIndex={-1} className="sr-only">
            Step 1 of 2: {copy.steps[0]}
          </h2>
          <div>
            <label htmlFor="role" className={label}>
              {copy.role.label}
            </label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={(e) => set("role")(e.target.value)}
              aria-invalid={errors.role ? true : undefined}
              aria-describedby={describe("role")}
              className={`${field} ${border("role")}`}
            >
              <option value="" disabled>
                {copy.role.placeholder}
              </option>
              {roleGroups.map((group) => (
                <optgroup key={group.name} label={group.name}>
                  {group.roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value={OTHER}>{OTHER}</option>
            </select>
            <FieldError id="role-error" message={errors.role} />
          </div>

          {values.role === OTHER && (
            <div>
              <label htmlFor="roleOther" className={label}>
                {copy.role.otherLabel}
              </label>
              <input
                id="roleOther"
                name="roleOther"
                value={values.roleOther}
                onChange={(e) => set("roleOther")(e.target.value)}
                aria-invalid={errors.roleOther ? true : undefined}
                aria-describedby={describe("roleOther")}
                className={`${field} ${border("roleOther")}`}
              />
              <FieldError id="roleOther-error" message={errors.roleOther} />
            </div>
          )}

          <Choice
            name="headcount"
            legend={copy.headcount.label}
            options={copy.headcount.options}
            value={values.headcount}
            error={errors.headcount}
            onChange={set("headcount")}
          />
          <Choice
            name="timeline"
            legend={copy.timeline.label}
            options={copy.timeline.options}
            value={values.timeline}
            error={errors.timeline}
            onChange={set("timeline")}
          />

          <button
            type="submit"
            className="w-full rounded-full bg-cyan px-7 py-4 text-[0.98rem] font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-cyan focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal/30"
          >
            {copy.next} <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-5">
          <h2 ref={step2Ref} tabIndex={-1} className="display text-xl outline-none">
            {copy.steps[1]}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                ["name", copy.name, "name", "text"],
                ["email", copy.email, "email", "email"],
              ] as const
            ).map(([key, text, auto, type]) => (
              <div key={key}>
                <label htmlFor={key} className={label}>
                  {text}
                </label>
                <input
                  id={key}
                  name={key}
                  type={type}
                  autoComplete={auto}
                  value={values[key]}
                  onChange={(e) => set(key)(e.target.value)}
                  aria-invalid={errors[key] ? true : undefined}
                  aria-describedby={describe(key)}
                  aria-required="true"
                  className={`${field} ${border(key)}`}
                />
                <FieldError id={`${key}-error`} message={errors[key]} />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="company" className={label}>
              {copy.company}
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => set("company")(e.target.value)}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describe("company")}
              aria-required="true"
              className={`${field} ${border("company")}`}
            />
            <FieldError id="company-error" message={errors.company} />
          </div>
          <div>
            <label htmlFor="message" className={label}>
              {copy.message} <span className="font-normal text-ink/40">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={values.message}
              onChange={(e) => set("message")(e.target.value)}
              className={`${field} border-ink/15 resize-y`}
            />
          </div>

          {/* Honeypot, kept from the old form. Real people leave it empty. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="fax">Fax</label>
            <input id="fax" name="fax" tabIndex={-1} autoComplete="off" value={values.fax} onChange={(e) => set("fax")(e.target.value)} />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={back}
              className="rounded-full border-2 border-ink/15 px-6 py-3.5 text-[0.98rem] font-semibold text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal/30"
            >
              <span aria-hidden="true">&larr;</span> {copy.back}
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex-1 rounded-full bg-cyan px-7 py-4 text-[0.98rem] font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-cyan focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? copy.sending : copy.submit}
            </button>
          </div>
          <CtaNote tone="onLight" className="text-center" />

          {status === "error" && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
              {copy.error}
            </p>
          )}
        </div>
      )}

      <p className="mt-5 text-center text-xs leading-relaxed text-ink/45">
        We use this to prepare for the call. No newsletter, no drip sequence.
      </p>
    </form>
  );
}
