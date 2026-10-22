/** Book-a-call page and the contact form. */
export const contactPage = {
  title: "Book a call | Handoff",
  description:
    "Where is your team stretched thin? Tell us about the work, and we'll help you shape the role around it in one 30-minute call.",
  eyebrow: "Book a call",
  headline: "Where is your team",
  headlineAccent: "stretched thin?",
  body: "Tell us about the work, and we'll help you shape the role around it. One 30-minute call is usually enough to scope it. If we are not the right fit, we will tell you on that call rather than sell you something that will not work.",
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
    error: "Sorry, that didn't go through. Please try again, or email hello@talenthandoff.com and we'll pick it up there.",
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

