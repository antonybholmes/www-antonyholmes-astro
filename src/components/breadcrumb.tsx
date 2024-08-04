import { type IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import type { ReactNode } from "react"

import { ChevronRightIcon } from "@icons/chevron-right-icon"
import { HomeIcon } from "@icons/home-icon"
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
      <BaseLink href="/" aria-label="Home">
        <HomeIcon className="trans-300 transition-color w-4 fill-blue-600/50 hover:fill-blue-600 dark:fill-blue-400 dark:hover:fill-white" />
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
          size="w-3"
          className="trans-300 transition-all stroke-blue-600/50 group-hover:translate-x-0.5 group-hover:stroke-blue-600 dark:group-hover:stroke-white"
        />
        <BaseLink
          href={crumb[1]}
          aria-label={`Visit ${crumb[0]}`}
          className="trans-300 transition-color text-blue-600/50 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-white"
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
