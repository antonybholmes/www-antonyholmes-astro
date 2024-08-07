import { BaseLink } from "@components/link/base-link"
import { BLOG_SLUG } from "@consts"
import { cn } from "@lib/class-names"
import { formatSection, getPostSection, getPostSlugDir } from "@lib/post"
import type { IPostProps } from "./post-tags"
import { VCenterRow } from "@components/v-center-row"

interface IProps extends IPostProps {
  textSize?: string
 
}

export function PostSectionLink({
  post,
  textSize = "text-2xl md:text-lg",
 
  className,
}: IProps) {
 
  const section = formatSection(getPostSection(post))

  return (
    <VCenterRow>
    <BaseLink
      href={`${BLOG_SLUG}/${getPostSlugDir(post)}`}
      aria-label={`Read more ${section} posts`}
      title={`Read more ${section} posts`}
 
      className={cn(
        "block bg-gradient-to-r from-purple-500 to-rose-600 bg-clip-text font-semibold text-transparent",
        textSize,
        className,
      )}
    >
      {section}
    </BaseLink></VCenterRow>
  )
}
