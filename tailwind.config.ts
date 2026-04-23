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
          blue:        "#7D92B2",
          "blue-dark": "#5a7096",
          "blue-light":"#a8bcd0",
          "blue-xl":   "#dde7f3",
          grey:        "#83878C",
          cloud:       "#DDE1EC",
          charcoal:    "#5C6167",
        },
        primary:   "#7D92B2",
        secondary: "#83878C",
        accent:    "#DDE1EC",
        dark:      "#5C6167",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem,5vw,4rem)",    { lineHeight:"1.1",  letterSpacing:"-0.02em"  }],
        "display-lg": ["clamp(2rem,4vw,3rem)",       { lineHeight:"1.15", letterSpacing:"-0.015em" }],
        "display-md": ["clamp(1.5rem,3vw,2.25rem)",  { lineHeight:"1.2",  letterSpacing:"-0.01em"  }],
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
        "card":      "0 1px 3px rgba(92,97,103,0.08), 0 4px 16px rgba(92,97,103,0.06)",
        "card-hover":"0 4px 12px rgba(92,97,103,0.12), 0 12px 32px rgba(92,97,103,0.10)",
        "blue":      "0 4px 24px rgba(125,146,178,0.25)",
      },
      backgroundImage: {
        "hero-gradient":"linear-gradient(135deg,#f0f4f9 0%,#e8eef6 50%,#dde5f0 100%)",
        "hero-dark":    "linear-gradient(135deg,#1a1d27 0%,#0f1117 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-right":"slideRight 0.3s ease forwards",
      },
      keyframes: {
        fadeUp:     { "0%":{ opacity:"0", transform:"translateY(20px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        fadeIn:     { "0%":{ opacity:"0" }, "100%":{ opacity:"1" } },
        slideRight: { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(4px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
