import { cn } from "@lib/class-names"
import type { IPostProps } from "./post-tags"

interface IProps extends IPostProps {
  imgClassName?: string
}

export function BasePostImage({ post, imgClassName, className }: IProps) {
  return (
    <div
      className={cn("overflow-hidden z-10 border border-red-500", className)}
    >
      <img
        src={post.data.hero}
        alt={post.data.title}
        className={cn("scale-102 hover:scale-103 z-0 trans-all", imgClassName)}
      />
    </div>
  )
}
