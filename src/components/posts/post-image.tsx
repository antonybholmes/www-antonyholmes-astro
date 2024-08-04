import { BaseLink } from "@components/link/base-link"

import { getPostUrl } from "@lib/post"
import { BasePostImage } from "./base-post-image"
import type { IPostProps } from "./post-tags"

interface IProps extends IPostProps {}

export function PostImage({ post }: IProps) {
  const image = <BasePostImage post={post} className="rounded-xl" />

  if (post.slug) {
    return (
      <BaseLink href={getPostUrl(post)} aria-label={post.data.title}>
        {image}
      </BaseLink>
    )
  } else {
    return image
  }
}
