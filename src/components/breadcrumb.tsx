import { type IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import type { ReactNode } from "react"

import { ChevronRightIcon } from "@components/icons/chevron-right-icon"
import { HomeIcon } from "@components/icons/home-icon"
import type { ICrumbProps } from "@lib/crumbs"
import { BaseLink } from "./link/base-link"

interface BreadcrumbProps extends IElementProps, ICrumbProps {}

export function Breadcrumb({ crumbs, className = "" }: BreadcrumbProps) {
  if (!crumbs) {
    return null
  }

  const ret: ReactNode[] = []

  ret.push(
    <li key="home">
      <BaseLink
        href="/"
        aria-label="Home"
        className="trans-300 transition-color fill-sky-500/50 hover:fill-sky-500 dark:fill-sky-400 dark:hover:fill-white"
      >
        <HomeIcon w="w-4" />
      </BaseLink>
      {/* <ToBlueLink href="/" aria-label="Home">
        Home
      </ToBlueLink> */}
    </li>,
  )

  // ret.push(<li key={`crumb-${ret.length}`}>{getCrumbLink(["Home", "/"], mode)}</li>)

  for (let i = 0; i < crumbs.length; ++i) {
    const crumb = crumbs[i]

    ret.push(
      <li key={`divider-${i}`} className="group flex flex-row gap-x-2">
        <ChevronRightIcon
          w="w-3"
          className="trans-300 transition-all stroke-sky-500/50 group-hover:translate-x-0.5 group-hover:stroke-sky-500 dark:group-hover:stroke-white"
        />
        <BaseLink
          href={crumb[1]}
          aria-label={`Visit ${crumb[0]}`}
          className="trans-300 transition-color text-sky-500/50 group-hover:text-sky-500 dark:text-sky-400 dark:group-hover:text-white"
        >
          {crumb[0]}
        </BaseLink>
      </li>,
    )
  }

  return (
    <ul
      className={cn(
        "flex flex-row flex-nowrap items-center gap-x-2 text-xs",
        className,
      )}
    >
      {ret}
    </ul>
  )
}
