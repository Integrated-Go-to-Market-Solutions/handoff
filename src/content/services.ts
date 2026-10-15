/** Service pages (/services/[slug]). */
/**
 * Service pages (/services/[slug]): Tom's content doc (Direct Hire and
 * Managed Staffing tabs), 10/5. One edit to the doc: Direct Hire said
 * "contract them directly as an international contractor"; it reads
 * "contract them directly" here, per the 10/5 call's rule against calling
 * the talent contractors. The pricing table makes the same choice.
 */
export const servicesPage = {
  crumb: "Services",
  howHeadline: "How it works",
  bestFitHeadline: "Best fit",
};

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
      "Benefits",
      "Equipment and IT",
    ],
    bestFit:
      "Managed Staffing is the fit when you want us to hold the employment, compliance, and support, and keep the talent with you for the long term. Prefer to contract the talent yourself? Direct Hire covers that.",
    other: { label: "See Direct Hire", slug: "direct-hire" },
  },
];

