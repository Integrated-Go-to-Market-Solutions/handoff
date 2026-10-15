/**
 * One-time seed: writes the current TypeScript copy into Tina JSON documents.
 * Run with: node --experimental-strip-types scripts/export-tina-content.ts
 */
import fs from "node:fs";
import path from "node:path";
import { site, socialLinks, cta } from "../src/content/site";
import {
  hero,
  whyLatam,
  industriesStrip,
  credibilityStats,
  talentMap,
  logos,
  aiTrained,
  vibes,
  soul,
  faqs,
  process as hiring,
  howItWorksPage,
} from "../src/content/home";
import {
  models,
  pricingPage,
  modelsIntro,
  modelsCompare,
  modelsFootnote,
} from "../src/content/pricing";
import { servicesPage, services } from "../src/content/services";
import { team, aboutPage } from "../src/content/about";
import { departments, rolesPage } from "../src/content/roles";
import { careersPage } from "../src/content/careers";
import { contactPage } from "../src/content/contact";
import { industriesPage, industries } from "../src/content/industries";
import { clientQuotes, caseStudies, resultsPage } from "../src/content/results";

const root = path.join(process.cwd(), "content");

function write(relative: string, data: unknown) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function cell(value: boolean | string | { text: string; accent: boolean }) {
  if (value === true) return { kind: "check", text: "", accent: false };
  if (value === false) return { kind: "dash", text: "", accent: false };
  if (typeof value === "string") return { kind: "text", text: value, accent: false };
  return { kind: "text", text: value.text, accent: Boolean(value.accent) };
}

