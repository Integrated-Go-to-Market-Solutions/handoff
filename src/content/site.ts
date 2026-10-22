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
  /** Handoff's slogan (10/14 call). */
  headline: "Focus on what you do best. Hand off the rest.",
  headlineParts: { before: "Focus on what you do best.", accent: "Hand off the rest." },
  /** Optional line under the finale headline; blank shows none. */
  closing: "",
  /** The finale's one button. Links to `site.bookingUrl`. */
  book: "Book a call",
  body: "Tell us about the work, and we'll help you shape the role around it. One 30-minute call is usually enough to scope it.",
  primary: { label: "Get Started Today", href: site.bookCall },
  secondary: { label: "Talk to Our Team", href: site.bookCall },
};

