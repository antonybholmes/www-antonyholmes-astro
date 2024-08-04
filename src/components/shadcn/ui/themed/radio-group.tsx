import type { IStringMap } from "@interfaces/string-map"
import { cn } from "@lib/class-names"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { FOCUS_RING_CLS, TRANS_COLOR_CLS } from "@theme"
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react"

const RADIO_CLS = cn(
  FOCUS_RING_CLS,
  "aspect-square h-5 w-5 rounded-full border-2 data-[state=unchecked]:border-primary data-[state=checked]:border-primary-color text-primary disabled:cursor-not-allowed disabled:opacity-50",
)

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(RADIO_CLS, className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* <CheckIcon className="h-3.5 w-3.5 fill-primary" /> */}
        <span className="aspect-square h-3 w-3 rounded-full bg-primary-color" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

interface SideRadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  currentValue?: string
}

const BASE_SIDE_CLS = cn(
  TRANS_COLOR_CLS,
  "relative aspect-square bg-background z-0 border border-dashed border-primary border-primary/50",
)

const SIDE_BUTTON_CLS = cn(
  TRANS_COLOR_CLS,
  "relative aspect-square overflow-hidden rounded border p-1 data-[state=checked]:border-input data-[state=unchecked]:border-transparent data-[state=checked]:bg-muted data-[state=unchecked]:hover:border-input data-[state=unchecked]:hover:bg-muted",
)

const BORDER_MAP:IStringMap = {
  Off: "",
  Top: "-rotate-90",
  Bottom: "rotate-90",
  Left: "rotate-180",
  Right: "",
}

export const SideRadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  SideRadioGroupItemProps
>(({ value, currentValue, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      {...props}
      className={SIDE_BUTTON_CLS}
      aria-label={value}
      title={value}
    >
      <div className={cn(BASE_SIDE_CLS, BORDER_MAP[value], className)}>
        {/* <span className="absolute left-0 top-0 z-10 border border-dashed border-primary border-primary/50 h-full" /> */}

        {value !== "Off" && (
          <span
            data-state={value === currentValue ? "checked" : "unchecked"}
            className="absolute -right-[1px] top-0 z-20 w-[3px] bg-primary h-full"
          />
        )}
      </div>
    </RadioGroupPrimitive.Item>
  )
})
SideRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
