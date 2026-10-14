"use client";

import { createContext, useContext, useMemo } from "react";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import type { ChromePayload } from "@/lib/tina/load";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";

export { tinaField };

type Node = {
  _sys?: { filename?: string };
  order?: number | null;
  slug?: string;
  [key: string]: any;
};

function withSlug<T extends Node>(node: T) {
  return Object.assign(node, { slug: node._sys?.filename || node.slug || "" });
}

function nodes<T extends Node>(result: { data: Record<string, { edges?: { node: T }[] }> }, key: string) {
  const edges = result.data[key]?.edges ?? [];
  return edges
    .map((edge) => (edge?.node ? withSlug(edge.node) : null))
    .filter((node): node is T & { slug: string } => Boolean(node))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

type Doc = { [key: string]: any };

export type Content = {
  nav: NavItem[];
  site: ContentSite;
  cta: Doc;
  socialLinks: Doc[];
  hero: Doc;
  whyLatam: Doc;
  industriesStrip: Doc;
  credibilityStats: Doc[];
  talentMap: Doc;
  logos: Doc[];
  aiTrained: Doc;
  vibes: Doc;
  soul: Doc;
  process: Doc;
  howItWorksPage: { title: string; description: string };
  pricingPage: { title: string };
  modelsIntro: Doc;
  modelsFootnote: string;
  models: Doc[];
  modelsCompare: Doc;
  faqs: Doc[];
  clientQuotes: Doc;
  aboutPage: Doc;
  careersPage: Doc;
  contactPage: Doc;
  resultsPage: Doc;
  rolesPage: Doc;
  industriesPage: Doc;
  servicesPage: Doc;
  industries: Doc[];
  departments: Doc[];
  services: Doc[];
  team: Doc[];
  caseStudies: Doc[];
};

const ContentContext = createContext<Content | null>(null);

export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent must be used inside the site shell.");
  return value;
}

function buildContent(
  site: any,
  home: any,
  hiring: any,
  pricing: any,
  faq: any,
  testimonials: any,
  about: any,
  careers: any,
  contact: any,
  results: any,
  rolesPage: any,
  industriesPage: any,
  servicesPage: any,
  industries: any,
  departments: any,
  services: any,
  team: any,
  caseStudies: any,
): Content {
  const siteDoc = site as ContentSite;
  return {
    site: siteDoc,
    cta: siteDoc.cta,
    socialLinks: siteDoc.socialLinks,
    hero: home.hero,
    whyLatam: home.whyLatam,
    industriesStrip: home.industriesStrip,
    credibilityStats: home.credibilityStats,
    talentMap: home.talentMap,
    logos: home.logos,
    aiTrained: home.aiTrained,
    vibes: home.vibes,
    soul: home.soul,
    process: hiring,
    howItWorksPage: {
      title: (hiring as { pageTitle: string }).pageTitle,
      description: (hiring as { pageDescription: string }).pageDescription,
    },
    pricingPage: { title: pricing.title },
    modelsIntro: pricing.intro,
    modelsFootnote: pricing.footnote,
    models: pricing.models,
    modelsCompare: pricing.compare,
    faqs: faq.items,
    clientQuotes: testimonials,
    aboutPage: about,
    careersPage: careers,
    contactPage: contact,
    resultsPage: results,
    rolesPage,
    industriesPage,
    servicesPage,
    industries,
    departments,
    services,
    team,
    caseStudies,
    nav: buildNav(siteDoc, industries, departments, services),
  } as Content;
}

type ContentSite = {
  name: string;
  tagline: string;
  bookCall: string;
  bookingUrl: string;
  seeTalent: string;
  seo: { title: string; description: string };
  header: { hireLabel: string; hireHref: string; joinLabel: string; joinHref: string };
  mobileCta: { label: string };
  footer: {
    email: string;
    emailLabel: string;
    talkLabel: string;
    legal: string;
    company: { label: string; href: string }[];
  };
  marqueeCaption: string;
  navLabels: {
    howItWorks: string;
    industries: string;
    allIndustries: string;
    roles: string;
    allRoles: string;
    services: string;
    compare: string;
    resources: string;
    about: string;
    soon: string;
  };
  resources: { label: string; href: string; soon?: boolean }[];
  socialLinks: { label: string; platform: "youtube" | "linkedin" | "instagram"; href: string }[];
  cta: {
    headline: string;
    headlineParts: { before: string; accent: string };
    closing: string;
    jam: string[];
    book: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; soon?: boolean }[];
  mega?: boolean;
  menuOnly?: boolean;
};

