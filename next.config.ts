import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating Next.js dev badge in the corner during local dev.
  // Production never renders it; this just keeps preview screenshots clean.
  devIndicators: false,
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
};

export default nextConfig;
