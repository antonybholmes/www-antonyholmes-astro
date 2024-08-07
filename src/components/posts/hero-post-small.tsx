import { cn } from "@lib/class-names"
import type { IPostProps } from "./post-tags"

import { BaseCol } from "@components/base-col"

import { FormattedDate } from "@components/formatted-date"
import { CompactAvatars } from "@components/people/compact-avatars"
import { VCenterRow } from "@components/v-center-row"
import { getPostFirstSentence } from "@lib/post"
import { PostImage } from "./post-image"
import { PostSectionLink } from "./post-section-link"
import { PostTitleLink } from "./post-title-link"

interface IProps extends IPostProps {
  showAvatar?: boolean
  showDescription?: boolean
}

export function HeroPostSmall({
  post,
  showAvatar = true,
  showDescription = true,
  className,
}: IProps) {
  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-y-2 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5 xl:grid-cols-3",
        className,
      )}
    >
      <div className="col-span-1">
        <PostImage post={post} className="h-48 w-full md:h-32 rounded-md" />
      </div>
      <BaseCol className="col-span-3 gap-y-1 lg:col-span-3 xl:col-span-2">
        <BaseCol>
          <PostSectionLink post={post} textSize="text-xl md:text-base" />
          <PostTitleLink post={post} className="text-2xl lg:text-lg" />
        </BaseCol>
        {/* <CondComp cond={showDescription}>
          <HTML html={post.excerpt} className="text-sm text-gray-600" />
        </CondComp> */}

        {showDescription && (
          <p className="text-gray-500 dark:text-gray-400">
            {getPostFirstSentence(post)}
          </p>
        )}

        <VCenterRow className="gap-x-2 mt-1">
          {showAvatar && (
            <CompactAvatars people={post.data.authors} showImages={false} />
          )}
          <span className="rounded-full w-1 h-1 aspect-square shrink-0 grow-0 bg-gray-400" />
          <FormattedDate date={post.data.added} />
        </VCenterRow>
      </BaseCol>
    </article>
  )
}
