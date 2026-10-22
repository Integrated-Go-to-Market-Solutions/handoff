"use client";

import Link from "next/link";
import { CookieSettingsLink } from "@/components/cookie-consent";
import { LogoLock } from "./brand";
import { tinaField, useContent } from "@/components/tina/content";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  const { nav, site } = useContent();
  const menuColumn = (label: string) => {
    const item = nav.find((entry) => entry.label === label);
    return { title: label, links: item?.children ?? [] };
  };
  const columns = [
    { title: "Company", links: site.footer.company },
    menuColumn(site.navLabels.industries),
    menuColumn(site.navLabels.roles),
    menuColumn(site.navLabels.services),
    menuColumn(site.navLabels.resources),
    {
      title: "Get Started",
      links: [
        { label: site.footer.talkLabel, href: site.bookCall },
        { label: site.footer.emailLabel, href: `mailto:${site.footer.email}` },
      ],
    },
  ];
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">

      <div className="shell relative py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Logo on its own row, so six link columns fit beneath it, with the
              social icons on the right. */}
          <div className="flex flex-wrap items-center justify-between gap-6 sm:col-span-2 md:col-span-3 lg:col-span-6">
            <LogoLock />
            <SocialLinks compact />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow text-bone">{col.title}</h2>
              <ul className="mt-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"soon" in link && link.soon ? (
                      // Not built yet: a label with a "Soon" tag, as in the menu.
                      <span className="inline-flex items-center gap-2 py-1.5 text-base font-medium text-bone/40">
                        {link.label}
                        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-bone/50">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-block py-1.5 text-base font-medium text-bone/75 transition-colors hover:text-cyan"
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
            &copy; {new Date().getFullYear()} <span data-tina-field={tinaField(site, "name")}>{site.name}</span>.{" "}
            <span data-tina-field={tinaField(site.footer, "legal")}>{site.footer.legal}</span>
            {site.footer.privacyLabel && (
              <>
                {" "}
                <Link
                  href="/privacy"
                  data-tina-field={tinaField(site.footer, "privacyLabel")}
                  className="ml-2 underline-offset-4 transition-colors hover:text-cyan hover:underline"
                >
                  {site.footer.privacyLabel}
                </Link>
              </>
            )}
            <CookieSettingsLink className="ml-4 underline-offset-4 transition-colors hover:text-cyan hover:underline" />
          </span>
          <span data-tina-field={tinaField(site, "tagline")} className="display text-sm text-cyan">
            {site.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
