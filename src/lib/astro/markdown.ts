import type { IFieldMap } from "@interfaces/field-map"
import fs from "fs"
import matter from "gray-matter"
import rehypePrism from "rehype-prism"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { getCanonicalSlug, getDateFromSlug } from "../urls"

export interface IMarkdownFields {
  index: number
  slug: string
  date: string
}

export interface IMarkdownBase {
  fields: IMarkdownFields
}

export async function markdownHtml(markdown: string) {
  //const result = await remark().use(html).use(prism).process(markdown)
  const result = await unified()
    .use(remarkParse)
    //.use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  return result.toString()
}

export function getFields(index: number, slug: string) {
  return {
    index,
    slug: getCanonicalSlug(slug),
    date: getDateFromSlug(slug),
  }
}

export const getFrontmatter = (path: string, items: IFieldMap) => {
  const fileContents = fs.readFileSync(path, "utf8")
  const { data, content, excerpt } = matter(fileContents, {
    excerpt: true,
    excerpt_separator: "<!-- end -->",
  })

  items["rawContent"] = content
  items["rawExcerpt"] = excerpt

  Object.assign(items, data)

  //console.log(items)

  // for (const [key, value] of Object.entries(data)) {
  //   switch (key) {
  //     case 'tags':
  //       items[key] = getTags(value)
  //       break
  //     // case 'authors':
  //     //   items[key] = getBaseTags(value)
  //     //   break
  //     default:
  //       items[key] = value
  //       break
  //   }
  // }

  // Ensure only the minimal needed data is exposed
  // fields.forEach(field => {
  //   //if (field === 'slug') {
  //   //  items[field] = realPath //realSlug
  //   //}

  //   if (field === 'content') {
  //     items[field] = content
  //   }

  //   if (field === 'excerpt') {
  //     items[field] = excerpt
  //   }

  //   if (typeof data[field] !== 'undefined') {
  //     items[field] = data[field]
  //   }
  // })

  return items
}
