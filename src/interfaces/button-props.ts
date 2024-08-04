import { buttonVariants } from "@components/shadcn/ui/themed/button"
import type { VariantProps } from "class-variance-authority"
import { type ComponentPropsWithoutRef } from "react"
import { type ITooltipSide } from "./tooltip-side-props"

export type ButtonState = "active" | "inactive"

export interface IButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants>,
    ITooltipSide {
  selected?: boolean
  state?: ButtonState
  tooltip?: string
  ripple?: boolean
}
