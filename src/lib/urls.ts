import { PEOPLE_SLUG } from "@consts"
import { capitalize } from "lodash-es"

export function getUrlFriendlyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll("-", "--")
    .replaceAll(" ", "-")
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

export function getAuthorBaseUrl(name: string) {
  return `${PEOPLE_SLUG}/${getUrlFriendlyTag(name)}`
}
