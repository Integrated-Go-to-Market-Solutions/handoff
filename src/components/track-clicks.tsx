"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

const SOCIAL = /(^|\.)(youtube\.com|linkedin\.com|instagram\.com)$/;

/** Where on the page a link sits: header, footer, the phone bar, or the section's label. */
function placeOf(el: Element) {
  const marked = el.closest("[data-track-location]");
  if (marked) return marked.getAttribute("data-track-location") || undefined;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest("section");
  return section?.getAttribute("aria-label") || section?.querySelector("h1, h2")?.textContent?.trim().slice(0, 60) || undefined;
}

/**
 * One click listener for the whole site (W-52). Links that need extra detail
 * name their event with data-track (the role cards); the rest are read from
 * where they point, so new buttons are counted without extra wiring.
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const label = a.textContent?.replace(/[→←]/g, "").trim().replace(/\s+/g, " ").slice(0, 80) || undefined;

      if (a.dataset.track === "role_hire_click") {
        track("role_hire_click", { role: a.dataset.role, department: a.dataset.department });
        return;
      }
      if (a.dataset.track === "talent_pool_click") {
        track("talent_pool_click", { location: placeOf(a) });
        return;
      }
      if (a.protocol === "mailto:") {
        track("email_click", { location: placeOf(a) });
        return;
      }

      const url = new URL(a.href, window.location.href);
      if (SOCIAL.test(url.hostname)) {
        track("social_click", { network: url.hostname.replace(/^www\./, "").split(".")[0], location: placeOf(a) });
        return;
      }
      if (url.hostname === "jobs.ashbyhq.com" || (url.origin === window.location.origin && url.pathname === "/careers/open-positions")) {
        track("apply_click", { label, location: placeOf(a) });
        return;
      }
      if (url.origin === window.location.origin && url.pathname === "/contact") {
        // Buttons in the page body of an industry page carry the industry; the
        // header, footer and phone bar count as plain Book a call clicks.
        const industry = a.closest("header, footer, [data-track-location]")
          ? undefined
          : window.location.pathname.match(/^\/industries\/([^/]+)/)?.[1];
        if (industry) track("industry_cta_click", { industry, label, location: placeOf(a) });
        else track("book_call_click", { label, location: placeOf(a) });
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
