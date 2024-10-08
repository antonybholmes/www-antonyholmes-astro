// post functions for use only in astro header for rendering pages, i.e. for
// functions that will not run within the browser. This is because we cannot
// load a lot of astros templates into the browser and they cause an overhead
// so we must firewall functions designed to deal interact in astro components
// (server like) vs those that are for the client.

import { BLOG_SLUG } from "@consts"
import type { IBaseFields } from "@interfaces/base-fields"
import type { IFieldMap } from "@interfaces/field-map"
import { getCollection, type CollectionEntry } from "astro:content"
import { range } from "lodash-es"
//import { join } from "path"
import { POSTS_DIR, REVIEWS_DIR } from "../post"
import {
  getSlug,
  getSlugBaseName,
  getSlugDir,
  getSlugSubPaths,
  getUrlFriendlyTag,
} from "../urls"
import { getAllMDFiles } from "./files"
import { getFields, getFrontmatter, type IMarkdownBase } from "./markdown"

export interface IPostFields extends IBaseFields {
  index: number
  title: string
  type: string
  description: string
  hero: string
  heroCaption: string
  authors: string[]
  categories: string[]
  related: string[]
  status: string
  tags: string[]
  pros: string[]
  cons: string[]
  details: string[]
  rating: number
}

export interface IBasePost extends IMarkdownBase {
  frontmatter: IPostFields
  //stats: IReadingStats
}

export function getPostPaths() {
  return getAllMDFiles(POSTS_DIR)
}

export function getReviewPaths() {
  return getAllMDFiles(REVIEWS_DIR)
}

export const getPostFrontmatter = (path: string): IPostFields => {
  const items: IPostFields = {
    id: "",
    index: -1,
    title: "",
    description: "",
    rawContent: "",
    rawExcerpt: "",
    hero: "",
    heroCaption: "",
    authors: [],
    categories: [],
    tags: [],
    type: "post",
    related: [],
    status: "draft",
    pros: [],
    cons: [],
    details: [],
    rating: 0,
  }

  getFrontmatter(path, items)

  return items
}

/**
 * Turns a slug into a file path and uses that to read
 * the post data.
 *
 * @param slug a post slug
 * @returns a post with basic frontmatter loaded.
 */
export function getPostBySlug(slug: string): IBasePost {
  return getPostByPath(`${POSTS_DIR}/${slug}.md`)
}

export function getPostByPath(path: string, index: number = -1): IBasePost {
  // const fullPath = join(
  //   isPublished ? POSTS_DIR : DRAFTS_DIR,
  //   `${slug}.md`
  // )

  const post = {
    fields: getFields(index, path),
    frontmatter: getPostFrontmatter(path),
  }

  // if (post.data.hero === "") {
  //   post.data.hero = `generic${(index % GENERIC_IMAGES) + 1}`
  // }

  return post
}

/**
 * Sort post in descending order by date added. If there is a date tie,
 * then order by title.
 * @param posts
 * @returns
 */
export function sortPostsByDateDesc(
  posts: CollectionEntry<"posts">[],
): CollectionEntry<"posts">[] {
  const ret = posts
    // .filter(post => {
    //   return (
    //     process.env.NODE_ENV === "development" ||
    //     post.data.status === "added"
    //   )
    // })
    // sort posts by date in descending order
    .sort((a, b) => {
      let d =
        (b.data.updated ?? b.data.added).valueOf() -
        (a.data.updated ?? a.data.added).valueOf()

      if (d !== 0) {
        return d
      }

      // dates equal so compare names
      return a.data.title.localeCompare(b.data.title)
    })

  return ret
}

export function getPostFirstSentence(post: CollectionEntry<"posts">) {
  const sentences = post.body.split("\n").filter(x => x.length > 0)

  if (sentences.length > 0) {
    return sentences[0]
  } else {
    return ""
  }
}

export async function getPublishedPosts(): Promise<CollectionEntry<"posts">[]> {
  return await getCollection("posts", ({ data }) => {
    return import.meta.env.DEV || data.draft !== true
  })
}

export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  return sortPostsByDateDesc(await getPublishedPosts())
}

export function getPostUrl(post: CollectionEntry<"posts">): string {
  return `${BLOG_SLUG}/${getSlug(post.id)}`
}

export function getPostSlugDir(post: CollectionEntry<"posts">): string {
  return getSlugDir(getSlug(post.id))
}

export function getPostSection(post: CollectionEntry<"posts">): string {
  return getSlugBaseName(post.id)
}

