import { cn } from "@lib/class-names"
import type { IPostProps } from "./post-tags"

import { BaseCol } from "@components/base-col"
import { FormattedDate } from "@components/formatted-date"
import { CompactAvatars } from "@components/people/compact-avatars"
import { VCenterRow } from "@components/v-center-row"
import { PostImage } from "./post-image"
import { PostTitleLink } from "./post-title-link"

interface IProps extends IPostProps {
  imageClassName?: string
  headerClassName?: string
  innerClassName?: string
  contentClassName?: string
  showSection?: boolean
  showDescription?: boolean
  showAvatar?: boolean
  showAvatarImage?: boolean
  dateBelow?: boolean
}

export function PreviewPost({
  post,
  className,
  imageClassName,
  headerClassName = "text-2xl md:text-4xl",
  innerClassName,
  contentClassName = "text-base",
  showSection = true,
  showDescription = true,
  showAvatar = true,
  showAvatarImage = true,
  dateBelow = false,
}: IProps) {
  const date = post.data.added

  return (
    <article className={cn("flex flex-col gap-y-4", className)}>
      <PostImage post={post} className={imageClassName} />

      <BaseCol className={cn("gap-y-2", innerClassName)}>
        <BaseCol>
          {/* {showSection && <PostCategoryLink post={post} />} */}
          <PostTitleLink post={post} className={headerClassName} />
        </BaseCol>
        {showDescription && (
          <p
            className={cn(
              "text-slate-600 dark:text-slate-400",
              contentClassName,
            )}
          >
            {post.data.description}
          </p>
        )}

        {dateBelow ? (
          <>
            {showAvatar && (
              <CompactAvatars
                people={post.data.authors}
                showImages={showAvatarImage}
              />
            )}

            <FormattedDate date={date} />
          </>
        ) : (
          <VCenterRow className="justify-between">
            {showAvatar && (
              <CompactAvatars
                people={post.data.authors}
                showImages={showAvatarImage}
              />
            )}

            <FormattedDate date={date} />
          </VCenterRow>
        )}
      </BaseCol>
    </article>
  )
}
