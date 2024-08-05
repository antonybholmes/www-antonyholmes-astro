import rss from "@astrojs/rss"
import { getSlug } from "@lib/urls"

import { getSortedPosts } from "@lib/post"
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts"

export async function GET(context) {
  const posts = await getSortedPosts()

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({
      ...post.data,
      pubDate: post.data.added,
      link: `/blog/${getSlug(post.id)}/`,
    })),
  })
}
