import type { MetadataRoute } from "next";
import { listDocs } from "@/lib/tina/files";
import { SITE_URL } from "@/lib/seo";

/**
 * Every public page (10/16 site audit). Industry, department and service
 * pages come from the content folders, so new ones are listed automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/how-it-works", "/industries", "/roles", "/pricing", "/results", "/about", "/careers", "/contact"];
  const fromContent = [
    ...listDocs("industries").map((doc) => `/industries/${doc.slug}`),
    ...listDocs("departments").map((doc) => `/roles/${doc.slug}`),
    ...listDocs("services").map((doc) => `/services/${doc.slug}`),
  ];
  return [...pages, ...fromContent].map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
