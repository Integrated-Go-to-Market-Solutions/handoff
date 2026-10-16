import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Search engines may crawl everything except the Tina editor and the
 * contact form's API (10/16 site audit). Vercel adds its own noindex header
 * to preview deployments, so only the live site gets indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
