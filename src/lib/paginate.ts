import { RECORDS_PER_PAGE } from "@consts"
import { type IFieldMap } from "@interfaces/field-map"
import { range } from "lodash-es"

export type AstroPage = { props: any; params: any }

export function paginate(
  data: any[],
  slug: string = "",
  globalProps: IFieldMap = {},
): AstroPage[] {
  const paths = []

  const pages = getPageCount(data)

  // add slash to end of slug
  if (slug.endsWith("/")) {
    slug = slug.slice(0, slug.length - 2)
  }

  if (slug !== "") {
    paths.push({
      params: {
        slug,
      },
      props: {
        page: 0,
        pages,
        data: getPageItems(data, 0),
        ...globalProps,
      },
    })
  }

  // add page to slug since we are going to generate an array of
  // slugs one for each page of results
  if (slug !== "") {
    slug = `${slug}/page/`
  }

  range(0, pages).forEach((page: number) => {
    paths.push({
      params: {
        slug: `${slug}${page + 1}`,
      },
      props: {
        page,
        pages,
        data: getPageItems(data, page),
        ...globalProps,
      },
    })
  })

  return paths
}

export function getPageCount(
  items: any[],
  pageSize: number = RECORDS_PER_PAGE,
): number {
  return Math.floor((items.length - 1) / pageSize) + 1
}

export function getPageItems(
  items: any[],
  page: number = 0,
  pageSize: number = RECORDS_PER_PAGE,
): any[] {
  const start = page * pageSize
  return items.slice(start, start + pageSize)
}
