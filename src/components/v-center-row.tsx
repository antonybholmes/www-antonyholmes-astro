import { forwardRef, type ForwardedRef } from "react"

import { type IDivProps } from "@interfaces/div-props"
import { cn } from "@lib/class-names"
import { BaseRow } from "./base-row"

export const VCenterRow = forwardRef(function VCenterRow(
  { className, children, ...props }: IDivProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseRow ref={ref} className={cn("items-center", className)} {...props}>
      {children}
    </BaseRow>
  )
})
