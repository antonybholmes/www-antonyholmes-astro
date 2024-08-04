/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "Helvetica", "Arial"],
    },
    extend: { colors: { gray: colors.slate } },
  },
  plugins: [],
}
