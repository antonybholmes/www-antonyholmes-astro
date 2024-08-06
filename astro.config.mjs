import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

import remarkExcerpt from "remark-excerpt"

// https://astro.build/config
export default defineConfig({
  site: "https://antonyholmes.dev",
  compressHTML: true,
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkExcerpt],
  },
  integrations: [mdx(), sitemap(), tailwind(), react()],
})
