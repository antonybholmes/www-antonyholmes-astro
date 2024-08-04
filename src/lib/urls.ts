import { TAG_SLUG } from "@consts"
import { capitalize } from "lodash-es"

export function getUrlFriendlyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll(/[\ \-]+/g, "-")
}

export function getUrlFriendlyImg(
  img: string,
  ext = "webp",
  size: number | [number, number] = 1024,
): string {
  if (!Array.isArray(size)) {
    size = [size, size]
  }

  return `${getUrlFriendlyTag(img)}-${size[0]}x${size[1]}.${ext}`
}

export function getUrlFriendlyTags(tags: string[]): string[] {
  return tags.map(tag => getUrlFriendlyTag(tag))
}

export function getFormattedTag(tag: string) {
  return tag
    .trim()
    .replaceAll("-", " ")
    .replaceAll(" and ", " & ")
    .split(" ")
    .map(tag => capitalize(tag))
    .join(" ")
}

export const getTagBaseUrl = (tag: string) => {
  return `${TAG_SLUG}/${getUrlFriendlyTag(tag)}`
}

export function getCanonicalSlug(path: string): string {
  return getUrlFriendlyTag(
    path.replace(/\.md$/, "").replaceAll("\\", "/").replace(/^.+\//, ""),
  )
}

export function getDateFromSlug(slug: string): string {
  const match = slug.match(/(\d{4})-(\d{2})-(\d{2})/)
  return match ? match.slice(1, 4).join("-") : "2022-01-01"
}
