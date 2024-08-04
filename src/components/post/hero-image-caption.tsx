import { cn } from "@lib/class-names"
import type { IPostProps } from "./post-tags"

export default function HeroImageCaption({ post, className }: IPostProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 w-full py-3 text-center text-xs text-white bg-black/50",
        className,
      )}
    >
      {post.data.heroCaption}
    </div>
  )
}
