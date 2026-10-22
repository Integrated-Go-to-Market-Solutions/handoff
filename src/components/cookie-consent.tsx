"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Cookie consent (10/22 site audit: analytics cookies were set without
 * consent). Google Consent Mode v2 defaults everything to "denied" in the
 * <head> script (`consentDefaultScript`), before Tag Manager loads, so the
 * Google Analytics cookies wait for Accept. The choice is kept in this
 * browser; a Global Privacy Control signal counts as Decline. "Cookie
 * Settings" in the footer reopens the banner.
 */
export const CONSENT_KEY = "handoff-consent";
export const OPEN_CONSENT_EVENT = "handoff:cookie-settings";

/** Runs in <head> before Tag Manager. Keep it tiny and dependency-free. */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var c=null;try{c=localStorage.getItem("${CONSENT_KEY}")}catch(e){}
if(!c&&navigator.globalPrivacyControl)c="denied";
var s=c==="granted"?"granted":"denied";
gtag("consent","default",{ad_storage:s,ad_user_data:s,ad_personalization:s,analytics_storage:s,functionality_storage:"granted",security_storage:"granted",wait_for_update:500});`;

type Choice = "granted" | "denied";

function apply(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {}
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export function CookieConsent() {
  const { site } = useContent();
  const copy = site.consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {}
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
    if (!stored && !gpc) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open || !copy?.text) return null;

  const choose = (choice: Choice) => {
    apply(choice);
    setOpen(false);
  };
  const button =
    "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan/40";

  return (
    <div
      role="region"
      aria-label={copy.label || "Cookie choices"}
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#1c1c1c]/95 p-4 text-bone shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm md:inset-x-6 md:bottom-6 md:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p data-tina-field={tinaField(copy, "text")} className="text-sm leading-relaxed text-bone/85">
          {copy.text}{" "}
          <Link href="/privacy" className="font-semibold text-cyan underline-offset-4 hover:underline">
            {site.footer.privacyLabel || "Privacy Policy"}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          {/* Same size and weight on purpose: declining is as easy as accepting. */}
          <button type="button" onClick={() => choose("denied")} className={`${button} border-2 border-white/25 text-bone hover:border-cyan`}>
            {copy.decline}
          </button>
          <button type="button" onClick={() => choose("granted")} className={`${button} border-2 border-cyan bg-cyan text-ink hover:bg-transparent hover:text-cyan`}>
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { site } = useContent();
  if (!site.consent?.settings) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      data-tina-field={tinaField(site.consent, "settings")}
      className={className}
    >
      {site.consent.settings}
    </button>
  );
}
