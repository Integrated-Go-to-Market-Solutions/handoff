/** Industries overview and the industry pages. */
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
 * at an existing /results write-up. heroImage: Tom's header photos (10/7),
 * compressed from the originals in assets/industries (git-ignored).
 *
 * 10/5: "Hospitality" renamed "Corporate housing" (slug corporate-housing;
 * the old URL redirects in next.config.ts) and the order set to Tom's
 * content doc: housing, relocation, startups, agencies, e-commerce.
 */
/** The /industries overview page: Tom's content doc, Industries Menu tab. */
export const industriesPage = {
  title: "Industries | Handoff",
  crumb: "Industries",
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
    heroImage: { src: "/images/industries/corporate-housing.webp", alt: "A bright furnished apartment living room with a sofa and city views", focus: "50% 50%" },
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
    icon: "pin",
    name: "Corporate Relocation",
    descriptor: "Match your contract load with coordinators in your clients' time zone.",
    heroImage: { src: "/images/industries/corporate-relocation-skyline.jpg", alt: "The San Francisco skyline at dusk, seen from above the bay, with the Bay Bridge crossing the water toward downtown", focus: "50% 45%" },
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
    heroImage: { src: "/images/industries/startups.webp", alt: "A small team working on laptops around a shared table in a coworking caf\u00e9", focus: "62% 60%" },
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
    heroImage: { src: "/images/industries/agencies.webp", alt: "A creative team at their desks in an open studio", focus: "62% 50%" },
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
    navLabel: "E-Commerce",
    icon: "bag",
    name: "E-Commerce",
    descriptor: "Keep the store open through every spike and handle the calls.",
    heroImage: { src: "/images/industries/ecommerce.webp", alt: "A warehouse worker checking stock on a tablet beside stacked boxes", focus: "72% 50%" },
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

