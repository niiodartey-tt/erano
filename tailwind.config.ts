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
        ink:     "#080c14",
        navy:    "#0d1b2e",
        slate:   "#1e3a5f",
        gold:    "#c4973a",
        "gold-light": "#ddb96a",
        "gold-dark":  "#a07828",
        line:    "#e2e5ea",
        off:     "#f5f6f8",
        body:    "#4a5568",
        heading: "#0d1b2e",
      },
      fontFamily: {
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display":    ["clamp(3.5rem,7vw,6rem)",   { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-md": ["clamp(2.5rem,5vw,3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "section":    ["clamp(2rem,3.5vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "sub":        ["clamp(1.25rem,2vw,1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg":    ["1.125rem", { lineHeight: "1.8" }],
        "body":       ["1rem",     { lineHeight: "1.8" }],
        "body-sm":    ["0.9375rem", { lineHeight: "1.7" }],
        "ui":         ["0.9375rem", { lineHeight: "1.5", fontWeight: "500" }],
        "ui-sm":      ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
        "eyebrow":    ["0.6875rem", { lineHeight: "1", letterSpacing: "0.2em", fontWeight: "600" }],
      },
      maxWidth: {
        "site": "1440px",
      },
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "section": "7.5rem",
      },
      boxShadow: {
        "nav":    "0 1px 0 rgba(0,0,0,0.08)",
        "subtle": "0 2px 8px rgba(13,27,46,0.06), 0 8px 24px rgba(13,27,46,0.04)",
        "lift":   "0 8px 24px rgba(13,27,46,0.10), 0 24px 48px rgba(13,27,46,0.08)",
        "gold":   "0 4px 20px rgba(196,151,58,0.20)",
      },
      animation: {
        "ticker":     "ticker 30s linear infinite",
        "fade-up":    "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "pulse-ring": "pulseRing 2.5s ease-out infinite",
        "ken-burns":  "kenBurns 10s ease-in-out infinite alternate",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseRing: {
          "0%":   { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        kenBurns: {
          "0%":   { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.08) translate(-1.5%,-1%)" },
        },
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;