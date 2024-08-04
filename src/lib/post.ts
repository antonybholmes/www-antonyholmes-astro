import type { IBaseFields } from "@interfaces/base-fields"
import type { IFieldMap } from "@interfaces/field-map"
import type { CollectionEntry } from "astro:content"
import { join } from "path"
import { getAllMDFiles } from "./files"
import { getFields, getFrontmatter, type IMarkdownBase } from "./markdown"
import { getUrlFriendlyTag } from "./urls"

export const POSTS_DIR = join(process.cwd(), "src/content/posts")
export const REVIEWS_DIR = join(process.cwd(), "src/content/review")

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
  return getPostByPath(join(POSTS_DIR, `${slug}.md`))
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

export function sortPosts(
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
    .sort((post1, post2) => {
      const d1 = post1.data.added
      const d2 = post1.data.added
      if (d1 > d2) {
        return -1
      } else if (d1 < d2) {
        return 1
      } else {
        // dates equal so compare names
        return post1.data.title.localeCompare(post2.data.title)
      }
    })

  return ret
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

export const allPostsBySlugMap = (
  posts: { slug: string; fields: IFieldMap }[],
) => {
  let ret: any = {}

  posts.forEach(post => {
    ret[post.slug] = post
  })

  return ret
}

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

export function getTagPostMap(
  posts: CollectionEntry<"posts">[],
  max: number = -1,
): Map<string, CollectionEntry<"posts">[]> {
  const tagMap = new Map<string, CollectionEntry<"posts">[]>()

  posts.forEach(post => {
    post.data.tags.forEach((tag: string) => {
      // Add the tag as is
      // if (!(tag in tagMap)) {
      //   tagMap[tag] = []
      // }

      // if (max === -1 || tagMap[tag].length < max) {
      //   tagMap[tag].push(post)
      // }

      // add a url friendly version to make it easier
      // to find tags
      //const t = getUrlFriendlyTag(tag)

      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }

      if (max === -1 || tagMap.get(tag)!.length < max) {
        tagMap.get(tag)!.push(post)
      }
    })
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
