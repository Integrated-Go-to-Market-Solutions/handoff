/**
 * Conversion events for Google Tag Manager (W-52, list confirmed by Jazmin
 * 11/12). Each event goes to the dataLayer with an `audience` so client and
 * candidate conversions stay separate in GA4, HubSpot and LinkedIn. No names
 * or emails are ever sent. Tags still only fire once the visitor accepts
 * cookies; that's set per tag in GTM.
 */
const AUDIENCE = {
  generate_lead: "client",
  book_call_complete: "client",
  form_start: "client",
  book_call_click: "client",
  role_hire_click: "client",
  industry_cta_click: "client",
  talent_pool_click: "candidate",
  apply_click: "candidate",
  email_click: "unknown",
  social_click: "unknown",
  video_play: "unknown",
} as const;

export type TrackEvent = keyof typeof AUDIENCE;

export function track(event: TrackEvent, params: Record<string, string | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, audience: AUDIENCE[event], page: window.location.pathname, ...params });
}
