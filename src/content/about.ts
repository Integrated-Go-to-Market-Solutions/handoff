/** About page copy and the team. */
/**
 * Real Handoff team members, not stock and not placed talent. This is the
 * point Mark made on 8/13: "we don't talk about overseas talent, we are the
 * overseas talent."
 */
export const team = [
  { slug: "jazmin-esparza", name: "Jazmin Esparza", role: "Chief of Staff" },
  { slug: "jake-castro", name: "Jake Castro", role: "VP of Automation" },
  { slug: "karla-patron", name: "Karla Patrón", role: "Head of Marketing" },
  { slug: "catalina-saldarriaga", name: "Catalina Saldarriaga", role: "Operations Manager" },
  { slug: "simon-quintero", name: "Simon Quintero", role: "Executive Assistant" },
  { slug: "leidy-quintero", name: "Leidy Quintero", role: "Project Manager" },
  { slug: "shaori-velueta", name: "Shaori Velueta", role: "Digital Marketer" },
];

/**
 * About page copy (10/5). Built from Tom's content doc (headline, lead,
 * founder, close) and Anthony's words on the 10/5 call (opportunity gap,
 * win-win, Humanize/Connect/Hustle). The value one-liners are from the live
 * talenthandoff.com/about, with "We make $hit happen" softened: no
 * profanity on the site (Tom). "Paid above market" is Anthony's phrase from
 * the call and still needs his OK to publish.
 */
export const aboutPage = {
  title: "About | Handoff",
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
      // Order per Tom (10/6): Humanize, Connect, Hustle.
      { name: "Humanize", line: "People come first in everything we do." },
      { name: "Connect", line: "Relationships are the heart of our business." },
      { name: "Hustle", line: "We make it happen." },
    ],
  },
  teamHeadline: "Our team",
  close: "We are the team behind your team. We do the sourcing, screening, and support, so you can bring on talent with confidence and keep your focus on the work.",
  cta: "Book a call",
};

