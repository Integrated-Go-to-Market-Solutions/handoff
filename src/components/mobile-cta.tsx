"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tinaField, useContent } from "@/components/tina/content";

/**
 * Phones only: a small "Book a call" button pinned to the bottom of the
 * screen. Hidden while the mobile menu is open (the header sets
 * `data-menu-open` on <html>, see globals.css), while the closing section's
 * own "Book a call" is on screen, and on the booking page itself. The body
 * gets matching bottom padding on phones, so nothing ends up under it.
 */
export function MobileCta() {
  const { site } = useContent();
  const pathname = usePathname();
  const [finaleInView, setFinaleInView] = useState(false);

  useEffect(() => {
    const finale = document.querySelector(".finale");
    if (!finale) return;
    const io = new IntersectionObserver(([entry]) => setFinaleInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(finale);
    return () => {
      io.disconnect();
      setFinaleInView(false);
    };
  }, [pathname]);

  const onBookingPage = !/^https?:\/\//.test(site.bookingUrl) && pathname === site.bookingUrl;
  const hidden = finaleInView || onBookingPage;

  return (
    <div
      className={`mobile-cta fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 md:hidden ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <Link
        href={site.bookingUrl}
        tabIndex={hidden ? -1 : undefined}
        data-tina-field={tinaField(site.mobileCta, "label")}
        className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-[0.95rem] font-semibold text-ink shadow-[0_10px_28px_-8px_rgba(0,0,0,0.7)] ring-2 ring-ink/10"
        {...(/^https?:\/\//.test(site.bookingUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {site.mobileCta.label}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
