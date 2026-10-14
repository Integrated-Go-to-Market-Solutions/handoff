/** Careers page, for talent rather than clients. */
/**
 * /careers: Tom's content doc (Careers tab), 10/5. Talent-facing. Pay
 * language stays general until Anthony confirms what can be stated (doc
 * note). The reels are the talent-culture clips the doc names ("a day with
 * Handoff" and remote culture), already in /public/videos.
 * The apply button goes to Handoff's existing application page on the
 * live site (Tom, 10/5).
 */
export const careersPage = {
  title: "Careers | Handoff",
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

