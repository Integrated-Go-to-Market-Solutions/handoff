import Link from "next/link";
import { LogoLock } from "./brand";
import { nav, site } from "@/lib/content";

/** Industries and Roles come straight from the header menu, so the footer
 *  lists the same pages in the same order (10/5). */
const menuColumn = (label: string) => {
  const item = nav.find((entry) => entry.label === label);
  return { title: label, links: item?.children ?? [] };
};

const columns = [
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/#models" },
      { label: "Results", href: "/results" },
      { label: "About", href: "/about" },
    ],
  },
  menuColumn("Industries"),
  menuColumn("Roles"),
  {
    title: "Get started",
    links: [
      { label: "Talk to Our Team", href: site.bookCall },
      { label: "hello@handoff.com", href: "mailto:hello@handoff.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">

      <div className="shell relative py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <LogoLock />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-bone">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base font-medium text-bone/75 transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-medium text-bone/70">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="display text-sm text-cyan">{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
