import { PrimaryColorLink } from "@components/link/primary-color-link"
import { cn } from "@lib/class-names"
import { getPostBaseUrl } from "@lib/urls"
import type { IPostProps } from "./post-tags"

export function PostTitleLink({ post, className }: IPostProps) {
  return (
    <h2 className={cn("font-bold capitalize", className)}>
      <PrimaryColorLink
        href={getPostBaseUrl(post.slug)}
        aria-label={post.data.title}
      >
        {post.data.title}
      </PrimaryColorLink>
    </h2>
  )
}
