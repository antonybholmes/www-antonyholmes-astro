import { RECORDS_PER_PAGE } from "@consts"
import type IFieldMap from "@interfaces/field-map"
import { range } from "lodash-es"

export function paginate(
  data: any[],
  slug: string = "",
  globalProps: IFieldMap = {},
): { props: any; params: any }[] {
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
    const currentPage = page + 1

    paths.push({
      params: {
        slug: `${slug}${currentPage}`,
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
  return Math.floor((items.length + pageSize - 1) / pageSize)
}

export function getPageItems(
  items: any[],
  page: number = 0,
  pageSize: number = RECORDS_PER_PAGE,
): any[] {
  const start = page * pageSize
  return items.slice(start, start + pageSize)
}
