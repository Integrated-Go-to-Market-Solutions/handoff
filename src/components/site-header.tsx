"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import type { NavItem } from "@/lib/content";

/**
 * Desktop dropdown. Opens on hover for the mouse and on focus-within for the
 * keyboard, so the industry pages are reachable either way without a click
 * handler and without trapping focus.
 */
function NavGroup({ item }: { item: NavItem }) {
  return (
    <div className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-1 whitespace-nowrap text-[0.93rem] font-medium text-bone/70 transition-colors hover:text-bone group-focus-within:text-bone"
      >
        {item.label}
        <svg
          viewBox="0 0 12 8"
          className="h-2 w-2.5 transition-transform duration-200 group-hover:rotate-180"
          aria-hidden="true"
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="min-w-[15rem] rounded-[var(--radius-card)] border border-white/10 bg-ink-100 p-2 shadow-xl">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block rounded-xl px-4 py-3 text-[0.93rem] font-medium text-bone/75 transition-colors hover:bg-white/5 hover:text-cyan"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const headerCtas = [
  {
    label: "Hire Today",
    href: "/contact",
    className: "border-cyan bg-cyan text-ink hover:bg-ink hover:text-cyan",
  },
  {
    // Points at /contact until a talent-pool page exists.
    label: "Join Our Talent Pool",
    href: "/contact",
    className: "border-cyan bg-white text-ink hover:bg-cyan",
  },
];

function HeaderCtas({ block = false, onNavigate }: { block?: boolean; onNavigate?: () => void }) {
  return (
    <div className={block ? "mt-8 flex flex-col gap-3" : "flex items-center gap-2"}>
      {headerCtas.map((cta) => (
        <Link
          key={cta.label}
          href={cta.href}
          onClick={onNavigate}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 font-semibold transition-colors duration-300 ${cta.className} ${
            block ? "w-full px-6 py-3.5 text-base" : "px-3.5 py-1.5 text-[0.8rem]"
          }`}
        >
          {cta.label}
        </Link>
      ))}
    </div>
  );
}

/**
 * Back to a conventional single-row header per direct instruction: logo
 * left, nav and CTAs right, the whole bar sticky.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't let the page scroll behind the open mobile menu, and flag it on
  // <html> so the sticky mobile CTA can hide itself.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.toggleAttribute("data-menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-menu-open");
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeMenu);
    return () => desktop.removeEventListener("change", closeMenu);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-lg" : "bg-ink"
      }`}
    >
      <div className="shell flex items-center justify-between py-4">
        <Link href="/" aria-label="Handoff home" className="inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-light.svg" alt="Handoff" className="h-9 w-auto md:h-10" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-5 xl:gap-9">
          {nav.map((item) =>
            item.children ? (
              <NavGroup key={item.href} item={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[0.93rem] font-medium text-bone/70 transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ),
          )}
          <HeaderCtas />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="relative z-50 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-bone transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-ink px-6 pb-16 pt-8 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block py-5 text-3xl text-bone"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="-mt-2 pb-5 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block py-3 text-base font-medium text-bone/60 transition-colors hover:text-bone"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <HeaderCtas block onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
}
