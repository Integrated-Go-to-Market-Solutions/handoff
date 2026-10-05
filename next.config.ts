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
    ];
  },
};

export default nextConfig;
