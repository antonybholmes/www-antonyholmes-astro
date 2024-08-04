import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { forwardRef, type ForwardedRef } from "react"

import { CheckIcon } from "@components/icons/check-icon"
import { type IButtonProps } from "@interfaces/button-props"
import { cn } from "@lib/class-names"
import {
  CENTERED_BUTTON_CLS,
  GROUP_FOCUS_RING_CLS,
  INPUT_BORDER_CLS,
} from "@theme"

export type ICheckedChange = (state: boolean) => void

export interface ICheckboxProps extends IButtonProps {
  index?: number
  checked?: boolean
  onCheckedChange?: ICheckedChange
}

export const CHECK_CLS = cn(
  "group flex flex-row shrink-0 cursor-pointer gap-x-2 whitespace-nowrap text-left items-center outline-none",
)

export const TICK_CLS = cn(
  INPUT_BORDER_CLS,
  GROUP_FOCUS_RING_CLS,
  CENTERED_BUTTON_CLS,
  "bg-background rounded aspect-square w-5 h-5",
)

export const Checkbox = forwardRef(function Checkbox(
  { checked = false, onCheckedChange, className, children }: ICheckboxProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={state =>
        onCheckedChange?.(state === "indeterminate" ? false : state)
      }
      className={cn(CHECK_CLS, className)}
    >
      <span className={TICK_CLS}>
        <CheckboxPrimitive.Indicator>
          <CheckIcon stroke="stroke-3" w="w-4" className="stroke-foreground" />
        </CheckboxPrimitive.Indicator>
      </span>

      {children && children}
    </CheckboxPrimitive.Root>
  )
})
