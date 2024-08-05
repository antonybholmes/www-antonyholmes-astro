import { TAG_SLUG } from "@consts"

export const PATH_SEP = "/"

export function getUrlFriendlyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll(/[\ \-]+/g, "-")
}

export function getUrlFriendlyImg(
  img: string,
  ext = "avif",
  size: number | [number, number] = 800,
): string {
  if (!Array.isArray(size)) {
    size = [size, size]
  }

  return `${getUrlFriendlyTag(img)}-${size[0]}x${size[1]}.${ext}`
}

export function getUrlFriendlyTags(tags: string[]): string[] {
  return tags.map(tag => getUrlFriendlyTag(tag))
}

// export function getFormattedTag(tag: string) {
//   return tag
//     .trim()
//     .replaceAll("-", " ")
//     .replaceAll(" and ", " & ")
//     .split(" ")
//     .map(tag => capitalize(tag))
//     .join(" ")
// }

export const getTagBaseUrl = (tag: string) => {
  return `${TAG_SLUG}/${getUrlFriendlyTag(tag)}`
}

export function getSlug(path: string): string {
  return path
    .replace(/\.md$/, "")
    .replaceAll("\\", PATH_SEP)
    .split(PATH_SEP)
    .map(p => getUrlFriendlyTag(p))
    .join(PATH_SEP)
}

export function getSlugDir(path: string): string {
  // remove last entry to get the dir part of the name
  return getSlug(path).split(PATH_SEP).slice(0, -1).join(PATH_SEP)
}

export function getCanonicalSlug(path: string): string {
  return getSlug(path).replace(/^.+\//, "")
}

export function getDateFromSlug(slug: string): string {
  const match = slug.match(/(\d{4})-(\d{2})-(\d{2})/)
  return match ? match.slice(1, 4).join("-") : "2022-01-01"
}
