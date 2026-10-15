/** Results page, case studies, and client quotes. */
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
  title: "Results | Handoff",
  description:
    "Case studies, retention numbers and client testimonials from companies that hired through Handoff.",
  eyebrow: "Results",
  headline: "What happens after the hire",
  headlineAccent: "is the whole point.",
  body: "Placing someone is the easy half. These are the numbers and the stories from companies that made the hire and kept the person.",
  storiesHeadline: "The stories",
  storiesBody: "Two real engagements, written up with the client’s numbers and the client’s words.",
  readStory: "Read the story",
  caseStudyLabel: "case study",
  caseStudyKicker: "Case study",
  challengeHeading: "The challenge",
  solutionHeading: "What we did",
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
