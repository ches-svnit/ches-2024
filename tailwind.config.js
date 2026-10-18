/** @type {import('tailwindcss').Config}
 *
 */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Same token names as before, so every existing class
      // (bg-secondary-800, text-primary-200, text-accent-400 ...) now
      // renders in blue + yellow instead of purple + green.
      colors: {
        // Near-white text with only a faint blue tint
        text: {
          50: "#fafbfd",
          100: "#f2f4fa",
          200: "#e4e8f3",
          300: "#cbd2e6",
          400: "#a7b2d3",
          500: "#7c8bb9",
          600: "#5a6a9a",
          700: "#3e4b77",
          800: "#273152",
          900: "#151c33",
          950: "#0a0e1d",
        },
        // Navy page backgrounds (950 = #0a1129, the sampled navy)
        background: {
          50: "#f8f9fc",
          100: "#eff2f9",
          200: "#dfe4f1",
          300: "#c3cce4",
          400: "#94a3cd",
          500: "#6376ae",
          600: "#435490",
          700: "#2b3a6b",
          800: "#18244b",
          900: "#0f1838",
          950: "#0a1129",
        },
        // Main blue: whitish tints at the light end, richer blue in the middle
        primary: {
          50: "#f7f9fe",
          100: "#eef2fc",
          200: "#dde5f8",
          300: "#b8c8f0",
          400: "#849fe4",
          500: "#5578d6",
          600: "#3b5bb8",
          700: "#2b4390",
          800: "#1b2c63",
          900: "#101a3d",
          950: "#0a1129",
        },
        // Navy for cards / navbar surfaces (same family as background)
        secondary: {
          50: "#f8f9fc",
          100: "#eff2f9",
          200: "#dfe4f1",
          300: "#c3cce4",
          400: "#94a3cd",
          500: "#6376ae",
          600: "#435490",
          700: "#2b3a6b",
          800: "#18244b",
          900: "#0f1838",
          950: "#0a1129",
        },
        // Yellow accent (underlines, active link, highlights)
        accent: {
          50: "#fff9e0",
          100: "#fff1b8",
          200: "#ffe680",
          300: "#ffdb4d",
          400: "#ffd11f",
          500: "#f5c400",
          600: "#c79c00",
          700: "#947500",
          800: "#614d00",
          900: "#2e2400",
          950: "#171200",
        },
      },

      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem",
      },
      fontFamily: {
        heading: "var(--font-poppins)",
        body: "var(--font-commissioner)",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      backgroundImage: {
        heroBg: "url('/assets/herobg.png')",
        "heroBg-mobile1": "url('/assets/herobgMobile1.png')",
        "heroBg-mobile2": "url('/assets/herobgMobile2.png')",
        alumini: "url('/assets/TimelineWebsite.webp')",
        aluminiMobile: "url('/assets/TimelineMobile.webp')",
      },
    },
  },
  plugins: [],
});