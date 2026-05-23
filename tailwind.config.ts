import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#faf5f0",
          100: "#f5ebe0",
          200: "#e8d5bc",
          300: "#d9b896",
          400: "#c99570",
          500: "#b97a50",
          600: "#a06040",
          700: "#7d4a30",
          800: "#5a3520",
          900: "#3a2010",
          950: "#1e0e05",
        },
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in":        "fadeIn 0.5s ease-in-out",
        "slide-up":       "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.35s ease-out",
        "skeleton":       "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        slideInRight: {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        skeleton: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
