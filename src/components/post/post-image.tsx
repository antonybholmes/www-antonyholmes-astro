import { BaseLink } from "@components/link/base-link"
import { getPostBaseUrl } from "@lib/urls"
import { BasePostImage } from "./base-post-image"
import type { IPostProps } from "./post-tags"

interface IProps extends IPostProps {}

export function PostImage({ post, className }: IProps) {
  const image = <BasePostImage post={post} className="rounded-xl" />

  if (post.slug) {
    return (
      <BaseLink href={getPostBaseUrl(post.slug)} aria-label={post.data.title}>
        {image}
      </BaseLink>
    )
  } else {
    return image
  }
}
