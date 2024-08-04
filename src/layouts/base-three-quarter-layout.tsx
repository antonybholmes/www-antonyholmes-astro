import type { ILayoutProps } from "@interfaces/layout-props"
import { cn } from "@lib/class-names"
import type { ICrumbProps } from "@lib/crumbs"
import { Children } from "react"

export interface IProps extends ILayoutProps, ICrumbProps {
  isRight?: boolean
}

export function BaseThreeQuarterLayout({
 
  isRight = true,
  className,
  children,
}: IProps) {
  const c = Children.toArray(children)

  return (
    <div
      className={cn("grid grid-cols-1 xl:grid-cols-4 xl:gap-x-16", className)}
    >
      {!isRight && (
        <div className="relative col-span-1 hidden xl:block">{c[1]}</div>
      )}
      <article className="col-span-3">
        {/* <LayoutTitles
          title={title}
          superTitle={superTitle}
          subTitle={subTitle}
          crumbs={crumbs}
          showTitle={showTitle}
          showCrumbs={showCrumbs}
        /> */}

        {c[0]}
      </article>
      {isRight && (
        <div className="relative col-span-1 hidden xl:block">{c[1]}</div>
      )}
    </div>
  )
}
