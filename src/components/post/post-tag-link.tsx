import { BaseLink } from "@components/link/base-link"
import { getTagBaseUrl } from "@lib/urls"

interface IProps {
  tag: string
}

export function PostTagLink({ tag }: IProps) {
  return (
    <BaseLink
      href={getTagBaseUrl(tag)}
      aria-label={`View posts related to ${tag}`}
      data-underline={true}
      className="border border-gray-600 px-3 py-1 rounded-full hover:text-blue-500 trans-color data-[underline=true]:hover:decoration-blue-500 trans-color"
    >
      {tag}
    </BaseLink>
  )
}