function buildNav(
  site: ContentSite,
  industries: { navLabel?: string; slug: string }[],
  departments: { name?: string; slug: string }[],
  services: { name?: string; slug: string }[],
): NavItem[] {
  const labels = site.navLabels;
  return [
    { label: labels.howItWorks, href: "/how-it-works" },
    {
      label: labels.industries,
      href: "/industries",
      children: [
        { label: labels.allIndustries, href: "/industries" },
        ...industries.map((industry) => ({
          label: industry.navLabel || "",
          href: `/industries/${industry.slug}`,
        })),
      ],
    },
    {
      label: labels.roles,
      href: "/roles",
      mega: true,
      children: [
        { label: labels.allRoles, href: "/roles" },
        ...departments.map((department) => ({
          label: department.name || "",
          href: `/roles/${department.slug}`,
        })),
      ],
    },
    {
      label: labels.services,
      href: "/services",
      menuOnly: true,
      children: [
        ...services.map((service) => ({ label: service.name || "", href: `/services/${service.slug}` })),
        { label: labels.compare, href: "/pricing" },
      ],
    },
    {
      label: labels.resources,
      href: "/results",
      children: site.resources,
    },
    { label: labels.about, href: "/about" },
  ];
}

function useDoc(props: { data: any; query: string; variables: object }) {
  return useTina(props);
}

/** One collection document, so a click on its page opens that document in the editor. */
export function useLiveDoc(payload: { data: any; query: string; variables: { relativePath?: string } }, key: string) {
  const live = useTina(payload);
  const node = live.data?.[key] ?? {};
  const relative = payload.variables?.relativePath || "";
  const slug = relative.split("/").pop()?.replace(/\.json$/, "") || node._sys?.filename || "";
  return { ...node, slug };
}

export function SiteShell({ payload, children }: { payload: ChromePayload; children: React.ReactNode }) {
  const site = useDoc(payload.site as { data: { site: ContentSite }; query: string; variables: object });
  const home = useDoc(payload.home as never);
  const hiring = useDoc(payload.hiring as never);
  const pricing = useDoc(payload.pricing as never);
  const faq = useDoc(payload.faq as never);
  const testimonials = useDoc(payload.testimonials as never);
  const about = useDoc(payload.about as never);
  const careers = useDoc(payload.careers as never);
  const contact = useDoc(payload.contact as never);
  const results = useDoc(payload.results as never);
  const rolesPage = useDoc(payload.rolesPage as never);
  const industriesPage = useDoc(payload.industriesPage as never);
  const servicesPage = useDoc(payload.servicesPage as never);

  const value = useMemo(
    () =>
      buildContent(
        site.data.site,
        home.data.home,
        hiring.data.hiring,
        pricing.data.pricing,
        faq.data.faq,
        testimonials.data.testimonials,
        about.data.about,
        careers.data.careers,
        contact.data.contact,
        results.data.results,
        rolesPage.data.rolesPage,
        industriesPage.data.industriesPage,
        servicesPage.data.servicesPage,
        nodes(payload.industries as never, "industryConnection"),
        nodes(payload.departments as never, "departmentConnection"),
        nodes(payload.services as never, "serviceConnection"),
        nodes(payload.team as never, "teamMemberConnection"),
        nodes(payload.caseStudies as never, "caseStudyConnection"),
      ),
    [
      site.data,
      home.data,
      hiring.data,
      pricing.data,
      faq.data,
      testimonials.data,
      about.data,
      careers.data,
      contact.data,
      results.data,
      rolesPage.data,
      industriesPage.data,
      servicesPage.data,
      payload,
    ],
  );

  return (
    <ContentContext.Provider value={value}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <MobileCta />
    </ContentContext.Provider>
  );
}
