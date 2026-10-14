import localFont from "next/font/local";

/**
 * Rubik is the brand typeface. Weights match the guidelines: Light, Medium,
 * SemiBold, Bold. Files are the latin subset, committed so production builds
 * do not download Google Fonts.
 */
export const rubik = localFont({
  src: [
    { path: "../fonts/rubik-latin-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/rubik-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/rubik-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/rubik-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-rubik",
  display: "swap",
});

/**
 * The text face for text-heavy content, used through the `font-text`
 * utility (see `--font-text` in globals.css).
 *
 * STAND-IN: the brand calls for Gotham, but no Gotham files are in the
 * project and it's a paid font that needs a licence. Montserrat is the
 * closest free match. To switch to Gotham, replace this one call with
 * `localFont({ src: [...the licensed files...], variable: "--font-text-face" })`.
 * Nothing else needs to change.
 */
export const textFace = localFont({
  src: [
    { path: "../fonts/montserrat-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-text-face",
  display: "swap",
});

/**
 * Classic serif for the Alma dictionary entry only (the headword and the
 * "[al·ma] • noun" line), via the `font-serif` utility.
 */
export const serifFace = localFont({
  src: [
    { path: "../fonts/dm-serif-display-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-serif-display-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif-face",
  display: "swap",
});
