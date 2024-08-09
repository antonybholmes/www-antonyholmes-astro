import { PEOPLE_SLUG } from "@consts"
import { getUrlFriendlyTag } from "./urls"

export function getAuthorBaseUrl(name: string) {
  return `${PEOPLE_SLUG}/${getUrlFriendlyTag(name)}`
}
