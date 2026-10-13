import { DM_Serif_Display, Montserrat } from "next/font/google";

/**
 * The text face for text-heavy content, used through the `font-text`
 * utility (see `--font-text` in globals.css).
 *
 * STAND-IN: the brand calls for Gotham, but no Gotham files are in the
 * project and it's a paid font that needs a licence. Montserrat is the
 * closest free match. To switch to Gotham, replace this one call with
 * `localFont({ src: [...the licensed files...], variable: "--font-text-face" })`
 * from "next/font/local". Nothing else needs to change.
 */
export const textFace = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text-face",
  display: "swap",
});

/**
 * Classic serif for the Alma dictionary entry only (the headword and the
 * "[al·ma] • noun" line), via the `font-serif` utility.
 */
export const serifFace = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-face",
  display: "swap",
});
