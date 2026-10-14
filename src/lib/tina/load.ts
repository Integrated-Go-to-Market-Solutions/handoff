import { listDocs, readDoc, tinaDoc, tinaList } from "./files";

const fetchOptions = { next: { revalidate: 60 } };

type QueryResult = {
  data: Record<string, unknown>;
  query: string;
  variables: Record<string, unknown>;
};

async function tinaClient() {
  const mod = await import("../../../tina/__generated__/client");
  return mod.default;
}

async function query<T>(run: (client: Awaited<ReturnType<typeof tinaClient>>) => Promise<T>, fallback: () => T): Promise<T> {
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  const token = process.env.TINA_TOKEN;
  const real = Boolean(clientId && token && clientId !== "local" && token !== "local");
  if (!process.env.TINA_LOCAL_URL && !real) return fallback();
  try {
    const client = await tinaClient();
    return await run(client);
  } catch (error) {
    console.warn("Tina content API unavailable, reading content files.", error instanceof Error ? error.message : error);
    return fallback();
  }
}

export async function loadSite() {
  return query(
    (client) => client.queries.site({ relativePath: "site.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("site", "site/site.json", readDoc("site/site.json")),
  );
}

export async function loadHome() {
  return query(
    (client) => client.queries.home({ relativePath: "home.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("home", "home/home.json", readDoc("home/home.json")),
  );
}

export async function loadHiring() {
  return query(
    (client) => client.queries.hiring({ relativePath: "hiring.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("hiring", "hiring/hiring.json", readDoc("hiring/hiring.json")),
  );
}

export async function loadPricing() {
  return query(
    (client) => client.queries.pricing({ relativePath: "pricing.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("pricing", "pricing/pricing.json", readDoc("pricing/pricing.json")),
  );
}

export async function loadFaq() {
  return query(
    (client) => client.queries.faq({ relativePath: "faq.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("faq", "faq/faq.json", readDoc("faq/faq.json")),
  );
}

export async function loadTestimonials() {
  return query(
    (client) => client.queries.testimonials({ relativePath: "testimonials.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("testimonials", "testimonials/testimonials.json", readDoc("testimonials/testimonials.json")),
  );
}

export async function loadAbout() {
  return query(
    (client) => client.queries.about({ relativePath: "about.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("about", "about/about.json", readDoc("about/about.json")),
  );
}

export async function loadCareers() {
  return query(
    (client) => client.queries.careers({ relativePath: "careers.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("careers", "careers/careers.json", readDoc("careers/careers.json")),
  );
}

export async function loadContact() {
  return query(
    (client) => client.queries.contact({ relativePath: "contact.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("contact", "contact/contact.json", readDoc("contact/contact.json")),
  );
}

export async function loadResults() {
  return query(
    (client) => client.queries.results({ relativePath: "results.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("results", "results/results.json", readDoc("results/results.json")),
  );
}

export async function loadRolesPage() {
  return query(
    (client) => client.queries.rolesPage({ relativePath: "roles-page.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("rolesPage", "roles-page/roles-page.json", readDoc("roles-page/roles-page.json")),
  );
}

export async function loadIndustriesPage() {
  return query(
    (client) => client.queries.industriesPage({ relativePath: "industries-page.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("industriesPage", "industries-page/industries-page.json", readDoc("industries-page/industries-page.json")),
  );
}

export async function loadServicesPage() {
  return query(
    (client) => client.queries.servicesPage({ relativePath: "services-page.json" }, { fetchOptions }) as Promise<QueryResult>,
    () => tinaDoc("servicesPage", "services-page/services-page.json", readDoc("services-page/services-page.json")),
  );
}

const listVariables = { first: 100 };

export async function loadIndustries() {
  return query(
    (client) => client.queries.industryConnection(listVariables, { fetchOptions }) as Promise<QueryResult>,
    () => tinaList("industryConnection", "industries"),
  );
}

export async function loadDepartments() {
  return query(
    (client) => client.queries.departmentConnection(listVariables, { fetchOptions }) as Promise<QueryResult>,
    () => tinaList("departmentConnection", "departments"),
  );
}

export async function loadServices() {
  return query(
    (client) => client.queries.serviceConnection(listVariables, { fetchOptions }) as Promise<QueryResult>,
    () => tinaList("serviceConnection", "services"),
  );
}

export async function loadTeam() {
  return query(
    (client) => client.queries.teamMemberConnection(listVariables, { fetchOptions }) as Promise<QueryResult>,
    () => tinaList("teamMemberConnection", "team"),
  );
}

export async function loadCaseStudies() {
  return query(
    (client) => client.queries.caseStudyConnection(listVariables, { fetchOptions }) as Promise<QueryResult>,
    () => tinaList("caseStudyConnection", "case-studies"),
  );
}

export async function loadIndustry(slug: string) {
  const relativePath = `${slug}.json`;
  return query(
    (client) => client.queries.industry({ relativePath }, { fetchOptions }) as Promise<QueryResult | null>,
    () => {
      const docs = listDocs("industries");
      const match = docs.find((doc) => doc.slug === slug);
      if (!match) return null;
      return tinaDoc("industry", `industries/${relativePath}`, match.data);
    },
  );
}

export async function loadDepartment(slug: string) {
  const relativePath = `${slug}.json`;
  return query(
    (client) => client.queries.department({ relativePath }, { fetchOptions }) as Promise<QueryResult | null>,
    () => {
      const match = listDocs("departments").find((doc) => doc.slug === slug);
      if (!match) return null;
      return tinaDoc("department", `departments/${relativePath}`, match.data);
    },
  );
}

export async function loadService(slug: string) {
  const relativePath = `${slug}.json`;
  return query(
    (client) => client.queries.service({ relativePath }, { fetchOptions }) as Promise<QueryResult | null>,
    () => {
      const match = listDocs("services").find((doc) => doc.slug === slug);
      if (!match) return null;
      return tinaDoc("service", `services/${relativePath}`, match.data);
    },
  );
}

export async function loadChrome() {
  const [
    site,
    home,
    hiring,
    pricing,
    faq,
    testimonials,
    about,
    careers,
    contact,
    results,
    rolesPage,
    industriesPage,
    servicesPage,
    industries,
    departments,
    services,
    team,
    caseStudies,
  ] = await Promise.all([
    loadSite(),
    loadHome(),
    loadHiring(),
    loadPricing(),
    loadFaq(),
    loadTestimonials(),
    loadAbout(),
    loadCareers(),
    loadContact(),
    loadResults(),
    loadRolesPage(),
    loadIndustriesPage(),
    loadServicesPage(),
    loadIndustries(),
    loadDepartments(),
    loadServices(),
    loadTeam(),
    loadCaseStudies(),
  ]);

  return {
    site,
    home,
    hiring,
    pricing,
    faq,
    testimonials,
    about,
    careers,
    contact,
    results,
    rolesPage,
    industriesPage,
    servicesPage,
    industries,
    departments,
    services,
    team,
    caseStudies,
  };
}

export type ChromePayload = Awaited<ReturnType<typeof loadChrome>>;
