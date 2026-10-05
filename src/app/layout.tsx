import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { serifFace, textFace } from "./fonts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";

// Rubik is the brand typeface. Weights match the guidelines: Light, Medium,
// SemiBold, Bold.
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const siteTitle = "Handoff | The Best of LATAM. AI Powered People. Here to Stay.";
const siteDescription =
  "We help the best US companies hire Latin America's top 1% talent — vetted, AI powered, and ready to make an impact from day one.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${rubik.variable} ${textFace.variable} ${serifFace.variable}`}>
      <body className="min-h-screen bg-ink pb-20 text-bone antialiased md:pb-0">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileCta />
      </body>
    </html>
  );
}
