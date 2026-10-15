"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo } from "react";
import { hashFromQuery, tinaField, useTina } from "tinacms/dist/react";
import type { ChromePayload } from "@/lib/tina/load";
import { repoMedia } from "@/lib/tina/media";
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
  discoveryCallUrl?: string;
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

type TinaPayload = { data: any; query: string; variables: object };

type LiveSlice = {
  home?: any;
  hiring?: any;
  pricing?: any;
  faq?: any;
  testimonials?: any;
  about?: any;
  careers?: any;
  contact?: any;
  results?: any;
  rolesPage?: any;
  industriesPage?: any;
  servicesPage?: any;
};

const RawContext = createContext<ChromePayload | null>(null);
const LiveSiteContext = createContext<ContentSite | null>(null);

function useRaw() {
  const raw = useContext(RawContext);
  if (!raw) throw new Error("Page editor is outside the site shell.");
  return raw;
}

function useLiveSite() {
  const site = useContext(LiveSiteContext);
  if (!site) throw new Error("Page editor is outside the site shell.");
  return site;
}

/** Registers one document with the visual editor. `primary` opens its form instead of the file tree. */
function usePageDoc(payload: TinaPayload, primary = false) {
  const selectId = useMemo(
    () => hashFromQuery(JSON.stringify({ query: payload.query, variables: payload.variables })),
    [payload.query, payload.variables],
  );
  const live = useTina({
    query: payload.query,
    variables: payload.variables,
    data: payload.data,
    ...(primary ? { experimental___selectFormByFormId: () => selectId } : {}),
  });
  return useMemo(() => repoMedia(live), [live.data]);
}

function assemble(raw: ChromePayload, siteDoc: ContentSite, live: LiveSlice = {}) {
  const pick = (payload: TinaPayload, key: string, override?: any) => override ?? payload.data[key];
  return buildContent(
    siteDoc,
    pick(raw.home as TinaPayload, "home", live.home),
    pick(raw.hiring as TinaPayload, "hiring", live.hiring),
    pick(raw.pricing as TinaPayload, "pricing", live.pricing),
    pick(raw.faq as TinaPayload, "faq", live.faq),
    pick(raw.testimonials as TinaPayload, "testimonials", live.testimonials),
    pick(raw.about as TinaPayload, "about", live.about),
    pick(raw.careers as TinaPayload, "careers", live.careers),
    pick(raw.contact as TinaPayload, "contact", live.contact),
    pick(raw.results as TinaPayload, "results", live.results),
    pick(raw.rolesPage as TinaPayload, "rolesPage", live.rolesPage),
    pick(raw.industriesPage as TinaPayload, "industriesPage", live.industriesPage),
    pick(raw.servicesPage as TinaPayload, "servicesPage", live.servicesPage),
    nodes(raw.industries as never, "industryConnection"),
    nodes(raw.departments as never, "departmentConnection"),
    nodes(raw.services as never, "serviceConnection"),
    nodes(raw.team as never, "teamMemberConnection"),
    nodes(raw.caseStudies as never, "caseStudyConnection"),
  );
}

function useAssembled(live: LiveSlice) {
  const raw = useRaw();
  const site = useLiveSite();
  return useMemo(
    () => assemble(raw, site, live),
    [
      raw,
      site,
      live.home,
      live.hiring,
      live.pricing,
      live.faq,
      live.testimonials,
      live.about,
      live.careers,
      live.contact,
      live.results,
      live.rolesPage,
      live.industriesPage,
      live.servicesPage,
    ],
  );
}

function Editor({ value, children }: { value: Content; children: React.ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

function HomeForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const home = usePageDoc(raw.home as TinaPayload, true);
  const hiring = usePageDoc(raw.hiring as TinaPayload);
  const pricing = usePageDoc(raw.pricing as TinaPayload);
  const faq = usePageDoc(raw.faq as TinaPayload);
  const quotes = usePageDoc(raw.testimonials as TinaPayload);
  const value = useAssembled({
    home: home.data.home,
    hiring: hiring.data.hiring,
    pricing: pricing.data.pricing,
    faq: faq.data.faq,
    testimonials: quotes.data.testimonials,
  });
  return <Editor value={value}>{children}</Editor>;
}

function HiringForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const hiring = usePageDoc(raw.hiring as TinaPayload, true);
  const home = usePageDoc(raw.home as TinaPayload);
  const value = useAssembled({ hiring: hiring.data.hiring, home: home.data.home });
  return <Editor value={value}>{children}</Editor>;
}

function PricingForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const pricing = usePageDoc(raw.pricing as TinaPayload, true);
  const faq = usePageDoc(raw.faq as TinaPayload);
  const value = useAssembled({ pricing: pricing.data.pricing, faq: faq.data.faq });
  return <Editor value={value}>{children}</Editor>;
}

function AboutForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const about = usePageDoc(raw.about as TinaPayload, true);
  const home = usePageDoc(raw.home as TinaPayload);
  const value = useAssembled({ about: about.data.about, home: home.data.home });
  return <Editor value={value}>{children}</Editor>;
}

function CareersForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const careers = usePageDoc(raw.careers as TinaPayload, true);
  const value = useAssembled({ careers: careers.data.careers });
  return <Editor value={value}>{children}</Editor>;
}

function ContactForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const contact = usePageDoc(raw.contact as TinaPayload, true);
  const home = usePageDoc(raw.home as TinaPayload);
  const value = useAssembled({ contact: contact.data.contact, home: home.data.home });
  return <Editor value={value}>{children}</Editor>;
}

function ResultsForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const results = usePageDoc(raw.results as TinaPayload, true);
  const quotes = usePageDoc(raw.testimonials as TinaPayload);
  const value = useAssembled({ results: results.data.results, testimonials: quotes.data.testimonials });
  return <Editor value={value}>{children}</Editor>;
}

function RolesForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const rolesPage = usePageDoc(raw.rolesPage as TinaPayload, true);
  const value = useAssembled({ rolesPage: rolesPage.data.rolesPage });
  return <Editor value={value}>{children}</Editor>;
}

function RoleDetailForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const hiring = usePageDoc(raw.hiring as TinaPayload);
  const home = usePageDoc(raw.home as TinaPayload);
  const rolesPage = usePageDoc(raw.rolesPage as TinaPayload);
  const value = useAssembled({
    hiring: hiring.data.hiring,
    home: home.data.home,
    rolesPage: rolesPage.data.rolesPage,
  });
  return <Editor value={value}>{children}</Editor>;
}

function IndustriesForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const industriesPage = usePageDoc(raw.industriesPage as TinaPayload, true);
  const value = useAssembled({ industriesPage: industriesPage.data.industriesPage });
  return <Editor value={value}>{children}</Editor>;
}

function IndustryDetailForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const home = usePageDoc(raw.home as TinaPayload);
  const hiring = usePageDoc(raw.hiring as TinaPayload);
  const quotes = usePageDoc(raw.testimonials as TinaPayload);
  const value = useAssembled({
    home: home.data.home,
    hiring: hiring.data.hiring,
    testimonials: quotes.data.testimonials,
  });
  return <Editor value={value}>{children}</Editor>;
}

function ServiceDetailForms({ children }: { children: React.ReactNode }) {
  const raw = useRaw();
  const servicesPage = usePageDoc(raw.servicesPage as TinaPayload);
  const hiring = usePageDoc(raw.hiring as TinaPayload);
  const home = usePageDoc(raw.home as TinaPayload);
  const pricing = usePageDoc(raw.pricing as TinaPayload);
  const value = useAssembled({
    servicesPage: servicesPage.data.servicesPage,
    hiring: hiring.data.hiring,
    home: home.data.home,
    pricing: pricing.data.pricing,
  });
  return <Editor value={value}>{children}</Editor>;
}

function PlainForms({ children }: { children: React.ReactNode }) {
  const value = useAssembled({});
  return <Editor value={value}>{children}</Editor>;
}

function PageForms({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "/";
  if (path === "/") return <HomeForms>{children}</HomeForms>;
  if (path === "/how-it-works") return <HiringForms>{children}</HiringForms>;
  if (path === "/pricing") return <PricingForms>{children}</PricingForms>;
  if (path === "/about") return <AboutForms>{children}</AboutForms>;
  if (path === "/careers") return <CareersForms>{children}</CareersForms>;
  if (path === "/contact") return <ContactForms>{children}</ContactForms>;
  if (path === "/results") return <ResultsForms>{children}</ResultsForms>;
  if (path === "/roles") return <RolesForms>{children}</RolesForms>;
  if (path.startsWith("/roles/")) return <RoleDetailForms>{children}</RoleDetailForms>;
  if (path === "/industries") return <IndustriesForms>{children}</IndustriesForms>;
  if (path.startsWith("/industries/")) return <IndustryDetailForms>{children}</IndustryDetailForms>;
  if (path.startsWith("/services/")) return <ServiceDetailForms>{children}</ServiceDetailForms>;
  return <PlainForms>{children}</PlainForms>;
}

/** The document for this URL, opened as the form when the visual editor loads. */
export function useLiveDoc(payload: { data: any; query: string; variables: { relativePath?: string } }, key: string) {
  const fetched = usePageDoc(payload, true);
  const node = fetched.data?.[key] ?? {};
  const relative = payload.variables?.relativePath || "";
  const slug = relative.split("/").pop()?.replace(/\.json$/, "") || node._sys?.filename || "";
  return { ...node, slug };
}

export function SiteShell({ payload, children }: { payload: ChromePayload; children: React.ReactNode }) {
  const site = usePageDoc(payload.site as TinaPayload);

  return (
    <RawContext.Provider value={payload}>
      <LiveSiteContext.Provider value={site.data.site as ContentSite}>
        <PageForms>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileCta />
        </PageForms>
      </LiveSiteContext.Provider>
    </RawContext.Provider>
  );
}