write("site/site.json", {
  name: site.name,
  tagline: site.tagline,
  bookCall: site.bookCall,
  bookingUrl: site.bookingUrl,
  seeTalent: site.seeTalent,
  seo: {
    title: "Handoff | The Best of LATAM. AI Powered People. Here to Stay.",
    description:
      "We help the best US companies hire Latin America's top 1% talent — vetted, AI powered, and ready to make an impact from day one.",
  },
  header: {
    hireLabel: "Hire Today",
    hireHref: "/contact",
    joinLabel: "Join Our Talent Pool",
    joinHref: "/careers",
  },
  mobileCta: { label: "Talk to our team" },
  footer: {
    email: "hello@handoff.com",
    emailLabel: "hello@handoff.com",
    talkLabel: "Talk to Our Team",
    legal: "All rights reserved.",
    company: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  marqueeCaption: "Trusted by teams that keep moving",
  navLabels: {
    howItWorks: "How It Works",
    industries: "Industries",
    allIndustries: "All Industries",
    roles: "Roles",
    allRoles: "All Roles",
    services: "Services",
    compare: "Compare the Two",
    resources: "Resources",
    about: "About",
    soon: "Soon",
  },
  resources: [
    { label: "Results", href: "/results", soon: false },
    { label: "Case Studies", href: "/results#case-studies", soon: false },
    { label: "Blog", href: "#", soon: true },
    { label: "Calculator", href: "#", soon: true },
  ],
  socialLinks: socialLinks.map((link) => ({
    label: link.label,
    platform: link.platform,
    href: link.href,
  })),
  cta: {
    headline: cta.headline,
    headlineParts: cta.headlineParts,
    closing: cta.closing,
    book: cta.book,
    body: cta.body,
    primary: cta.primary,
    secondary: cta.secondary,
  },
});

write("home/home.json", {
  hero: {
    eyebrow: hero.eyebrow,
    headlineLead: hero.headlineLead,
    headlineLines: hero.headlineLines.map((line) => ({ text: line.text, tone: line.tone ?? "" })),
    image: "/images/hero/team.webp",
    imageAlt: hero.imageAlt,
    body: hero.body,
    primary: hero.primary,
    secondary: { label: hero.secondary.label, href: hero.secondary.href },
    note: hero.note,
  },
  whyLatam: {
    headline: whyLatam.headline,
    subhead: whyLatam.subhead,
    categories: whyLatam.categories.map((category) => ({
      title: category.title,
      tagline: category.tagline,
      icon: category.icon,
      bullets: [...category.bullets],
    })),
  },
  industriesStrip: { ...industriesStrip },
  credibilityStats: credibilityStats.map((stat) => ({ ...stat })),
  talentMap: {
    heading: talentMap.heading,
    intro: talentMap.intro,
    cta: talentMap.cta,
    salaryLabel: talentMap.salaryLabel,
    profiles: talentMap.profiles.map((profile) => ({
      name: profile.name,
      city: profile.city,
      country: profile.country,
      role: profile.role,
      department: profile.department,
      salary: profile.salary,
      photo: profile.photo ?? "",
    })),
  },
  logos: logos.map((logo) => ({
    slug: logo.slug,
    name: logo.name,
    image: `/images/logos/${logo.slug}.webp`,
    hasImage: logo.hasImage,
    stacked: "stacked" in logo ? Boolean(logo.stacked) : false,
  })),
  aiTrained: {
    eyebrow: aiTrained.eyebrow,
    headline: aiTrained.headline,
    subhead: aiTrained.subhead,
    subheadBold: aiTrained.subheadBold,
    toolsLabel: aiTrained.toolsLabel,
    tools: aiTrained.tools.map((tool) => ({
      name: tool.name,
      icon: `/images/ai-tools/${tool.file}.svg`,
      mono: "mono" in tool ? Boolean(tool.mono) : false,
    })),
    tracks: aiTrained.tracks.map((track) => ({
      id: track.id,
      kicker: track.kicker,
      title: track.title,
      details: {
        hours: track.details.hours,
        facts: track.details.facts.map((fact) => ({ ...fact })),
        learnLabel: track.details.learnLabel,
        learn: track.details.learn.map((item) => ({ ...item })),
        buildLabel: track.details.buildLabel,
        build: [...track.details.build],
      },
    })),
    comingSoon: aiTrained.comingSoon,
  },
  vibes: {
    headline: vibes.headline,
    headlineAccent: vibes.headlineAccent,
    headlineAfter: vibes.headlineAfter,
    body: vibes.body,
    clips: vibes.clips.map((clip) => ({
      slug: clip.slug,
      name: clip.name,
      caption: clip.caption,
      video: `/videos/${clip.slug}.mp4`,
      poster: `/videos/${clip.slug}.jpg`,
    })),
  },
  soul: {
    dictionary: { ...soul.dictionary },
    cultureVideo: { src: "/video/culture.mp4", poster: "/video/culture.jpg" },
    closerParts: {
      before: soul.closerParts.before,
      accent: soul.closerParts.accent,
      after: soul.closerParts.after,
      sub: [...soul.closerParts.sub],
    },
  },
});

write("hiring/hiring.json", {
  pageTitle: howItWorksPage.title,
  pageDescription: howItWorksPage.description,
  titleParts: hiring.titleParts,
  body: hiring.body,
  steps: hiring.steps.map((step) => ({
    n: step.n,
    title: step.title,
    body: step.body,
    bulletsLead: step.bulletsLead ?? "",
    bullets: step.bullets ? [...step.bullets] : [],
    after: step.after ?? "",
  })),
  closer: hiring.closer,
  pageCloser: hiring.pageCloser,
  teaserCta: hiring.teaserCta,
  teaserHref: hiring.teaserHref,
  timeline: {
    labels: [...hiring.timeline.labels],
    cta: hiring.timeline.cta,
    videos: hiring.timeline.videos.map((video) => ({ ...video })),
  },
  promo: {
    src: "/videos/handoff-promo.mp4",
    poster: "/videos/handoff-promo.jpg",
    label: "Handoff: the team behind the hiring",
  },
});

write("pricing/pricing.json", {
  title: pricingPage.title,
  intro: modelsIntro,
  footnote: modelsFootnote,
  models: models.map((model) => ({
    tag: model.tag,
    name: model.name,
    forWho: model.forWho,
    price: model.price,
    terms: model.terms,
    copy: model.copy,
    points: [...model.points],
    extrasLabel: model.extrasLabel,
    extras: [...model.extras],
    featured: model.featured,
  })),
  compare: {
    columns: [...modelsCompare.columns],
    featured: modelsCompare.featured,
    footnote: modelsCompare.footnote,
    rows: modelsCompare.rows.map((row) => ({
      label: row.label,
      note: row.note ?? "",
      values: row.values.map(cell),
    })),
  },
});

write("faq/faq.json", {
  items: faqs.map((item) => ({ q: item.q, a: item.a })),
});

write("testimonials/testimonials.json", {
  eyebrow: clientQuotes.eyebrow,
  headline: clientQuotes.headline,
  videos: clientQuotes.videos.map((video) => ({
    company: video.company,
    focus: video.focus,
    poster: `/video/testimonials-web/${video.slug}.jpg`,
    preview: `/video/testimonials-web/${video.slug}.mp4`,
    full: `/video/testimonials-web/${video.slug}-full.mp4`,
  })),
  slots: clientQuotes.slots.map((slot) => ({ ...slot })),
});

write("about/about.json", {
  ...aboutPage,
  valuesVideo: {
    src: "/videos/handoff-values.mp4",
    poster: "/videos/handoff-values.jpg",
    name: "Handoff values",
    caption: "This is how we lead.",
  },
});

write("careers/careers.json", careersPage);
write("contact/contact.json", {
  title: contactPage.title,
  description: contactPage.description,
  eyebrow: contactPage.eyebrow,
  headline: contactPage.headline,
  headlineAccent: contactPage.headlineAccent,
  body: contactPage.body,
  expect: [...contactPage.expect],
  form: contactPage.form,
});
write("results/results.json", {
  title: resultsPage.title,
  description: resultsPage.description,
  eyebrow: resultsPage.eyebrow,
  headline: resultsPage.headline,
  headlineAccent: resultsPage.headlineAccent,
  body: resultsPage.body,
  storiesHeadline: resultsPage.storiesHeadline,
  storiesBody: resultsPage.storiesBody,
  readStory: resultsPage.readStory,
  caseStudyLabel: resultsPage.caseStudyLabel,
  caseStudyKicker: resultsPage.caseStudyKicker,
  challengeHeading: resultsPage.challengeHeading,
  solutionHeading: resultsPage.solutionHeading,
  numbers: resultsPage.numbers.map((item) => ({ ...item })),
  heroImage: "/textures/brick.jpg",
});
write("roles-page/roles-page.json", rolesPage);
write("industries-page/industries-page.json", industriesPage);
write("services-page/services-page.json", servicesPage);

for (const [index, industry] of industries.entries()) {
  write(`industries/${industry.slug}.json`, {
    order: index,
    navLabel: industry.navLabel,
    icon: industry.icon,
    name: industry.name,
    descriptor: industry.descriptor,
    heroImage: industry.heroImage,
    subhead: industry.subhead,
    problemHeadline: industry.problemHeadline,
    problemBody: industry.problemBody,
    triggers: [...industry.triggers],
    rolesHeadline: industry.rolesHeadline,
    roles: industry.roles.map((role) => ({
      name: role.name,
      department: "department" in role && role.department ? role.department : "",
    })),
    rolesCloser: industry.rolesCloser,
    proofLogos: [...industry.proofLogos],
    caseStudy: industry.caseStudy ?? "",
  });
}

for (const [index, department] of departments.entries()) {
  write(`departments/${department.slug}.json`, {
    order: index,
    name: department.name,
    roles: [...department.roles],
    video: department.video ?? { src: "", poster: "" },
  });
}

for (const [index, service] of services.entries()) {
  write(`services/${service.slug}.json`, {
    order: index,
    name: service.name,
    subhead: service.subhead,
    howItWorks: service.howItWorks,
    detailHeadline: service.detailHeadline,
    detailBody: service.detailBody,
    detailList: [...service.detailList],
    bestFit: service.bestFit,
    other: service.other,
  });
}

for (const [index, member] of team.entries()) {
  write(`team/${member.slug}.json`, {
    order: index,
    name: member.name,
    role: member.role,
    photo: `/images/team/${member.slug}.webp`,
  });
}

for (const [index, study] of caseStudies.entries()) {
  write(`case-studies/${study.slug}.json`, {
    order: index,
    tag: study.tag,
    icon: study.icon,
    title: study.title,
    subhead: study.subhead,
    heroStats: study.heroStats.map((stat) => ({ ...stat })),
    challenge: [...study.challenge],
    solution: study.solution.map((item) => ({ ...item })),
    results: study.results.map((stat) => ({ ...stat })),
    quote: study.quote,
    attributionRole: study.attributionRole,
  });
}

console.log("Wrote Tina content to", root);
