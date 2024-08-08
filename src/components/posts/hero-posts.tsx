import type { IElementProps } from "@interfaces/element-props"

 
import { cn } from "@lib/class-names"

import type { IFieldMap } from "@interfaces/field-map"
import { HeroPostSmall } from "./hero-post-small"
import { PreviewPost } from "./preview-post"
 
export interface IPostsProps extends IElementProps {
  posts: any[]
  page: number
  pages: number
  showLatestPosts?: boolean
  sectionMap?: IFieldMap
  root?: string
}

export function HeroPosts({ posts }: IPostsProps) {
  const topPost = posts[0]
  const topPosts = posts.slice(1, 4)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-12">
      <PreviewPost post={topPost} />

      <ul className="flex w-full flex-col gap-y-4  ">
        {topPosts.map((post, index) => {
          return (
            <li key={index}>
              <HeroPostSmall
                post={post}
                className={cn([
                  index > 0,
                  "border-t border-border  pt-6 dark:border-white/10",
                ])}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
