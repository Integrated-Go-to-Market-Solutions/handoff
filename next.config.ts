import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating Next.js dev badge in the corner during local dev.
  // Production never renders it; this just keeps preview screenshots clean.
  devIndicators: false,
  images: {
    // AVIF first (about 20% smaller than WebP), WebP next; browsers that take
    // neither get the original file (10/20, Corporate Relocation hero).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        pathname: "/**",
      },
    ],
  },
  // "Hospitality" became "Corporate housing" on 10/5; keep old links working.
  async redirects() {
    return [
      {
        source: "/industries/hospitality",
        destination: "/industries/corporate-housing",
        permanent: true,
      },
      // The roles hub moved to /roles on 10/5 (Anthony's department list).
      { source: "/talent", destination: "/roles", permanent: true },
      // Services is a menu label, not a page; a typed /services lands on the
      // first service (Tom, 10/6).
      { source: "/services", destination: "/services/direct-hire", permanent: false },
    ];
  },
  // Baseline security headers on every response (10/16 site audit). The
  // Content-Security-Policy only stops other sites from framing this one; a
  // full script/style policy would need allowances for the Tina editor, the
  // Cal.com embed, tracking and the videos, so it's left for later.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
