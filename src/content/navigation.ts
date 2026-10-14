/** Header and footer navigation. Built from the industry, role, and service lists. */
import { industries } from "./industries";
import { departments } from "./roles";
import { services } from "./services";

/**
 * "Talent" read as a page for job seekers, so buyers skipped it and candidates
 * landed on it. It is a page about roles you can hire, so it is called Roles.
 */
export type NavItem = {
  label: string;
  href: string;
  /**
   * Renders as a dropdown on desktop and an indented group on mobile. A
   * child with `soon` shows as a non-clickable "Soon" placeholder.
   */
  children?: { label: string; href: string; soon?: boolean }[];
  /** Desktop renders the department mega menu instead of a plain dropdown. */
  mega?: boolean;
  /** A label that only opens its dropdown; it isn't a page itself. */
  menuOnly?: boolean;
};

export const nav: NavItem[] = [
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Industries",
    href: "/industries",
    // "All Industries" leads the list, as on Near's menu (10/5).
    children: [
      { label: "All Industries", href: "/industries" },
      ...industries.map((industry) => ({
        label: industry.navLabel,
        href: `/industries/${industry.slug}`,
      })),
    ],
  },
  {
    // Near-style mega menu on desktop: departments left, the hovered
    // department's roles right (10/5). Phones get the departments as a list.
    label: "Roles",
    href: "/roles",
    mega: true,
    children: [
      { label: "All Roles", href: "/roles" },
      ...departments.map((department) => ({
        label: department.name,
        href: `/roles/${department.slug}`,
      })),
    ],
  },
  {
    // Near-style Services dropdown (10/5): the two models, and the
    // side-by-side comparison on /pricing (Tom, 10/6: pricing lives here).
    // Like Near's, "Services" only opens the list; it isn't a page, so it
    // no longer lands on Pricing (Tom, 10/6).
    label: "Services",
    href: "/services",
    menuOnly: true,
    children: [
      ...services.map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
      { label: "Compare the Two", href: "/pricing" },
    ],
  },
  {
    // Replaces Pricing in the top menu, with Results moved under it (Tom,
    // 10/6). Blog and Calculator are "Soon" placeholders.
    label: "Resources",
    href: "/results",
    children: [
      { label: "Results", href: "/results" },
      { label: "Case Studies", href: "/results#case-studies" },
      { label: "Blog", href: "#", soon: true },
      { label: "Calculator", href: "#", soon: true },
    ],
  },
  { label: "About", href: "/about" },
];


