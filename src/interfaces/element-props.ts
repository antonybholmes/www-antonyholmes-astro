import { type HTMLAttributes, type PropsWithoutRef } from "react"

export interface IElementProps
  extends PropsWithoutRef<HTMLAttributes<HTMLElement>> {
  tooltip?: string
}
