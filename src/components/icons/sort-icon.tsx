import { ICON_CLS, type IIconProps } from "@interfaces/icon-props"
import { cn } from "@lib/class-names"

export function SortIcon({
  w = "w-3",
  stroke = "stroke-foreground",
  className,
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(ICON_CLS, "stroke-3", stroke, w, className)}
      style={{ strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}
    >
      <path d="M 6,8 L 12,2 L 18,8" />

      <path d="M 6,16 L 12,22 L 18,16" />
    </svg>
  )
}
