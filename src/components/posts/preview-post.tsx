import { cn } from "@lib/class-names"
import type { IPostProps } from "./post-tags"

import { BaseCol } from "@components/base-col"
import { FormattedDate } from "@components/formatted-date"
import { CompactAvatars } from "@components/people/compact-avatars"
import { VCenterRow } from "@components/v-center-row"
import { getPostFirstSentence } from "@lib/post"
import { PostImage } from "./post-image"
import { PostTitleLink } from "./post-title-link"

interface IProps extends IPostProps {
  imgClassName?: string
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
  imgClassName = "rounded-lg",
  headerClassName = "text-2xl md:text-3xl",
  innerClassName,
  contentClassName = "text-base",

  showDescription = true,
  showAvatar = true,
  showAvatarImage = true,
  dateBelow = false,
}: IProps) {
  const date = post.data.added

  //{post.data.description}

  return (
    <article className={cn("flex flex-col gap-y-4", className)}>
      <PostImage post={post} className={imgClassName} />

      <BaseCol className={cn("gap-y-2", innerClassName)}>
        <BaseCol>
          {/* {showSection && <PostCategoryLink post={post} />} */}
          <PostTitleLink post={post} className={headerClassName} />
        </BaseCol>
        {showDescription && (
          <p
            className={cn("text-gray-500 dark:text-gray-400", contentClassName)}
          >
            {getPostFirstSentence(post)}
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
          <VCenterRow className="gap-x-2">
            {showAvatar && (
              <CompactAvatars
                people={post.data.authors}
                showImages={showAvatarImage}
              />
            )}
            <span className="rounded-full w-1 h-1 aspect-square shrink-0 grow-0 bg-gray-400" />
            <FormattedDate date={date} />
          </VCenterRow>
        )}
      </BaseCol>
    </article>
  )
}
