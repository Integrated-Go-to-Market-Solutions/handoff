/** Global settings: name, booking links, social, and the shared call to action. */
/**
 * Positioning is taken from the 8/13 messaging call (Mark's hero statement),
 * the 8/10 Karla call, and the workshopped ICP.
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

