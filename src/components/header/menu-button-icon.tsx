import { ICON_CLS, type IIconProps } from "@interfaces/icon-props"
import { cn } from "@lib/class-names"

export const R = 2
export const X1 = 2
export const X2 = 8
export const X3 = 14

export function MenuButtonIcon({
  w = "w-4",
  fill = "fill-foreground/90",
  className,
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn(ICON_CLS, w, fill, className)}
    >
      <circle cx={X1} cy={X1} r={R} />
      <circle cx={X2} cy={X1} r={R} />
      <circle cx={X3} cy={X1} r={R} />

      <circle cx={X1} cy={X2} r={R} />
      <circle cx={X2} cy={X2} r={R} />
      <circle cx={X3} cy={X2} r={R} />

      <circle cx={X1} cy={X3} r={R} />
      <circle cx={X2} cy={X3} r={R} />
      <circle cx={X3} cy={X3} r={R} />
    </svg>
  )
}
