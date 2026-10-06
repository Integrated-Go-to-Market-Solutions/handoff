/**
 * Every word of site copy lives here so it can be reviewed and edited in one
 * place. Positioning is taken from the 8/13 messaging call (Mark's hero
 * statement), the 8/10 Karla call, and the workshopped ICP.
 *
 * Deliberately avoided: "hustler" (Jazmin, 8/6 - misreads badly in LATAM),
 * "cheap labor" (Karla, 8/10), and any hourly-rate framing.
 */

export const site = {
  name: "Handoff",
  tagline: "The team behind your team.",
  // Domain is not pointed yet. Keep links relative so the Vercel URL works.
  bookCall: "/contact",
  /**
   * The one booking link for "Book a call" (the finale). PLACEHOLDER: meant
   * to be David's Calendly, but no URL has been supplied ([CALENDLY_URL]), so
   * it points at /contact for now. Swap it here; an https link opens in a
   * new tab automatically.
   */
  bookingUrl: "/contact",
  seeTalent: "/roles",
};

export const socialLinks = [
  {
    label: "YouTube",
    platform: "youtube",
    href: "https://www.youtube.com/@yourhandoff",
  },
  {
    label: "LinkedIn",
    platform: "linkedin",
    href: "https://www.linkedin.com/company/yourhandoff/",
  },
  {
    label: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/talenthandoff/",
  },
] as const;

export const hero = {
  eyebrow: "Staffing and Recruiting",
  /**
   * Two accented phrases now, not one: "LATAM." in blue, "Here to stay." in
   * teal, so the retention claim gets the same visual weight as the talent
   * claim instead of reading as an afterthought.
   */
  headline: [
    { text: "The best of" },
    { text: "LATAM.", tone: "royal" },
    { text: "AI Powered People." },
    { text: "Here to stay.", tone: "cyan" },
  ] as { text: string; tone?: "royal" | "cyan" }[],
  /** One entry per line in the live hero. `headline` above still feeds /v2. */
  headlineLines: [
    { text: "The best of LATAM." },
    { text: "AI Powered People." },
    { text: "Here to stay.", tone: "cyan" },
  ] as { text: string; tone?: "cyan" }[],
  imageAlt: "The Handoff team",
  body: "We help the best US companies hire Latin America's top 1% talent.",
  primary: { label: "Get Started Today", href: site.bookCall },
  secondary: { label: "Talk to Our Team", href: site.bookCall },
  note: "Full-time, dedicated teammates. Not a marketplace.",
  /**
   * Rewritten per feedback that "7 of us, all hired this way" read unclear.
   * The number stays; the caption now says what it is proof of.
   */
  teamStatLabel: "of our own team, hired through this exact process",
};

/**
 * Straight from the sales deck's "Why LATAM" slide (page 7) — same three
 * reasons, same order, real bullets, not invented. The slide numbers them
 * 1/2/3 next to a hand-drawn LATAM outline; per direct instruction this
 * version drops the numbers and the outline becomes a subtle background
 * watermark instead of a literal map graphic.
 */
export const whyLatam = {
  /** Renamed 10/5 per Tom's suggestion on the call, which Anthony agreed to. */
  headline: "Why US teams work nearshore with LATAM talent",
  /** Drawn only from the card bullets below (business hours, US expectations). */
  subhead: "They work your business hours and already know how US teams run.",
  categories: [
    {
      title: "Talent quality",
      tagline: "What makes LATAM great for hiring",
      icon: "award",
      bullets: [
        "Deep pool of educated, professional talent",
        "Strong English proficiency across key markets",
        "Experience working with U.S. companies, tools, and processes",
        "High accountability and work ethic",
      ],
    },
    {
      title: "Time zone alignment",
      tagline: "Talent easy to reach",
      icon: "clock",
      bullets: [
        "Minimal time difference with the U.S.",
        "Talent works standard U.S. business hours",
        "Real-time collaboration, not overnight handoffs",
        "Faster feedback loops and fewer delays",
      ],
    },
    {
      title: "Cultural fit",
      tagline: "A world of talent close to your culture",
      icon: "users",
      bullets: [
        "Strong alignment with U.S. business culture",
        "Clear communication, proactive problem-solving",
        "Familiarity with U.S. expectations around ownership, deadlines, and quality",
      ],
    },
  ],
} as const;

/**
 * Real figures from Overview2026.pdf / the sales deck, per direct reference
 * to that exact stat-tile design (tilted photo cards, light gray background,
 * clickable through to the results proof). Photos are real team members,
 * not stand-ins for the stat itself, cropped into the organic-blob frame
 * from the "this vibe for images" reference.
 */
export const proofStats = [
  { value: "$50K+", label: "Saved per hire", photo: "jake-castro" },
  { value: "40+", label: "Clients", photo: "jazmin-esparza" },
  { value: "200+", label: "Placements", photo: "shaori-velueta" },
  { value: "96%+", label: "Client retention", photo: "catalina-saldarriaga" },
] as const;

/**
 * Homepage section 2 copy (Tom's T3 from the 10/5 call, workshopped 10/5).
 * Headline and line A: Anthony's point that the talent has worked in the
 * client's industry ("two to five years", his words on the call; confirm
 * before launch). Line B: Tom's point that Handoff doesn't put forward
 * anyone outside the field.
 */
export const industriesStrip = {
  headline: "Hire people who have already done this work in your industry.",
  body: "The people we place have spent two to five years in industries like yours, so they arrive knowing how the work runs. We don't put forward candidates from outside your field.",
};

/**
 * The thin KPI ribbon under the homepage industries. The three Tom named on
 * the 10/5 call: the two existing figures plus "top 1% of talent", which
 * Anthony confirmed in the Pulse answers.
 */
export const credibilityStats = [
  { value: "$50K+", label: "Saved per hire" },
  { value: "96%+", label: "Client retention" },
  { value: "Top 1%", label: "Of talent" },
] as const;

/**
 * Sample talent for the hero, not the Handoff team. Anthony, verbatim:
 * "instead of the team on the top, how you have it now, we would want...
 * a sampling that would focus on talent, like Miguel, AI developer... not
 * from our team." No real candidate photos exist yet, so these ship as
 * clearly-labeled placeholder cards, not stock photos standing in for real
 * people. AI and engineering roles lead, per Anthony's push to feature
 * those first.
 */
export const sampleTalent = [
  { name: "Miguel", role: "AI Developer" },
  { name: "Camila", role: "Full-Stack Engineer" },
  { name: "Sofia", role: "Operations Manager" },
  { name: "Andres", role: "Marketing Specialist" },
] as const;

/**
 * "Meet your talent" map on the homepage. PLACEHOLDER: the final role list,
 * photos and salary numbers are still pending. The names are made-up first
 * names, the cities are realistic but not real people's, and the salary
 * ranges are rough monthly USD guesses. The photos are PLACEHOLDERS too:
 * Handoff team members from /images/team (Jake Castro's is used twice, as
 * there are seven photos for eight pins), not the talent described.
 *
 * Order matters: entry N sits on pin N of the map (positions live in
 * talent-map.tsx), so swap the content in place rather than reordering.
 */
/**
 * 10/5: pin roles renamed to Anthony's department list, and each pin links to
 * its department page (/roles/[department]). "Digital Marketing Manager" has
 * no match in his list; it links to Marketing until Handoff picks a name.
 */
