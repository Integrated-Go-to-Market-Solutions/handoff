import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { serifFace, textFace } from "./fonts";
import { SiteShell } from "@/components/tina/content";
import { loadSite, loadChrome } from "@/lib/tina/load";

// Rubik is the brand typeface. Weights match the guidelines: Light, Medium,
// SemiBold, Bold.
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadSite();
  const seo = (result.data.site as { seo: { title: string; description: string } }).seo;
  return {
    title: seo.title,
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description, type: "website" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const payload = await loadChrome();
  return (
    <html lang="en" className={`${rubik.variable} ${textFace.variable} ${serifFace.variable}`}>
      <body className="min-h-screen bg-ink pb-20 text-bone antialiased md:pb-0">
        {/* Keyboard users can jump past the menu (UX QA, 10/6). Hidden until
            it gets keyboard focus. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-cyan focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <SiteShell payload={payload}>
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </SiteShell>
      </body>
    </html>
  );
}
