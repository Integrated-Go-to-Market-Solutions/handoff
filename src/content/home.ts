/** Homepage section copy. Unused sections stay here until a page renders them again. */
import { site } from "./site";

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
  /**
   * One entry per line in the live hero. Line 1 is split so "LATAM." can
   * carry the brand blue (Tom, 10/7: option B, centered).
   */
  headlineLead: { before: "Hire the best of", accent: "LATAM." },
  headlineLines: [
    { text: "Hire the best of LATAM." },
    { text: "AI Powered People." },
    { text: "Here to stay.", tone: "cyan" },
  ] as { text: string; tone?: "cyan" }[],
  imageAlt: "The Handoff team",
  /** Tom's hero copy (10/7), with "Latin America talent" corrected to "Latin American talent". */
  body: "Handoff places full-time, dedicated Latin American talent inside US companies, screened to the top 1%.",
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
/**
 * Client logos for the band under the homepage hero, in Handoff's tier-1
 * order (10/13): hospitality, relocation, SaaS, relocation tech, e-commerce,
 * agency, startup. Files come from each company's own website, in the
 * colors the company uses there (Oasis, Snap, Earthside and CharCharms only
 * publish black logos). `stacked` logos (icon over name) get a taller box than
 * wide wordmarks so they read at a similar weight. Originals are in the
 * git-ignored assets/logos folder.
 */
export const logos = [
  { slug: "united-corporate-housing", name: "United Corporate Housing", hasImage: true, stacked: true },
  { slug: "oasis", name: "Oasis", hasImage: true },
  { slug: "altovita", name: "AltoVita", hasImage: true, stacked: true },
  { slug: "dwellworks", name: "Dwellworks", hasImage: true },
  { slug: "pivt", name: "Pivt", hasImage: true, stacked: true },
  { slug: "snap-supplements", name: "Snap Supplements", hasImage: true },
  { slug: "earth-side-farms", name: "Earthside Farms", hasImage: true, stacked: true },
  { slug: "charcharms", name: "CharCharms", hasImage: true },
  { slug: "do-good-cfo", name: "Do Good CFO", hasImage: true, stacked: true },
  { slug: "igtms", name: "IGTMS", hasImage: true },
  { slug: "doorspot", name: "DoorSpot", hasImage: true },
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
 * Homepage AI section, rebuilt 10/13 to Handoff's own mockup and copy doc
 * ("Handoff Academy", after the Pearl AI+ curriculum layout). Copy is
 * theirs, verbatim; tracks 2 and 3 arrived 10/13. The bold lead on each
 * "learn" line follows track 1's pattern (the phrase before the dash,
 * colon or comma); the pasted copy lost its bold. The tabs only switch
 * the card; they don't link anywhere (Tom, 10/13).
 */
export const aiTrained = {
  eyebrow: "Handoff Academy · Powered by Coursera",
  headline: { before: "Every Handoff hire shows up", highlight: "AI-ready." },
  subhead:
    "Through our Coursera partnership, the people we place train with Google, IBM and CertNexus — from everyday prompting to building agents that run real workflows.",
  subheadBold: "The judgment stays human. The busywork doesn't.",
  toolsLabel: "Tools our talent works with",
  /**
   * Icons are LobeHub Icons (MIT) in /public/images/ai-tools: colour
   * versions where they exist. OpenAI and Grok are single-colour white
   * marks, shown black (`mono`) on this light section.
   */
  tools: [
    { name: "Claude", file: "claude-color" },
    { name: "ChatGPT", file: "openai", mono: true },
    { name: "Gemini", file: "gemini-color" },
    { name: "Perplexity", file: "perplexity-color" },
    { name: "Grok", file: "grok", mono: true },
  ],
  tracks: [
    {
      id: "use-it",
      kicker: "Use it",
      title: "AI Fundamentals for Everyday Work",
      details: {
        hours: "~5 hours",
        facts: [
          { label: "For", value: "all roles" },
          { label: "With", value: "Google" },
          { label: "Earns", value: "AI Excellence certification" },
        ],
        learnLabel: "What they'll learn",
        learn: [
          { lead: "How AI actually works", rest: " — and where it falls short" },
          { lead: "Prompting with a framework:", rest: " task, context, references, evaluate, iterate" },
          { lead: "AI as a collaborator", rest: ", not a shortcut" },
          { lead: "Responsible use", rest: " — checking for accuracy and bias" },
        ],
        buildLabel: "What they'll build",
        build: [
          "Multi-step prompt chains for real work",
          "Brainstorms, plans and visuals in hands-on labs",
          "Custom AI-generated images",
        ],
      },
    },
    {
      id: "direct-it",
      kicker: "Direct it",
      title: "Agentic AI for Business",
      details: {
        hours: "8 hours",
        facts: [
          { label: "For", value: "ops, marketing and leadership roles" },
          { label: "With", value: "CertNexus" },
          { label: "Earns", value: "AgenticAIBIZ credential" },
        ],
        learnLabel: "What they'll learn",
        learn: [
          { lead: "Spotting what's worth automating", rest: " \u2014 and what it's worth" },
          { lead: "Agent design basics:", rest: " single vs. multi-agent, memory, safety" },
          { lead: "Risk and governance", rest: " when AI acts on its own" },
          { lead: "Rolling AI out", rest: " to a team and its stakeholders" },
        ],
        buildLabel: "What they'll build",
        build: [
          "A use-case assessment of agent-ready workflows",
          "An agent design with guardrails built in",
          "A team adoption roadmap",
        ],
      },
    },
    {
      id: "build-it",
      kicker: "Build it",
      title: "AI Agents & Workflow Automation",
      details: {
        hours: "~60 hours",
        facts: [
          { label: "For", value: "technical and automation roles" },
          { label: "With", value: "IBM, Board Infinity, Packt" },
          { label: "Earns", value: "IBM certificate in AI agents" },
        ],
        learnLabel: "What they'll learn",
        learn: [
          { lead: "Agents that use tools, reason and correct themselves", rest: "" },
          { lead: "RAG:", rest: " connecting AI to company knowledge with Pinecone and Chroma" },
          { lead: "Multi-agent orchestration", rest: " with LangGraph, CrewAI and AutoGen" },
          { lead: "Prototype to production:", rest: " testing, security, deployment" },
        ],
        buildLabel: "What they'll build",
        build: [
          "Working AI agents",
          "RAG-powered Q&A chatbots",
          "Multi-agent workflow systems",
          "A GenAI app, deployed",
        ],
      },
    },
  ],
  comingSoon: "Course details coming soon.",
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
    a: "Then we are not your fit yet, and we will say so rather than sell you something that will not work. Handoff exists for companies committing to a real hire who can own an area of the business.",
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

export const howItWorksPage = {
  title: "How it works | Handoff",
  description:
    "The Hands-off Hiring System: the four steps every Handoff hire goes through, from discovery to the guarantee.",
};

