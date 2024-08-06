import { cn } from "@lib/class-names"

import type { IDivProps } from "@interfaces/div-props"
import { Children, forwardRef, type ForwardedRef } from "react"
import { BaseCol } from "./base-col"

interface IProps extends IDivProps {
  contentClassName?: string
}

export const ContentDiv = forwardRef(function ContentDiv(
  { contentClassName, className, children, ...props }: IProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const c = Children.toArray(children)

  if (c.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 xl:grid-cols-8 2xl:grid-cols-6 px-2",
        className,
      )}
      {...props}
    >
      <BaseCol>{c.length > 1 && c[0]}</BaseCol>
      <BaseCol
        className={cn(
          "col-span-1 xl:col-span-6 2xl:col-span-4",
          contentClassName,
        )}
      >
        {c.length > 1 ? c[1] : c[0]}
      </BaseCol>
      <BaseCol>{c.length > 2 && c[2]}</BaseCol>
    </div>
  )
})
