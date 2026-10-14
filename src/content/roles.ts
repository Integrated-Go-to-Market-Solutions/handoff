/** Roles hub and department pages. */
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
  title: "Roles we place | Handoff",
  crumb: "Roles",
  headline: "Roles we place",
  subhead:
    "We fill roles across departments and seniority, from specialists to department heads. These are the ones we place most.",
  closing:
    "This is a sample of the roles we fill most, not the limit. If the one you need is not here, tell us.",
  otherDepartments: "Other departments",
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

