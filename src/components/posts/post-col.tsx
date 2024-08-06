import { BaseCol } from "@components/base-col"
import type { IPostsProps } from "./hero-posts"

import { VCenterRow } from "@components/v-center-row"
import { H2_CLS } from "@theme"
import { HeroPostSmall } from "./hero-post-small"

interface IProps extends IPostsProps {
  maxPosts?: number
}

export function PostCol({ title, posts, maxPosts = 3, children }: IProps) {
  return (
    <section className="flex flex-col gap-y-8">
      <VCenterRow className="border-t-4 border-b border-foreground py-3 justify-between">
        <h2 className={H2_CLS}>{title}</h2>
        <VCenterRow>{children && children}</VCenterRow>
      </VCenterRow>

      <BaseCol className="gap-y-8">
        {posts.slice(0, maxPosts).map((post, index) => {
          return <HeroPostSmall post={post} key={index} />
        })}
      </BaseCol>
    </section>
  )
}
