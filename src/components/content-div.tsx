import { cn } from "@lib/class-names"

import type { IDivProps } from "@interfaces/div-props"
import { Children, forwardRef, type ForwardedRef } from "react"
import { HCenterRow } from "./h-center-row"

export const ContentDiv = forwardRef(function ContentDiv(
  { className, children, ...props }: IDivProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const c = Children.toArray(children)

  if (c.length === 0) {
    return null
  }

  return (
    <HCenterRow
      ref={ref}
      className={cn(
        "grid grid-cols-1 xl:grid-cols-8 2xl:grid-cols-5 p-4",
        className,
      )}
      {...props}
    >
      <div>{c.length > 1 && c[0]}</div>
      <div className="col-span-1 xl:col-span-6 2xl:col-span-3">
        {c.length > 1 ? c[1] : c[0]}
      </div>
      <div>{c.length > 2 && c[2]}</div>
    </HCenterRow>
  )
})
