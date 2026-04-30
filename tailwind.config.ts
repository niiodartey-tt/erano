import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:         "#1a2540",
          ink:          "#0a0f1e",
          blue:         "#7D92B2",
          "blue-dark":  "#5a7096",
          "blue-light": "#a8bcd0",
          "blue-xl":    "#dde7f3",
          gold:         "#c9a84c",
          "gold-light": "#e8d5a3",
          grey:         "#83878C",
          cloud:        "#DDE1EC",
          charcoal:     "#5C6167",
        },
        primary:   "#7D92B2",
        secondary: "#83878C",
        accent:    "#DDE1EC",
        dark:      "#1a2540",
        gold:      "#c9a84c",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem,5vw,4.5rem)",  { lineHeight:"1.05", letterSpacing:"-0.02em"  }],
        "display-lg": ["clamp(2rem,4vw,3.25rem)",   { lineHeight:"1.1",  letterSpacing:"-0.015em" }],
        "display-md": ["clamp(1.5rem,3vw,2.25rem)", { lineHeight:"1.15", letterSpacing:"-0.01em"  }],
        "ui-xs":      ["0.625rem", { lineHeight:"1",   letterSpacing:"0.1em" }],
        "ui-sm":      ["0.75rem",  { lineHeight:"1.4" }],
        "ui-base":    ["0.875rem", { lineHeight:"1.5" }],
        "ui-lg":      ["1rem",     { lineHeight:"1.6" }],
      },
      spacing: {
        "18":"4.5rem","22":"5.5rem","88":"22rem","128":"32rem",
      },
      borderRadius: {
        "xl":"0.75rem","2xl":"1rem","3xl":"1.5rem",
      },
      boxShadow: {
        "card":       "0 1px 3px rgba(26,37,64,0.08), 0 4px 16px rgba(26,37,64,0.06)",
        "card-hover": "0 4px 12px rgba(26,37,64,0.12), 0 12px 32px rgba(26,37,64,0.10)",
        "blue":       "0 4px 24px rgba(125,146,178,0.25)",
        "gold":       "0 4px 24px rgba(201,168,76,0.30)",
        "navy":       "0 8px 40px rgba(26,37,64,0.40)",
      },
      backgroundImage: {
        "hero-gradient":  "linear-gradient(135deg,#f0f4f9 0%,#e8eef6 50%,#dde5f0 100%)",
        "hero-dark":      "linear-gradient(135deg,#0a0f1e 0%,#1a2540 100%)",
        "navy-gradient":  "linear-gradient(180deg,#1a2540 0%,#0a0f1e 100%)",
        "gold-gradient":  "linear-gradient(135deg,#c9a84c 0%,#e8d5a3 100%)",
        "overlay-dark":   "linear-gradient(to right,rgba(10,15,30,0.92) 0%,rgba(26,37,64,0.75) 60%,rgba(26,37,64,0.2) 100%)",
        "overlay-bottom": "linear-gradient(to top,rgba(10,15,30,0.8) 0%,transparent 60%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-right":"slideRight 0.3s ease forwards",
        "pulse-ring": "pulseRing 2.5s ease-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp:     { "0%":{ opacity:"0", transform:"translateY(24px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        fadeIn:     { "0%":{ opacity:"0" }, "100%":{ opacity:"1" } },
        slideRight: { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(4px)" } },
        pulseRing:  { "0%":{ transform:"scale(1)", opacity:"0.8" }, "100%":{ transform:"scale(1.8)", opacity:"0" } },
        shimmer:    { "0%":{ backgroundPosition:"-200% center" }, "100%":{ backgroundPosition:"200% center" } },
      },
    },
  },
  plugins: [],
};

export default config;
