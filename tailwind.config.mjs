/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "Helvetica", "Arial"],
    },
    extend: {
      colors: {
        gray: colors.slate,
        theme: colors.blue,
        border: "rgb(var(--border) / <alpha-value>)",
        "light-border": "rgb(var(--light-border) / <alpha-value>)",
        "dark-border": "rgb(var(--dark-border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        "primary-color": {
          DEFAULT: "rgb(var(--primary-color) / <alpha-value>)",
          hover: "rgb(var(--primary-color-hover) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        shortcuts: {
          DEFAULT: "rgb(var(--shortcuts) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          //foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        overlay: {
          DEFAULT: "rgb(var(--overlay) / <alpha-value>)",
        },
      },
      scale: {
        103: "1.03",
        104: "1.04",
      },
      spacing: {
        "2px": "2px",
        1.2: "0.3rem",
        1.4: "0.35rem",
        2.5: "0.625rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        8.5: "2.125rem",
        9: "2.25rem",
        9.5: "2.375rem",
        15: "3.75rem",
        100: "25rem",
        120: "30rem",
        128: "32rem",
        256: "64rem",
      },
      strokeWidth: {
        3: "3px",
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
        110: 110,
        overlay: 200,
        modal: 300,
        alert: 400,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