export const talentMap = {
  heading: { before: "Meet your", link: "talent" },
  intro: "The roles we place most, from Mexico to Patagonia. Hover or tap a pin to see who you could be working with.",
  cta: { label: "Explore all roles", href: "/roles" },
  salaryLabel: "Salary benchmark",
  profiles: [
    { name: "Valeria", city: "Guadalajara", country: "Mexico", role: "Digital Marketing Manager", department: "marketing", salary: "$2,500–$3,500/mo", photo: "/images/team/jazmin-esparza.webp" },
    { name: "Diego", city: "San José", country: "Costa Rica", role: "Full-Stack Developer", department: "software-engineering", salary: "$3,500–$5,500/mo", photo: "/images/team/jake-castro.webp" },
    { name: "Camila", city: "Medellín", country: "Colombia", role: "AP/AR Specialist", department: "finance-accounting", salary: "$1,500–$2,200/mo", photo: "/images/team/karla-patron.webp" },
    { name: "Mateo", city: "Lima", country: "Peru", role: "AI Developer / AI Engineer", department: "data-ai", salary: "$3,000–$5,000/mo", photo: "/images/team/simon-quintero.webp" },
    { name: "Larissa", city: "Recife", country: "Brazil", role: "Relocation Coordinator", department: "corporate-relocation", salary: "$1,600–$2,400/mo", photo: "/images/team/catalina-saldarriaga.webp" },
    { name: "Gabriel", city: "São Paulo", country: "Brazil", role: "Guest Services Coordinator", department: "corporate-housing-mtr", salary: "$1,200–$1,800/mo", photo: "/images/team/leidy-quintero.webp" },
    { name: "Sofía", city: "Córdoba", country: "Argentina", role: "Reservations Specialist", department: "corporate-housing-mtr", salary: "$1,800–$2,600/mo", photo: "/images/team/shaori-velueta.webp" },
    { name: "Tomás", city: "Neuquén", country: "Argentina", role: "SDR/BDR", department: "sales", salary: "$1,500–$2,500/mo", photo: "/images/team/jake-castro.webp" },
  ] as { name: string; city: string; country: string; role: string; department: string; salary: string; photo: string | null }[],
};

/** The founder's situation, in his own terms. From the workshopped ICP. */
export const problem = {
  eyebrow: "Sound familiar",
  headline: "You are the bottleneck",
  body: "You are still doing the work you should have handed off two hires ago. You tried a cheap offshore hire and got someone who needed managing. What you actually need is a person who can run something, not another task list to supervise.",
  /**
   * The same pressure as an ops leader or COO experiences it. They do not
   * think of themselves as the bottleneck, they think of themselves as
   * under-resourced, so the section has to speak both ways.
   */
  bodyDepartment:
    "And if you are running a department rather than the whole company, the version of this you know is different. The headcount is approved or it is not. The work does not wait either way, and the good people you already have are covering for a seat that has been open for two months.",
  /**
   * All four card backs say the same thing on purpose. This line sets that
   * up so it reads as the argument rather than as a mistake.
   */
  cardsLead: "Different problems. Same fix.",
  cardsActionDesktop: "Flip any of them.",
  cardsActionMobile: "Tap any of them.",
  cards: [
    {
      title: "The one who never says no",
      copy: "You absorb it. You work later. The business grows on your evenings and it is not sustainable, but handing it off has never felt safe.",
    },
    {
      title: "The one turning down growth",
      copy: "You are saying no to work you could take, because there is nobody to hand it to and hiring for it in the US does not pencil out.",
    },
    {
      title: "The one whose ops person just quit",
      copy: "Two weeks' notice, and the person who held the operation together is walking out with everything in their head.",
    },
    {
      title: "The one hiring abroad for the first time",
      copy: "You know the talent is out there. You do not know how to tell a great candidate from a good interview, or what happens after you say yes. So the search keeps getting pushed to next quarter.",
    },
  ],
};

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
 * Service pages (/services/[slug]): Tom's content doc (Direct Hire and
 * Managed Staffing tabs), 10/5. One edit to the doc: Direct Hire said
 * "contract them directly as an international contractor"; it reads
 * "contract them directly" here, per the 10/5 call's rule against calling
 * the talent contractors. The pricing table makes the same choice.
 */
export const services = [
  {
    slug: "direct-hire",
    name: "Direct Hire",
    subhead: "Contract the talent directly and manage the day to day yourself.",
    howItWorks:
      "We run the search through the Hands-Off Hiring System and hand you a shortlist for the role. Because the skills, English, and AI fluency are vetted before you meet anyone, you interview for fit. You pick the professional who matches how your team operates, so you bring on someone who fits your culture, beyond the role on paper. From there, you contract them directly and pay them each month. They work on your team, under your direction, and because this is a direct contract rather than employment, there's no payroll, benefits, or tax withholding to administer on your side.",
    detailHeadline: "What you handle",
    detailBody:
      "You own the working relationship: you set the work, manage the day to day, and pay the talent monthly. We stay available to help you fill another seat or start a replacement search.",
    detailList: [] as string[],
    bestFit:
      "Choose Direct Hire when you want the talent on your own team and the capacity to manage them directly. If you would rather we carry the employment and support, Managed Staffing does that.",
    other: { label: "See Managed Staffing", slug: "managed-staffing" },
  },
  {
    slug: "managed-staffing",
    name: "Managed Staffing",
    subhead: "We employ and support the talent as the employer of record. You direct the work.",
    howItWorks:
      "The role goes through the Hands-Off Hiring System first, and you receive a shortlist of professionals screened against it. With skills, English, and AI fluency already settled, you are choosing for fit: the professional who works the way your team works and suits the culture you're building. From there, we employ them as the legal employer of record and take on the employment side, from payroll to benefits, while you direct the work day to day. The talent works remotely, embedded in your team.",
    detailHeadline: "What's included",
    detailBody: "",
    detailList: [
      "Payroll",
      "HR and compliance",
      "Performance management",
      "Retention support",
      "Benefits",
      "Equipment and IT",
    ],
    bestFit:
      "Managed Staffing is the fit when you want us to hold the employment, compliance, and support, and keep the talent with you for the long term. Prefer to contract the talent yourself? Direct Hire covers that.",
    other: { label: "See Direct Hire", slug: "direct-hire" },
  },
];

