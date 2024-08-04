import type { IPostProps } from "./post-tags"

interface IProps extends IPostProps {}

export default function BasePostImage({
  post,

  className,
}: IProps) {
  return (
    <img src={post.data.hero} alt={post.data.title} className={className} />
  )
}
