"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tinaField, useContent, type NavItem } from "@/components/tina/content";

/**
 * Dropdowns open on hover and stay open while focus is inside them (for the
 * keyboard). A clicked link keeps focus after the page changes, which left
 * one dropdown stuck open under the next (Tom, 10/6). These release that
 * focus: on clicking a menu link, and on hovering a different dropdown.
 */
const releaseFocus = (e: React.MouseEvent<HTMLElement>) => e.currentTarget.blur();

function releaseFocusOutside(e: React.MouseEvent<HTMLElement>) {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active.closest("header") && !e.currentTarget.contains(active)) {
    active.blur();
  }
}

/** A menu entry that isn't built yet: a plain label with a "Soon" tag, not a link. */
function SoonItem({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`flex items-center justify-between gap-3 font-medium text-bone/40 ${className}`}>
      {label}
      <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-bone/50">
        Soon
      </span>
    </span>
  );
}

/**
 * Desktop dropdown. Opens on hover for the mouse and on focus-within for the
 * keyboard, so the industry pages are reachable either way without a click
 * handler and without trapping focus.
 */
function NavGroup({ item }: { item: NavItem }) {
  // Click-to-open for menuOnly parents: Safari doesn't focus a clicked
  // button, so focus-within alone wouldn't open the list.
  const [clickOpen, setClickOpen] = useState(false);
  useEffect(() => {
    if (!clickOpen) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-nav-group]")) setClickOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [clickOpen]);
  const parentClass =
    "flex items-center gap-1 whitespace-nowrap text-[0.93rem] font-medium text-bone/70 transition-colors hover:text-bone group-focus-within:text-bone";
  // menuOnly parents (Services) open the list on hover, click or focus but
  // don't navigate. A button keeps them reachable from the keyboard.
  const parentInner = (
    <>
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
    </>
  );
  return (
    <div
      className="group relative"
      data-nav-group=""
      onMouseEnter={releaseFocusOutside}
      onMouseLeave={() => setClickOpen(false)}
    >
      {item.menuOnly ? (
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={clickOpen}
          onClick={() => setClickOpen((v) => !v)}
          className={`cursor-default ${parentClass}`}
        >
          {parentInner}
        </button>
      ) : (
        <Link href={item.href} onClick={releaseFocus} className={parentClass}>
          {parentInner}
        </Link>
      )}

      <div
        className={`absolute left-0 top-full z-50 pt-4 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
          clickOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="min-w-60 rounded-(--radius-card) border border-white/10 bg-ink-100 p-2 shadow-xl">
          {item.children?.map((child) => (
            <li key={child.label}>
              {child.soon ? (
                <SoonItem label={child.label} className="px-4 py-3 text-[0.93rem]" />
              ) : (
                <Link
                  href={child.href}
                  onClick={releaseFocus}
                  className="block rounded-xl px-4 py-3 text-[0.93rem] font-medium text-bone/75 transition-colors hover:bg-white/5 hover:text-cyan"
                >
                  {child.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Roles mega menu, after Near's "Find a Hire" menu (10/5): departments down
 * the left, and the hovered or focused department's roles on the right,
 * with a link into that department's page. Opens like NavGroup: hover for
 * the mouse, focus-within for the keyboard.
 */
function RolesMega({ item }: { item: NavItem }) {
  const { departments, site } = useContent();
  const [active, setActive] = useState(0);
  const department = departments[active];

  return (
    <div className="group relative" onMouseEnter={releaseFocusOutside}>
      <Link
        href={item.href}
        onClick={releaseFocus}
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

      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="grid w-160 grid-cols-[15rem_1fr] rounded-(--radius-card) border border-white/10 bg-ink-100 p-2 shadow-xl">
          <ul className="border-r border-white/10 pr-2">
            {departments.map((d, i) => (
              <li key={d.slug}>
                <Link
                  href={`/roles/${d.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={releaseFocus}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[0.9rem] font-medium transition-colors ${
                    i === active ? "bg-white/5 text-cyan" : "text-bone/75 hover:text-cyan"
                  }`}
                >
                  {d.name}
                  <span aria-hidden="true" className={i === active ? "opacity-100" : "opacity-0"}>
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-white/10 pt-1">
              <Link
                href="/roles"
                onClick={releaseFocus}
                className="block rounded-xl px-4 py-2.5 text-[0.9rem] font-semibold text-bone transition-colors hover:text-cyan"
              >
                {site.navLabels.allRoles}
              </Link>
            </li>
          </ul>
          <div className="px-6 py-3">
            <p className="eyebrow text-xs text-bone/50">{department.name}</p>
            <ul className="mt-3 space-y-2 text-[0.9rem] leading-snug text-bone/80">
              {department.roles.map((role: any) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <Link
              href={`/roles/${department.slug}`}
              onClick={releaseFocus}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cyan hover:underline"
            >
              See {department.name} Roles <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderCtas({ block = false, onNavigate }: { block?: boolean; onNavigate?: () => void }) {
  const { site } = useContent();
  const headerCtas = [
    {
      label: site.header.hireLabel,
      href: site.header.hireHref,
      field: "hireLabel" as const,
      className: "border-cyan bg-cyan text-ink hover:bg-ink hover:text-cyan",
    },
    {
      label: site.header.joinLabel,
      href: site.header.joinHref,
      field: "joinLabel" as const,
      className: "border-cyan bg-white text-ink hover:bg-cyan",
    },
  ];
  return (
    <div className={block ? "mt-8 flex flex-col gap-3" : "flex items-center gap-2"}>
      {headerCtas.map((cta) => (
        <Link
          key={cta.label}
          href={cta.href}
          onClick={onNavigate}
          data-tina-field={tinaField(site.header, cta.field)}
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
  const { nav } = useContent();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // A new page: let go of any focus left in the header so no dropdown stays open.
  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest("header")) active.blur();
  }, [pathname]);
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
            item.mega ? (
              <RolesMega key={item.label} item={item} />
            ) : item.children ? (
              <NavGroup key={item.label} item={item} />
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
          className="relative z-50 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.25 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-bone transition-transform duration-300 ${
              open ? "translate-y-1.75 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition-transform duration-300 ${
              open ? "-translate-y-1.75 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-17 z-40 overflow-y-auto bg-ink px-6 pb-16 pt-8 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <div key={item.label}>
                {item.menuOnly ? (
                  <p className="display py-5 text-3xl text-bone">{item.label}</p>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-5 text-3xl text-bone"
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && (
                  <ul className="-mt-2 pb-5 pl-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        {child.soon ? (
                          <SoonItem label={child.label} className="py-3 text-base" />
                        ) : (
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-3 text-base font-medium text-bone/60 transition-colors hover:text-bone"
                          >
                            {child.label}
                          </Link>
                        )}
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