/**
 * Pricing section header: Tom's content doc (Pricing tab), 10/5. Anthony
 * confirmed $1,600 is the talent's monthly salary, not Handoff's fee, so
 * the line says so.
 */
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
      note: "Sourcing, the Vet, and a shortlist of two for each role",
      values: [true, true],
    },
    { label: "Talent screened for skills, English, and AI fluency", values: [true, true] },
    { label: "Work in your time zone, with client-ready English", values: [true, true] },
    {
      label: "The guarantee",
      note: "$1,000 off your next search if none of the first four fits",
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

/**
 * Real Handoff team members, not stock and not placed talent. This is the
 * point Mark made on 8/13: "we don't talk about overseas talent, we are the
 * overseas talent."
 */
export const team = [
  { slug: "jazmin-esparza", name: "Jazmin Esparza", role: "Chief of Staff" },
  { slug: "jake-castro", name: "Jake Castro", role: "VP of Automation" },
  { slug: "karla-patron", name: "Karla Patrón", role: "Marketing Specialist" },
  { slug: "catalina-saldarriaga", name: "Catalina Saldarriaga", role: "Operations Manager" },
  { slug: "simon-quintero", name: "Simon Quintero", role: "Executive Assistant" },
  { slug: "leidy-quintero", name: "Leidy Quintero", role: "Project Manager" },
  { slug: "shaori-velueta", name: "Shaori Velueta", role: "Digital Marketer" },
];

/**
 * About page copy (10/5). Built from Tom's content doc (headline, lead,
 * founder, close) and Anthony's words on the 10/5 call (opportunity gap,
 * win-win, Humanize/Hustle/Connect). The value one-liners are from the live
 * talenthandoff.com/about, with "We make $hit happen" softened: no
 * profanity on the site (Tom). "Paid above market" is Anthony's phrase from
 * the call and still needs his OK to publish.
 */
export const aboutPage = {
  headline: "Who we are",
  lead: "Handoff places Latin America's top talent inside US companies, and stays with you after they're placed. The work is to match the right professional to your team and your culture, and to support them so they last.",
  gap: {
    headline: "Talent is everywhere. Opportunity isn't.",
    body: "Skilled professionals live everywhere. The chance to work with great companies doesn't reach all of them. Handoff closes that gap.",
  },
  winWin: {
    headline: "A win on both sides",
    sides: [
      {
        title: "For the companies we work with",
        body: "Many of our clients don't have the budget for every seat they need, so they get stuck and can't scale. With Handoff, they bring on the talent to grow, and to compete with bigger companies in their industry that have bigger budgets.",
      },
      {
        title: "For the professionals we place",
        body: "Our talent is paid above market, works with some of the best companies in the world, and keeps growing with upskilling from us.",
      },
    ],
    closer:
      "Hearing clients talk about how far they've scaled, and hearing the talent talk about what the role opened up for them, is why we do this.",
  },
  founder: {
    headline: "The founder",
    body: "Our founder spent over a decade hiring in this industry before starting Handoff. That's why the recruiting runs deepest in corporate housing and relocation, and why the Hands-Off Hiring System is built the way it is, from years of doing the hiring firsthand.",
  },
  values: {
    headline: "What we live by",
    items: [
      { name: "Humanize", line: "People come first in everything we do." },
      { name: "Hustle", line: "We make it happen." },
      { name: "Connect", line: "Relationships are the heart of our business." },
    ],
  },
  teamHeadline: "Our team",
  close: "We are the team behind your team. We do the sourcing, screening, and support, so you can bring on talent with confidence and keep your focus on the work.",
  cta: "Book a call",
};

export const proof = {
  eyebrow: "The proof",
  headline: "Everyone talks about hiring top talent.",
  headlineAccent: "Here's what happened when we did it.",
  body: "These are not stock photos and they are not client avatars. This is the Handoff team. Every one of them was hired through the same process we run for you, which is the only reason we are willing to put our own faces on it.",
};

/**
 * Only the companies the client has approved for the site, in the client's
 * order. GFDA / Good Feature Design Alliance must not be shown. Entries
 * without a logo file (`hasImage: false`) render as a text wordmark until
 * the real file lands in /public/images/logos.
 */
export const logos = [
  { slug: "united-corporate-housing", name: "United Corporate Housing", hasImage: true },
  { slug: "oasis", name: "Oasis", hasImage: false },
  { slug: "altovita", name: "AltoVita", hasImage: false },
  { slug: "do-good-cfo", name: "Do Good CFO", hasImage: false },
  { slug: "igtms", name: "IGTMS", hasImage: false },
  { slug: "snap-supplements", name: "Snap Supplements", hasImage: false },
  { slug: "earth-side-farms", name: "Earth Side Farms", hasImage: false },
  { slug: "charcharms", name: "Charcharms", hasImage: false },
  { slug: "dwellworks", name: "Dwellworks", hasImage: true },
  { slug: "doorspot", name: "DoorSpot", hasImage: false },
  { slug: "fragomen", name: "Fragomen WorkRight", hasImage: true },
  { slug: "pivt", name: "PIVT", hasImage: false },
] as const;

/**
 * The Handoff Hiring System: four steps, CEO-approved copy, verbatim.
 * Read by the homepage (compact) and /how-it-works (full).
 */
export const process = {
  /** The live section title (homepage and /how-it-works). No tagline under it. */
  titleParts: { before: "The", swipe: "Hands-off", after: "Hiring System" },
  /** eyebrow, headline, body: still used by /v2 (process.tsx) only. */
  eyebrow: "Handoff Hiring System",
  headline: "Four steps. One person who sticks.",
  /** Same headline, split so the last word can carry the cyan swipe. */
  headlineParts: { before: "Four steps. One person who", swipe: "sticks", after: "." },
  /** Intro under the title (homepage and /how-it-works): Tom's content doc, 10/5. */
  body: "A four-step process that keeps the sourcing and screening with us. You make one decision at the end: which finalist to place.",
  lede: "Nobody skips a step, not even when you needed someone yesterday. About 21 days start to finish, and you'll know exactly where things stand the whole way.",
  /**
   * Step copy: Tom's content doc (How It Works tab), 10/5. The Vet's
   * checklist and closing line show on /how-it-works; the compact homepage
   * card shows only `body`.
   */
  steps: [
    {
      n: "01",
      title: "Discovery",
      body: "We learn the role, the team it joins, and what a strong fit looks like to you. That profile sets the bar for the search.",
    },
    {
      n: "02",
      title: "The Vet",
      body: "We start with roughly 200 candidates and screen down.",
      bulletsLead: "Each one runs through:",
      bullets: [
        "Video submissions",
        "English proficiency",
        "A skills assessment for the role",
        "AI literacy",
        "Intelligence and motivation",
        "Recruiter interviews",
      ],
      after: "Only the candidates who clear the full screen move forward.",
    },
    {
      n: "03",
      title: "The Shortlist",
      body: "You see two. We bring you two candidates matched to the role, with their video, assessment results, and our notes. You interview both and choose.",
    },
    {
      n: "04",
      title: "The Guarantee",
      body: "If none of the first four candidates fits, your next search is $1,000 off. We run the screening, so a miss is on us to fix.",
    },
  ] as { n: string; title: string; body: string; bulletsLead?: string; bullets?: string[]; after?: string }[],
  closer: {
    line: "Every hire after your first gets easier. We learn your company, your culture, your bar for 'great.' By hire five, you might not meet the candidate until their first day.",
    cta: "Start at step one",
  },  /** The /how-it-works close: Tom's content doc, 10/5. The homepage keeps `closer`. */
  pageCloser: {
    headline: "Start with the role",
    line: "Tell us what you need to fill, and we'll open the search.",
    cta: "Book a call",
  },

  /** Homepage teaser copy: the compact road links through to the full page. */
  teaserCta: "See every step",
  /** Where "See every step" lands: the start of the /how-it-works timeline. */
  teaserHref: "/how-it-works#timeline",
  /**
   * The vertical timeline on /how-it-works. One entry per step, in order.
   * PLACEHOLDER videos: none of these show the actual step; they're existing
   * brand clips (the promo and the three Instagram reels) until real step
   * videos exist. Swap `src` and `poster` here. `vertical` clips show as a
   * centred head-and-shoulders portrait over a blurred copy of the frame;
   * `focus` is the object-position that keeps the person in view.
   */
  timeline: {
    labels: ["Step one", "Step two", "Step three", "Step four"],
    cta: { label: "Hire Today", step: 0 },
    videos: [
      { src: "/videos/handoff-promo.mp4", poster: "/videos/handoff-promo.jpg", focus: "50% 50%", vertical: false },
      { src: "/videos/remote-culture.mp4", poster: "/videos/remote-culture.jpg", focus: "50% 30%", vertical: true },
      { src: "/videos/day-with-handoff.mp4", poster: "/videos/day-with-handoff.jpg", focus: "50% 40%", vertical: true },
      { src: "/videos/handoff-values.mp4", poster: "/videos/handoff-values.jpg", focus: "50% 30%", vertical: true },
    ],
  },
};

/**
 * The previous six-step version, kept only for the /v2 alternate homepage,
 * whose road graphic is drawn around exactly six markers.
 */
export const legacyProcess = {
  headline: "Six steps. One person who sticks.",
  body: "Every hire goes through the same six steps, no shortcuts. That is how the right person lands in the right seat and stays there.",
  steps: [
    {
      n: "01",
      day: "Day 1",
      title: "We scope the role",
      subtitle: "Align before we search",
      bullets: ["Define the work and the outcome", "Pick the model that fits", "An honest no if we're not the right fit"],
    },
    {
      n: "02",
      day: "Days 2 to 5",
      title: "We hunt, not post",
      subtitle: "Human-led, system-supported",
      bullets: ["We go after people who aren't looking", "Around 300 candidates reviewed per role", "Nothing goes on a job board"],
    },
    {
      n: "03",
      day: "Days 5 to 10",
      title: "Skills and English",
      subtitle: "Assessed, not assumed",
      bullets: ["Video skills assessment", "Built to mirror the actual job", "A real conversation, not a canned test"],
    },
    {
      n: "04",
      day: "Days 10 to 14",
      title: "AI fluency and judgment",
      subtitle: "Beyond the technical checklist",
      bullets: ["How they actually use AI in the work", "What they do when the answer isn't obvious", "Operators who run things, not just execute"],
    },
    {
      n: "05",
      day: "Days 14 to 18",
      title: "You meet the shortlist",
      subtitle: "Only the best, not a pile of resumes",
      bullets: ["Two finalists, both genuinely hireable", "Notes, rates and availability up front", "The goal is that picking one is hard"],
    },
    {
      n: "06",
      day: "Day 21 and every day after",
      title: "We employ, onboard, and stay on",
      subtitle: "This is the part nobody else does",
      bullets: ["Payroll and benefits", "Equipment", "Compliance", "Weekly check ins", "Ongoing coaching", "90 day guarantee"],
    },
  ],
};

/**
 * Anthony, on the call: footage of meeting a client at a conference,
 * jumping on the first call, interviewing the talent, showing the whole
 * journey. No footage exists yet, so this ships as a placeholder slot
 * rather than invented claims.
 */
export const hiringHighwayVideo = {
  label: "Watch the Handoff Hiring System",
  caption: "The real journey, filmed start to finish. Coming soon.",
};

/**
 * "A day in the life": separate from meet-the-team. Anthony, verbatim:
 * "what's a day in the life of a chief of staff at Handoff... short videos
 * that just literally show a calendar, and then it's like showing them and
 * they talk real quick and it just rolls through." No footage exists yet.
 */
export const dayInLife = {
  eyebrow: "A day in the life",
  headline: "Meet the role, not just the resume.",
  body: "Real people doing the actual job, filmed where they work. This is what a day looks like for the roles you would actually hire.",
  slots: [
    { id: "dil-1", role: "Chief of Staff" },
    { id: "dil-2", role: "Head of Marketing" },
    { id: "dil-3", role: "UI/UX Designer" },
    { id: "dil-4", role: "Sales Development Rep" },
  ],
};

/**
 * The hero says AI TRAINED and nothing else on the site backed it up. This
 * block does, immediately after the process, where the vetting claim lands.
 */
export const aiTrained = {
  eyebrow: "AI Powered People",
  headline: "What “AI Powered People” actually means",
  body: "Every person we place already works with AI tools daily. The judgement stays human. The busywork does not.",
  topicsLabel: "Training includes",
  topics: ["AI fundamentals", "Mastering prompts", "Ongoing new courses"],
  coursesLabel: "Courses like",
  /** Muted line under the featured course (the first entry of `courses`). */
  coursesNote: "Rotating course titles",
  /**
   * PLACEHOLDER course names until the real catalogue is confirmed. Only
   * the first shows (static) since the 10/5 redesign; the rest are kept
   * for if the title should rotate again.
   */
  courses: [
    "AI Fundamentals: How AI Works",
    "Mastering Prompts",
    "AI for Everyday Workflows",
    "Automating Tasks with AI Tools",
    "Responsible AI Use",
  ],
  toolsLabel: "Tools our talent trains on",
  /**
   * Icons are LobeHub Icons (MIT) in /public/images/ai-tools: the colour
   * versions where they exist, and white for OpenAI and Grok, which are
   * monochrome marks.
   */
  tools: [
    { name: "Claude", file: "claude-color" },
    { name: "ChatGPT", file: "openai" },
    { name: "Gemini", file: "gemini-color" },
    { name: "Perplexity", file: "perplexity-color" },
    { name: "Grok", file: "grok" },
  ],
  badgeAlt: "Handoff AI Excellence badge, powered by Coursera",
  /** Shown next to the badge, on two lines. */
  certLines: ["AI Excellence certified", "powered by Coursera"],
};

export const faqs = [
  {
    q: "How is this different from Upwork or a VA agency?",
    a: "Marketplaces sell you hours from someone juggling several clients. We place one dedicated, full-time person, employed on our own entity, recruited for your specific role. We are not a virtual assistant marketplace and we are not a staffing agency that disappears after the invoice clears.",
  },
  {
    q: "What does it cost?",
    // 10/5: Anthony confirmed $1,600 is the talent's monthly salary, not
    // Handoff's fee. The per-model monthly figures ($2,900 EOR, $3,500
    // Managed Staffing) came out until Handoff confirms what they include.
    a: "Talent salaries start at $1,600 a month. Handoff's fees depend on the model you choose, Direct Hire or Managed Staffing, and both carry a one-time placement fee of 25% of first-year salary, typically $4,500 to $6,500. We quote the exact number on the first call once we know the role.",
  },
  {
    q: "We are not ready to hire someone full time.",
    a: "Then we are honestly not your fit yet, and we will say so rather than sell you something that will not work. Handoff exists for companies committing to a real hire who can own an area of the business.",
  },
  {
    q: "What if the person does not work out?",
    // 10/5: the guarantee now matches Tom's content doc (How It Works);
    // the earlier "90-day guarantee" line came out.
    a: "If none of the first four candidates fits, your next search is $1,000 off. Under Managed Staffing we own performance management, so a problem is ours to fix, not another hiring cycle for you to run.",
  },
  {
    q: "Why Latin America?",
    a: "Same time zone as your team, genuinely client-ready English, and a professional culture that fits how US companies actually work. Our people join your standups, talk to your customers, and stay.",
  },
  {
    q: "Will they really be part of my team?",
    a: "That is the entire job. Placing someone is the easy half. We build the environment around them, which is why our people stay and why you stop paying to re-hire the same role.",
  },
];

/** Scrolling role ticker. Same roles as /talent, flattened. */
export const roleTicker = [
  "Chief of Staff",
  "Operations Manager",
  "Executive Assistant",
  "Reservations Manager",
  "Marketing Specialist",
  "Project Manager",
  "Bookkeeper",
  "Media Buyer",
  "Quality Assurance",
  "Account Manager",
  "Marketplace Manager",
  "Client Services Lead",
];

/**
 * Day-in-the-life video band. Mark, 8/13: "we don't talk about overseas
 * talent. We are the overseas talent. And that's the difference." Clips are
 * Handoff's own Instagram reels, served from /public/videos.
 */
export const vibes = {
  headline: "We are the",
  headlineAccent: "overseas talent",
  headlineAfter: ".",
  body: "Competitors film their founders describing how good the talent is. You never actually see the talent. This is ours, in their own words, shot where they work.",
  clips: [
    {
      slug: "day-with-handoff",
      name: "A day with Handoff",
      caption: "Our Colombia office, from the first laptop open to city lights.",
    },
    {
      slug: "remote-culture",
      name: "Our remote culture",
      caption: "Confidence and accountability, no matter the distance.",
    },
    {
      slug: "handoff-values",
      name: "Handoff values",
      caption: "Our values are simple. This is how we lead.",
    },
  ],
};

/**
 * "Alma" is the name of Handoff's managed-services platform. Anthony, 7/23:
 * "Alma, which is soul in Spanish." Tony, 8/6, on why competitor sites fail:
 * they are "missing a little bit of soul." Same word from both directions,
 * so the site says it out loud.
 */
export const soul = {
  headline: "Everyone else sends you",
  headlineAccent: "a talent pool.",
  body: "Our own client manager applied to our biggest competitor before joining us. This is what that felt like from the other side.",
  quote:
    "I was just a number for them. They knew that I existed, but I was just part of the talent pool.",
  attribution: "Ever Jaimes",
  // Without the second clause this reads as a current employee describing
  // Handoff. Ever is describing the competitor they applied to before.
  attributionRole:
    "Client Manager at Handoff, on the agency they applied to before.",
  closer:
    "We named our platform Alma. It means soul. A person who is treated like a teammate stays. A person who is treated like a line item leaves.",
  /** Same statement, split so "Alma" can carry the cyan accent. */
  closerParts: {
    before: "We named our platform",
    accent: "Alma.",
    after: " It means soul.",
    /** Runs smaller, in Gotham, under the display line. One sentence per line. */
    sub: ["A person who is treated like a teammate stays.", "A person who is treated like a line item leaves."],
  },
  /**
   * The live Alma treatment (homepage and /about): a dictionary entry over
   * the team footage. Copy verbatim from the brief. `closerParts` above is
   * still used by /v2.
   */
  dictionary: {
    intro: "We named our platform Alma.",
    headword: "alma",
    pronunciation: "[al·ma]",
    partOfSpeech: "noun",
    definition: "a person we treat like a teammate. Stays.",
  },
  culture: {
    stat: "Several times a year",
    label:
      "the whole team flies to Medellín. Part working session, part the reason people do not leave.",
  },
};

export const cta = {
  headline: "Stop being the bottleneck.",
  headlineParts: { before: "Stop being the", accent: "bottleneck." },
  /** Closing line of the animated finale. PLACEHOLDER copy. */
  closing: "Let Handoff take it from here.",
  /** Work items that fall down the sides of the finale. PLACEHOLDER copy. */
  jam: ["Invoices", "Scheduling", "Follow-ups", "Reporting", "Hiring", "Onboarding", "Payroll", "Inbox"],
  /** The finale's one button. Links to `site.bookingUrl`. */
  book: "Book a call",
  body: "Bring the role you cannot get off your plate. One call is usually enough to scope it, pick the model and give you a real timeline.",
  primary: { label: "Get Started Today", href: site.bookCall },
  secondary: { label: "Talk to Our Team", href: site.bookCall },
};

/**
 * Role families we actually fill. Sourced from the 8/7 David Rojas call
 * (highest volume is corporate-housing ops; e-commerce and marketing are the
 * newer push) and the role cards in the brand templates.
 */
export const roleGroups = [
  {
    name: "Operations",
    blurb:
      "The highest-volume roles we fill, and the ones that came out of Anthony's own background in corporate housing.",
    roles: [
      "Operations Manager",
      "Reservations Manager",
      "Quality Assurance Specialist",
      "Project Manager",
    ],
  },
  {
    name: "Leadership & Admin",
    blurb:
      "The hires that take work off a founder's plate rather than adding someone else to manage.",
    roles: [
      "Chief of Staff",
      "Executive Assistant",
      "Bookkeeper",
      "Client Services Lead",
    ],
  },
  {
    name: "Marketing & E-commerce",
    blurb:
      "Where we have grown most recently, supporting brands that need execution as well as strategy.",
    roles: [
      "Marketing Specialist",
      "Marketplace Manager",
      "Media Buyer",
      "Social / TikTok Manager",
    ],
  },
  {
    name: "Revenue",
    blurb:
      "Client-facing roles where English fluency and judgement matter as much as process.",
    roles: [
      "Sales Development Rep",
      "Account Manager",
      "Customer Success Manager",
      "UI/UX Designer",
    ],
  },
];

/**
 * Department pages (/roles/[slug]). Anthony's list from the 10/5 Pulse
 * answers, verbatim: "Department Nav (industry-agnostic, primary
 * structure)", modeled on hirewithnear.com/hire/marketing. The last two
 * sat below a divider in his list and stay last here.
 *
 * Per the 10/5 call: each page leads with that department's role video,
 * then the full role list; a single role links to booking a call, not to
 * its own page. `video` stays empty until Handoff's role footage is in the
 * repo, and the page renders no video slot without one (empty "coming
 * soon" placeholders were cut from the site on 9/8).
 */
export type Department = {
  slug: string;
  name: string;
  roles: readonly string[];
  video?: { src: string; poster: string };
};

export const departments: readonly Department[] = [
  {
    slug: "data-ai",
    name: "Data & AI",
    roles: [
      "AI Developer / AI Engineer",
      "Machine Learning Engineer",
      "Data Scientist",
      "Data Engineer",
      "Data Analyst",
      "Database Developer/Administrator",
      "BI Analyst",
      "Automation/Prompt Engineer",
    ],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    roles: [
      "Full-Stack Developer",
      "Front-End Developer",
      "Back-End Developer",
      "Mobile Developer (iOS/Android)",
      "DevOps Engineer",
      "QA Engineer",
      "Web Developer (Shopify/Webflow/WordPress)",
      "Software Architect (senior/lead)",
    ],
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    roles: [
      "Customer Support Representative",
      "Customer Success Manager",
      "Technical Support Specialist",
      "Help Desk/IT Support Specialist",
      "Chat/Email Support Specialist",
      "Order & Returns Support Specialist",
    ],
  },
  {
    slug: "design",
    name: "Design",
    roles: [
      "UI/UX Designer",
      "Product Designer",
      "Graphic Designer",
      "Web Designer",
      "Brand Designer",
      "Motion Designer/Video Editor",
    ],
  },
  {
    slug: "finance-accounting",
    name: "Finance & Accounting",
    roles: [
      "Bookkeeper",
      "Staff Accountant",
      "AP/AR Specialist",
      "Payroll Specialist",
      "Financial Analyst",
      "Controller (senior)",
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    roles: [
      "Marketing Coordinator",
      "Content Writer/Strategist",
      "SEO Specialist",
      "Social Media Manager",
      "Paid Media/PPC Specialist",
      "Email/Lifecycle Marketing Specialist",
      "Marketing Ops/Automation Specialist",
    ],
  },
  {
    slug: "sales",
    name: "Sales",
    roles: [
      "SDR/BDR",
      "Account Executive",
      "Sales Operations Specialist",
      "CRM Administrator",
      "Lead Generation Specialist",
    ],
  },
  {
    slug: "admin-operations",
    name: "VAs, Admin & Operations",
    roles: [
      "Executive Assistant",
      "Administrative Assistant",
      "Operations Coordinator",
      "Operations Manager",
      "Project Manager",
      "General Virtual Assistant",
    ],
  },
  {
    slug: "corporate-housing-mtr",
    name: "Corporate Housing & MTR",
    roles: [
      "Reservations Specialist",
      "Guest Services Coordinator",
      "Leasing Coordinator",
      "Property/Portfolio Coordinator",
      "Turnover Coordinator",
      "Revenue/Pricing Analyst",
    ],
  },
  {
    slug: "corporate-relocation",
    name: "Corporate Relocation",
    roles: [
      "Relocation Coordinator",
      "Destination Services Coordinator",
      "Relocation Counselor",
      "Global Mobility Coordinator",
      "Expense & Reimbursement Coordinator",
    ],
  },
];

/** Copy for the roles hub and department pages: Tom's content doc, Roles tab. */
export const rolesPage = {
  headline: "Roles we place",
  subhead:
    "We fill roles across departments and seniority, from specialists to department heads. These are the ones we place most.",
  closing:
    "This is a sample of the roles we fill most, not the limit. If the one you need is not here, tell us.",
  cta: "Book a call",
};

export const talentPage = {
  eyebrow: "Who you could be hiring",
  headline: "Here's what the top 1%",
  headlineAccent: "actually looks like.",
  body: "Every person below works at Handoff and was hired through the same process we run for our clients. We are not showing you a stock library or a bench of avatars. We are showing you our own team, because that is the standard we are selling.",
  rolesHeadline: "Roles we fill",
  rolesBody:
    "If the role you need is not on this list, it is still worth a call. The list reflects where our recruiting is deepest, not the limit of what we do.",
};

/**
 * /careers: Tom's content doc (Careers tab), 10/5. Talent-facing. Pay
 * language stays general until Anthony confirms what can be stated (doc
 * note). The reels are the talent-culture clips the doc names ("a day with
 * Handoff" and remote culture), already in /public/videos.
 * The apply button goes to Handoff's existing application page on the
 * live site (Tom, 10/5).
 */
export const careersPage = {
  eyebrow: "Careers",
  headline: "Build your career with a team that has your back.",
  subhead: "Handoff places Latin American professionals inside top US companies, and stays with you after you are hired.",
  body: "You are not a profile in a database here. We learn what you do well, match you to a company where it fits, and stay in your corner once you are placed. If one role ends, we work to find you the next one.",
  cta: { label: "Apply to join our talent pool", href: "https://talenthandoff.com/join-us" },
  whyHeadline: "Why Handoff",
  why: [
    {
      lead: "Work with the best US companies that take you seriously.",
      rest: "We are selective about where we place you, and about who we bring on alongside you.",
    },
    {
      lead: "Get paid for the work you do,",
      rest: "in roles that treat you as part of the team instead of a task to offload.",
    },
    {
      lead: "Grow.",
      rest: "We screen for how well you work with AI tools and we help you get sharper at it, because it is how our talent moves faster on the same work.",
    },
    {
      lead: "Stay.",
      rest: "Most of our placements are built to last. If a role ends, finding your next one is our job, not yours.",
    },
  ],
  lookForHeadline: "Who we look for",
  lookFor:
    "Strong professional English and the skill to handle a real conversation, not a script. Professionals who own their work and embed with the client, work across US hours, and already use AI tools in their day. If you have carried real responsibility and want a company that will too, apply.",
  stepsHeadline: "How it works",
  steps: [
    { title: "Apply.", body: "Tell us what you do and what you want to work on." },
    {
      title: "Meet us.",
      body: "A video assessment and interviews with our team. We screen for skills, English, judgment, and how you work with AI tools.",
    },
    { title: "Match.", body: "When a role fits, we introduce you to the company and set up the interview." },
    {
      title: "Get placed, and stay supported.",
      body: "You join the company's team, and Handoff stays in your corner.",
    },
  ],
  reels: [
    { src: "/videos/day-with-handoff.mp4", poster: "/videos/day-with-handoff.jpg", name: "A day with Handoff", caption: "Life on the team" },
    { src: "/videos/remote-culture.mp4", poster: "/videos/remote-culture.jpg", name: "Remote culture", caption: "How we work together" },
  ],
};

export const contactPage = {
  eyebrow: "Book a call",
  headline: "Tell us the role you",
  headlineAccent: "cannot get off your plate.",
  body: "One call is usually enough to scope the role, pick the right model and give you a realistic timeline. If we are not the right fit, we will tell you on that call rather than sell you something that will not work.",
  expect: [
    "A working session, not a pitch deck",
    "A straight answer on which model fits and what it costs",
    "A realistic timeline based on how defined the role already is",
    "An honest no if we are not your fit",
  ],
  /**
   * The two-step form. Step 1's role list comes from `roleGroups` (the Roles
   * page), plus "Other". PLACEHOLDER: the labels, options and messages are new
   * copy from the brief, pending approval.
   */
  form: {
    steps: ["The role", "Your details"],
    role: { label: "What role are you hiring for?", placeholder: "Choose a role", other: "Other", otherLabel: "Which role?" },
    headcount: { label: "How many people?", options: ["1", "2–3", "4+"] },
    timeline: { label: "When do you need them?", options: ["ASAP", "1–3 months", "Just exploring"] },
    name: "Your name",
    email: "Work email",
    company: "Company",
    message: "Anything else we should know?",
    next: "Next",
    back: "Back",
    submit: "Submit",
    sending: "Sending…",
    success: {
      title: "Thanks, we've got it.",
      body: "We'll be in touch within one business day to set up the call.",
    },
    error: "Sorry, that didn't go through. Please try again, or email hello@handoff.com and we'll pick it up there.",
  },
  /** Used by the single-step form before Change 12. Kept for reference. */
  roleOptions: [
    "Operations",
    "Leadership & Admin",
    "Marketing & E-commerce",
    "Revenue / Sales",
    "Something else",
  ],
  modelOptions: [
    "Not sure yet, help me pick",
    "Managed Staffing",
    "Employer of Record",
    "Direct-Hire Recruiting",
  ],
};

/**
 * Rebuilt 2026-09-07 around the actual ICP doc (Handoff_ICP.pdf) and
 * Anthony's own list on the call: "hospitality, startups, agencies,
 * e-commerce... and there might just be like corporate relocation."
 * These five are also the homepage ICP grid, not just a dropdown.
 *
 * Copy is Tom's content doc (Industry Pages tabs), 10/5. Each role names
 * the department page it links to; a role with no clear department in
 * Anthony's list (QA Specialist, Account Manager) is left unlinked.
 * proofLogos are only the names the doc marks as cleared; caseStudy points
 * at an existing /results write-up.
 *
 * 10/5: "Hospitality" renamed "Corporate housing" (slug corporate-housing;
 * the old URL redirects in next.config.ts) and the order set to Tom's
 * content doc: housing, relocation, startups, agencies, e-commerce.
 */
/** The /industries overview page: Tom's content doc, Industries Menu tab. */
export const industriesPage = {
  eyebrow: "Industries we serve",
  headline: "Hire talent that already knows your industry.",
  body: "We place talent across a number of industries, and these are the ones where we've done the most placements and know the work. Find yours below, or get in touch if it's not here.",
  otherHeadline: "We place across other industries too",
  otherBody:
    "If you don't see your industry here, we are still the right fit. We have placements in many other industries. Tell us the position, and we'll match you with the right one.",
  cta: "Book a call",
};

export const industries = [
  {
    slug: "corporate-housing",
    navLabel: "Corporate Housing",
    icon: "home",
    name: "Corporate Housing",
    descriptor: "Keep the desk moving through peak season, from reservations to QA.",
    subhead:
      "Staff corporate housing, mid-term, and short-term rentals, from reservations to turnovers.",
    problemHeadline: "Hire ahead of your busy season",
    problemBody:
      "Occupancy climbs, the reservations inbox fills, and someone on your team is covering three jobs at once. Hiring for it in the US does not pencil out at these margins, and the last remote assistant you tried needed a script for routine bookings and messages.",
    triggers: [
      "Peak season arrives and your reservations team is underwater.",
      "Your operations manager gives notice and takes the vendor relationships with them.",
      "You are turning down units because your team cannot keep up with the coordination.",
      "You tried a VA for guest and resident messages and got someone who could not make a judgment call.",
    ],
    rolesHeadline: "Here are the roles we fill most across corporate housing, mid‑term, and short‑term rentals",
    roles: [
      { name: "Reservations Manager", department: "corporate-housing-mtr" },
      { name: "Operations Manager", department: "admin-operations" },
      { name: "Quality Assurance Specialist" },
      { name: "Guest and Resident Coordinator", department: "corporate-housing-mtr" },
      { name: "Bookkeeper", department: "finance-accounting" },
    ],
    rolesCloser:
      "Our founder spent over a decade hiring in this industry. It is where our recruiting is deepest and where we are surest of the fit.",
    proofLogos: ["oasis", "united-corporate-housing", "dwellworks"],
    caseStudy: null,
  },
  {
    slug: "corporate-relocation",
    navLabel: "Corporate Relocation",
    tileLabel: "Relocation",
    icon: "pin",
    name: "Corporate Relocation",
    descriptor: "Match your contract load with coordinators in your clients' time zone.",
    subhead:
      "Scale relocation with coordinators who work in your clients' time zone.",
    problemHeadline: "New contracts arrive faster than you can staff them",
    problemBody:
      "A client wins a contract and suddenly you are coordinating twice the assignments with the same team. Adding a US coordinator takes three months and costs more than the account can carry. The work lands on people who are already at capacity, and clients notice before you do.",
    triggers: [
      "Assignment volume spikes and coordination falls behind.",
      "Your client services lead leaves in the middle of assignment season.",
      "You are quoting work you are not sure you can staff.",
      "You tried cheaper offshore support and the quality did not hold up.",
    ],
    rolesHeadline: "Here are the roles we fill most in relocation",
    roles: [
      { name: "Operations Coordinator", department: "admin-operations" },
      { name: "Account Manager" },
      { name: "Client Services Lead", department: "customer-support" },
      { name: "Quality Assurance Specialist" },
      { name: "Bookkeeper", department: "finance-accounting" },
    ],
    rolesCloser:
      "Talent you choose yourself, in your clients' time zone, with client-ready English and the AI skills to move faster on the same work. They know a delayed move is a family waiting in a hotel.",
    proofLogos: [],
    caseStudy: "global-relocation",
  },
  {
    slug: "startups",
    navLabel: "Startups",
    icon: "trend",
    name: "Startups",
    descriptor: "Cover the role with talent that already works with AI.",
    subhead:
      "Get startup roles off your plate, owned by talent that already works with AI.",
    problemHeadline: "Still doing every job yourself?",
    problemBody:
      "The company is growing, and now there is more work than there are people to do it. You are still running support, ops, and the books yourself at night.",
    triggers: [
      "You are growing faster than you can hire, and you are covering the gap yourself.",
      "A US hire for this role costs more runway than you can give it.",
      "This is your first 3rd party hire, and you are not sure how to get it right.",
      "You tried a freelancer and spent more time managing them than the work gave back.",
    ],
    rolesHeadline: "Here are the roles we fill most for startups",
    roles: [
      { name: "Executive Assistant / Chief of Staff", department: "admin-operations" },
      { name: "Operations Manager", department: "admin-operations" },
      { name: "Full Stack Developer", department: "software-engineering" },
      { name: "AI & Automations Developer", department: "data-ai" },
      { name: "Customer Support Lead", department: "customer-support" },
    ],
    rolesCloser:
      "Talent you pick yourself, in your working hours, with client-ready English and real AI skills, there to own the role and not just clear tasks.",
    proofLogos: [],
    caseStudy: null,
  },
  {
    slug: "agencies",
    navLabel: "Agencies",
    icon: "layers",
    name: "Agencies",
    descriptor: "Deliver end to end, scaling with the account.",
    subhead:
      "Add agency delivery that scales with the account, end to end.",
    problemHeadline: "Is client work growing faster than your team?",
    problemBody:
      "You win an account and need the delivery capacity this month, not next quarter. Every US hire you add to service the work takes a bite out of the margin. The freelancers you lean on disappear mid-project, and your senior people are doing production they should be reviewing.",
    triggers: [
      "You won a new account and need delivery capacity now.",
      "Adding a US hire to service the work eats the margin on it.",
      "You are staffing client work with freelancers who go quiet mid-project.",
      "Your senior people are producing work instead of reviewing it.",
    ],
    rolesHeadline: "Here are the roles we fill most for agencies",
    roles: [
      { name: "Digital Marketing Manager", department: "marketing" },
      { name: "Media Buyer", department: "marketing" },
      { name: "Graphic / Motion Designer", department: "design" },
      { name: "Project Manager", department: "admin-operations" },
      { name: "SEO Specialist", department: "marketing" },
    ],
    rolesCloser:
      "Talent you choose yourself, in your time zone, with the AI skills to carry client work end to end, so your senior team reviews instead of produces.",
    proofLogos: [],
    caseStudy: null,
  },
  {
    slug: "ecommerce",
    navLabel: "E-commerce",
    icon: "bag",
    name: "E-Commerce",
    descriptor: "Keep the store open through every spike and handle the calls.",
    subhead:
      "Staff e-commerce to stay open through every spike, calls handled.",
    problemHeadline: "The store has to stay open even when you're short-staffed",
    problemBody:
      "Support tickets, returns, and order problems arrive whether or not you have the people to handle them. A launch or a sales spike leaves you underwater on service and fulfillment. You are clearing the inbox yourself at midnight, and the VA you hired sends every decision back to you.",
    triggers: [
      "Tickets and returns pile up faster than your team clears them.",
      "A launch or a sales spike leaves service and fulfillment behind.",
      "You are answering customer email after hours.",
      "You hired a VA who escalated every refund and every upset customer back to you.",
    ],
    rolesHeadline: "Here are the roles we fill most in e-commerce",
    roles: [
      { name: "Customer Support Specialist", department: "customer-support" },
      { name: "Operations / Fulfillment Coordinator", department: "admin-operations" },
      { name: "Email / Retention Marketing Manager", department: "marketing" },
      { name: "Paid Media Buyer", department: "marketing" },
      { name: "Bookkeeper", department: "finance-accounting" },
    ],
    rolesCloser:
      "Talent you choose yourself, with the assurance to handle a refund or an upset customer without sending it back to you, on your hours.",
    proofLogos: [],
    caseStudy: null,
  },
] as const;

/**
 * "Talent" read as a page for job seekers, so buyers skipped it and candidates
 * landed on it. It is a page about roles you can hire, so it is called Roles.
 */
export type NavItem = {
  label: string;
  href: string;
  /** Renders as a dropdown on desktop and an indented group on mobile. */
  children?: { label: string; href: string }[];
  /** Desktop renders the department mega menu instead of a plain dropdown. */
  mega?: boolean;
};

export const nav: NavItem[] = [
  { label: "How it works", href: "/how-it-works" },
  {
    label: "Industries",
    href: "/industries",
    // "All industries" leads the list, as on Near's menu (10/5).
    children: [
      { label: "All industries", href: "/industries" },
      ...industries.map((industry) => ({
        label: industry.navLabel,
        href: `/industries/${industry.slug}`,
      })),
    ],
  },
  {
    // Near-style mega menu on desktop: departments left, the hovered
    // department's roles right (10/5). Phones get the departments as a list.
    label: "Roles",
    href: "/roles",
    mega: true,
    children: [
      { label: "All roles", href: "/roles" },
      ...departments.map((department) => ({
        label: department.name,
        href: `/roles/${department.slug}`,
      })),
    ],
  },
  {
    // Near-style Services dropdown (10/5): the two models, plus the
    // pricing comparison that sets them side by side.
    label: "Services",
    href: "/services",
    children: [
      ...services.map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
      { label: "Compare the two", href: "/#models" },
    ],
  },
  { label: "Results", href: "/results" },
  { label: "Pricing", href: "/#models" },
  { label: "About", href: "/about" },
];


/**
 * Client proof. Five client-approved quotes, verbatim (the em dashes in
 * Robert Horsley's quote are the approved wording, an exception to the
 * no-em-dash rule). No photos or LinkedIn links yet, so cards show an
 * initials avatar and `linkedin` stays empty until real profiles land.
 */
export const clientQuotes = {
  eyebrow: "In their words",
  headline: "What clients say when we are not on the call",
  /**
   * Client testimonial videos, shown on their own above the quote cards.
   * `preview` is the 18s silent hover clip and `full` is the full-length
   * 720p cut with sound for the pop-up, both in /public/video/testimonials-web.
   * `focus` is the object-position of the 3:4 head-and-shoulders crop shown
   * in the middle of each 4:3 card (the sources are vertical); it also keeps
   * the burned-in captions at the top out of view.
   *
   * The brief asks for Quest Relocation, Nika Housing and Rincon Rehab. There
   * is no Nika Housing video yet, so Pivt's is used instead. The company names
   * show as text wordmarks until the real logo files arrive.
   */
  videos: [
    { slug: "pivt", company: "Pivt", focus: "50% 55%" },
    { slug: "quest", company: "Quest Relocation", focus: "50% 58%" },
    { slug: "rincon-rehab", company: "Rincon Rehab", focus: "50% 56%" },
  ],
  /** `linkedin` is a placeholder (the LinkedIn homepage) until the real profile URLs arrive. */
  slots: [
    {
      id: "quote-1",
      quote:
        "Ten hires in six months, every one of them scoring 90%+ in our reviews. Handoff doesn't make us choose between speed and quality.",
      name: "Steve Frey",
      title: "CEO",
      company: "Oasis",
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "quote-2",
      quote:
        "Product, GTM, content, events — Handoff has staffed nearly every function we've needed as WorkRight scales, and each hire has been strong enough that we didn't have to think twice.",
      name: "Robert Horsley",
      title: "Co-Founder & COO",
      company: "Fragomen WorkRight",
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "quote-4",
      quote:
        "We don't take chances on where we source talent. Handoff has earned that trust across three different parts of our business.",
      name: "Bob Rosing",
      title: "CEO",
      company: "Dwellworks",
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "quote-5",
      quote:
        "Turnover is a challenge in this industry. Handoff has placed people who are committed, fast learners, and genuinely care about the work... and that's exactly what's moved the needle for us.",
      name: "Ryan Hoover",
      title: "Founder & CEO",
      company: "United Corporate Housing",
      linkedin: "https://www.linkedin.com/",
    },
  ],
};

/**
 * Two real, client-cleared case studies (from the "Case Study" PDFs in the
 * shared Drive folder), anonymized by role rather than company name, same
 * as the source documents ship them. Numbers and quotes are verbatim except
 * for punctuation normalized to the site's no-em-dash rule.
 */
export const caseStudies = [
  {
    slug: "fractional-cmo",
    tag: "Marketing",
    icon: "megaphone",
    title: "How a Fractional CMO scaled to 8 clients",
    subhead:
      "A seasoned Fractional CMO went from managing 3 overwhelmed clients to running marketing strategy for 8 high-growth companies.",
    heroStats: [
      { value: "8", label: "Active clients, up from 3" },
      { value: "+250%", label: "Revenue increase" },
      { value: "20hrs", label: "Saved per week" },
    ],
    challenge: [
      "Constantly switching between client communication channels, project tools and marketing platforms, losing strategic thinking time to every context switch.",
      "60% of his time went to status updates and progress reports instead of the high-impact strategy clients were paying for.",
      "Every client had different internal teams and approval processes, so he became the bottleneck manually coordinating his own vision with client execution teams.",
      "Already at capacity with 3 clients, with no way to take on the higher-value work he was positioned to win.",
    ],
    solution: [
      { title: "One command center for every client", result: "80% reduction in context-switching time" },
      { title: "Standardized handoff templates for every campaign", result: "70% faster campaign execution" },
      { title: "Automated dashboards instead of manual reporting", result: "90% improvement in strategic decision speed" },
    ],
    results: [
      { value: "8", label: "Active clients" },
      { value: "+250%", label: "Annual revenue increase" },
      { value: "20hrs", label: "Saved per week on admin" },
      { value: "95%", label: "Client retention" },
      { value: "40%", label: "Pipeline growth across clients" },
      { value: "$2.3M", label: "Additional revenue in 12 months" },
    ],
    quote:
      "Handoff didn't just solve my operational challenges. It transformed my entire business model. I went from being a stressed consultant juggling 3 clients to a strategic advisor confidently serving 8 high-growth companies. The ROI was immediate and continues to compound as I scale.",
    attributionRole: "Fractional CMO and Marketing Strategist",
  },
  {
    slug: "global-relocation",
    tag: "Relocation",
    icon: "globe",
    title: "Scaling global relocation operations with nearshore talent",
    subhead:
      "One of the world's leading relocation and mobility services companies needed top-tier operational and finance talent, fast, without US and European hiring costs.",
    heroStats: [
      { value: "$327,600", label: "In annual savings" },
      { value: "96%", label: "Retention across all roles" },
      { value: "50%", label: "Decrease in time-to-hire" },
    ],
    challenge: [
      "Struggled to fill Accounts Payable, Accounts Receivable, Staff Accountant and Global Accounting Manager roles despite competitive salaries.",
      "Could not maintain adequate coverage in guest services and intercultural support.",
      "Needed to scale internal teams without exceeding operational budgets.",
      "Traditional hiring was too costly and too slow for roles requiring strong English fluency, cross-cultural understanding and financial precision.",
    ],
    solution: [
      { title: "A blended nearshore team: accounting and finance specialists, an intercultural training coordinator, guest services and admin support", result: "Onboarded in under three weeks" },
      { title: "Every hire vetted for technical skill, cultural alignment and communication ability", result: "Full adoption of the client's own tools and workflows" },
    ],
    results: [
      { value: "+$327,600", label: "In annual savings" },
      { value: "96%", label: "Retention rate across all roles" },
      { value: "50%", label: "Decrease in time-to-hire" },
      { value: "3 weeks", label: "Typical time to fill a role" },
    ],
    quote:
      "Partnering with Handoff has completely transformed how we scale our operational teams. When local hiring dried up, their team delivered high caliber talent fast, and at a fraction of the cost.",
    attributionRole: "VP of Global Operations",
  },
] as const;

export const resultsPage = {
  eyebrow: "Results",
  headline: "What happens after the hire",
  headlineAccent: "is the whole point.",
  body: "Placing someone is the easy half. These are the numbers and the stories from companies that made the hire and kept the person.",
  /**
   * Anthony's confirmed figures from the 10/5 Pulse, retention first (Tom).
   * Time to hire is phrased as he asked: the top two within 2 weeks, not a
   * placement date. The case-study figures that sat here stay in the case
   * study cards and write-ups below.
   */
  numbers: [
    { value: "92%", label: "Of placements still with their company after a year" },
    { value: "2 weeks", label: "To your top two candidates" },
    { value: "Top 1%", label: "Of talent" },
  ],
  videos: {
    headline: "Video testimonials",
    body: "Filmed with clients, on their own terms. Dropping in as each one clears.",
    slots: [
      { id: "video-1", label: "[VIDEO TESTIMONIAL PENDING APPROVAL]" },
      { id: "video-2", label: "[VIDEO TESTIMONIAL PENDING APPROVAL]" },
      { id: "video-3", label: "[VIDEO TESTIMONIAL PENDING APPROVAL]" },
    ],
  },
};
