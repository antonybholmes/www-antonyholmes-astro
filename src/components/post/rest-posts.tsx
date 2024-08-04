import type { IPostsProps } from "./hero-posts"
import { PreviewPost } from "./preview-post"

export default function RestPosts({ posts }: IPostsProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              showAvatarImage={false}
              className="border-t border-slate-200 pt-6"
              imageClassName="h-48"
              headerClassName="text-2xl"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
