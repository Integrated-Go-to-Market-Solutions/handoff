/** Pricing comparison: the two engagement models and the table on /pricing. */
/**
 * Ordered as the business wants them sold: managed first, direct hire as the
 * door opener. Figures and structure match the current sales deck
 * (2026-09-07): three models, each carrying the same one-time placement fee
 * on top of its own ongoing cost — not a separate no-fee tier.
 */
export const models = [
  {
    tag: "Most popular",
    name: "Managed Staffing",
    forWho: "Companies building a team",
    price: "~$3,500/month",
    terms: "Supervised, managed team members",
    copy: "We recruit, employ, train, and performance manage, with extra structure and accountability. You get the outcome and one point of accountability. Ideal for higher-risk functions.",
    points: [
      "Handoff owns recruiting, employment and management",
      "Supervised, managed team members",
      "Extra structure and accountability",
    ],
    /** PLACEHOLDER copy pending client approval. */
    extrasLabel: "Also included with Managed Staffing",
    extras: [
      "Employment and payroll handled by Handoff",
      "Compliance",
      "Equipment and tools",
      "Day-to-day supervision",
      "Performance management",
      "Replacement support",
    ],
    featured: true,
  },
  {
    tag: "Ready to Go",
    name: "Recruitment & Placement",
    forWho: "Smaller teams and one-off hires",
    price: "~$1,600/month",
    terms: "Direct hire model",
    copy: "We find and vet the person, you employ them directly. Includes a 90-day guarantee. Three of our last four new clients started here.",
    points: [
      "Direct hire model",
      "Lowest ongoing cost of the two models",
      "Full ownership of the relationship",
    ],
    /** The existing card copy, split into points (no new claims). */
    extrasLabel: "How Recruitment & Placement works",
    extras: [
      "We find and vet the person",
      "You employ them directly",
      "Includes a 90-day guarantee",
      "Three of our last four new clients started here",
    ],
    featured: false,
  },
];

/**
 * Pricing section header: Tom's content doc (Pricing tab), 10/5. Anthony
 * confirmed $1,600 is the talent's monthly salary, not Handoff's fee, so
 * the line says so.
 */
export const pricingPage = {
  title: "Pricing | Handoff",
};

export const modelsIntro = {
  headline: "Two ways to work together",
  subhead: "Pick the model that fits how you want to bring on talent. Both run on the same Hands-Off Hiring System.",
  startingAt: { label: "Talent salaries start at", price: "$1,600/month" },
  addOns: "Add‑ons are available on either model.",
  cta: "Book a call",
};

/**
 * The pricing comparison (`Models detailed`), Umair's 10/5 compact table
 * with the content doc's copy (10/5): the doc's "Both models include"
 * points as shared rows, Managed Staffing's "What's included" as the
 * differences, and each model's "Fits when" line as Best for. `true` =
 * check, `false` = dash, a string = that text (`accent` marks the value
 * shown in the brand green). /v2 keeps `models` above.
 */
export const modelsCompare = {
  columns: ["Direct Hire", "Managed Staffing"],
  /** Index of the highlighted column. */
  featured: 1,
  rows: [
    {
      label: "The Hands-Off Hiring System",
      note: "Sourcing, the Vet (skills, English, AI fluency) and a shortlist of two",
      values: [true, true],
    },
    { label: "Talent in your time zone", values: [true, true] },
    {
      label: "The guarantee",
      note: "A replacement at no cost if your hire doesn't work out within 90 days",
      values: [true, true],
    },
    { label: "Who employs them", values: ["You contract them directly", { text: "Handoff, as employer of record", accent: true }] },
    { label: "Payroll", values: [false, true] },
    { label: "HR and compliance", values: [false, true] },
    { label: "Benefits", values: [false, true] },
    { label: "Equipment and IT", values: [false, true] },
    { label: "Performance management", values: [false, true] },
    { label: "Retention support", values: [false, true] },
    {
      label: "Best for",
      values: ["When you want them on your own team", "When you want us to carry the employment, compliance, and support"],
    },
  ] as { label: string; note?: string; values: (boolean | string | { text: string; accent: boolean })[] }[],
  footnote: "One-time placement fee of 25% of first-year salary applies to both.",
};

/** PLACEHOLDER copy pending client approval: what both models share. */
export const modelsShared = {
  label: "Both models include",
  items: [
    "Candidate sourcing",
    "Multi-round vetting",
    "Skills and culture assessments",
    "AI Powered People",
    "A curated shortlist",
    "The hiring guarantee",
  ],
};

/**
 * Shown once beneath the two cards, not repeated per-card: both models
 * carry the same one-time placement fee on top of their own figure above.
 */
export const modelsFootnote =
  "Both models include a one-time placement fee of 25% of the candidate's first-year salary. The final amount varies by role, seniority and scope, typically $4,500 to $6,500.";

