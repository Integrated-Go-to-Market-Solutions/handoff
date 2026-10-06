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
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  menuColumn("Industries"),
  menuColumn("Roles"),
  menuColumn("Services"),
  menuColumn("Resources"),
  {
    title: "Get Started",
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
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Logo on its own row, so six link columns fit beneath it. */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-6">
            <LogoLock />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow text-bone">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"soon" in link && link.soon ? (
                      // Not built yet: a label with a "Soon" tag, as in the menu.
                      <span className="inline-flex items-center gap-2 text-base font-medium text-bone/40">
                        {link.label}
                        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-bone/50">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-base font-medium text-bone/75 transition-colors hover:text-cyan"
                      >
                        {link.label}
                      </Link>
                    )}
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