/**
 * Returns all path combinations from a post.id slug
 * @param post
 * @returns
 */
export function getPostSlugSubPaths(post: CollectionEntry<"posts">): string[] {
  return getSlugSubPaths(post.id)
}

export function getPostSectionMap(
  posts: CollectionEntry<"posts">[],
  max: number = -1,
): Map<string, CollectionEntry<"posts">[]> {
  const sectionMap = new Map<string, CollectionEntry<"posts">[]>()

  posts.forEach(post => {
    const sections = getPostSlugSubPaths(post)

    sections.forEach((section: string) => {
      if (!sectionMap.has(section)) {
        sectionMap.set(section, [])
      }

      if (max === -1 || sectionMap.get(section)!.length < max) {
        sectionMap.get(section)!.push(post)
      }
    })
    //})
  })

  return sectionMap
}

// export function getAllPosts(authorMap: IAuthorMap): IAuthorPost[] {
//   return sortPosts(
//     getPostPaths().map(path => getPostByPath(path)),
//     authorMap
//   )
// }

// export function getAllPosts(authorMap: IAuthorMap): IAuthorPost[] {
//   return sortPosts(
//     getPostPaths()
//       .map(path => getPostByPath(path))
//       .concat(getReviewPaths().map(path => getReviewByPath(path))),
//     authorMap
//   )
// }

// export function getAllPostsAndReviews(): IBasePost[] {
//   return getAllPosts().concat(getAllReviews())
// }

// export const allPostsBySlugMap = (
//   posts: { slug: string; fields: IFieldMap }[],
// ) => {
//   let ret: any = {}

//   posts.forEach(post => {
//     ret[post.slug] = post
//   })

//   return ret
// }

// export function getCategories(post: CollectionEntry<"posts">) {
//   const ret: IFieldMap = []

//   post.data.categories.forEach(category => {
//     let path = category.split("/").concat(["All"])

//     let pathMap: any = {}
//     ret.push(pathMap)

//     pathMap[path[0]] = {}
//     pathMap[path[0]]["All"] = {}

//     path.forEach(p => {
//       if (!(p in pathMap)) {
//         pathMap[p] = {}
//       }

//       pathMap = pathMap[p]
//     })
//   })

//   return ret
// }

// export function getCategoryPostMap(
//   posts: CollectionEntry<"blog">[],
//   max: number = -1
// ): IFieldMap {
//   const categoryMap: IFieldMap = {}

//   posts.forEach(post => {
//     post.data.categories.forEach((category: string) => {
//       const path = category.split("/")
//       const c = path[0]
//       const s = path.length > 1 ? path[1] : "All"

//       if (!(c in categoryMap)) {
//         categoryMap[c] = {}
//       }

//       if (!(s in categoryMap[c])) {
//         categoryMap[c][s] = []
//       }

//       if (!("All" in categoryMap[c])) {
//         categoryMap[c]["All"] = []
//       }

//       if (max === -1 || categoryMap[c][s].length < max) {
//         categoryMap[c][s].push(post)
//       }

//       if (s !== "All") {
//         // every post is added to all by default
//         if (max === -1 || categoryMap[c]["All"].length < max) {
//           categoryMap[c]["All"].push(post)
//         }
//       }
//     })
//   })

//   return categoryMap
//}

export function getTagPaths(tag: string): string[] {
  const parts = tag.split("/")

  const ret = range(0, parts.length).map(i =>
    parts
      .slice(0, i + 1)
      .map(p => getUrlFriendlyTag(p))
      .join("/"),
  )

  return ret
}

export function getTagPostMap(
  posts: CollectionEntry<"posts">[],
  max: number = -1,
): Map<string, CollectionEntry<"posts">[]> {
  const tagMap = new Map<string, CollectionEntry<"posts">[]>()

  posts.forEach(post => {
    post.data.tags.forEach((tag: string) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }

      if (max === -1 || tagMap.get(tag)!.length < max) {
        tagMap.get(tag)!.push(post)
      }
    })
    //})
  })

  return tagMap
}

export function getAuthorPostMap(
  posts: CollectionEntry<"posts">[],
  max: number = -1,
): IFieldMap {
  const tagMap: IFieldMap = {}

  posts.forEach(post => {
    post.data.authors.forEach((author: string) => {
      const a = getUrlFriendlyTag(author)

      if (!(a in tagMap)) {
        tagMap[a] = []
      }

      if (max === -1 || tagMap[a].length < max) {
        tagMap[a].push(post)
      }
    })
  })

  return tagMap
}
