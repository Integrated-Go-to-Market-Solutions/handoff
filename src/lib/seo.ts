import type { Metadata } from "next";

/**
 * Search and link-preview tags (10/16 site audit). The live site is
 * www.talenthandoff.com; set NEXT_PUBLIC_SITE_URL to point canonical links
 * and previews somewhere else. Preview deployments keep pointing at the live
 * site on purpose, so search engines only ever see one address per page.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.talenthandoff.com").replace(/\/$/, "");
export const SITE_NAME = "Handoff";

/** The link-preview image for every page: the hero headline on the dark brand background. */
export const SHARE_IMAGE = {
  url: "/images/share/handoff.png",
  width: 1200,
  height: 630,
  alt: "Handoff: Hire the best of LATAM. AI Powered People. Here to Stay.",
};

/**
 * A page's title, description, canonical link and matching OpenGraph and
 * Twitter tags, with the share image. `path` is the page's own address,
 * like "/pricing".
 */
export function pageMetadata(path: string, title: string, description?: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_US", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
  };
}

/** A JSON-LD script body, with "<" escaped as Next's docs recommend. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
