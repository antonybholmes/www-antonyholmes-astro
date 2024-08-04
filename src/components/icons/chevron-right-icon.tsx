import { ICON_CLS, type IIconProps } from "@interfaces/icon-props"
import { cn } from "@lib/class-names"

export function ChevronRightIcon({
  w = "w-3",
  stroke = "stroke-[2px] stroke-foreground",
  className,
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn(ICON_CLS, stroke, w, className)}
      style={{ strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}
    >
      <path d="M 6,2 L 12,8 L 6,14" />
    </svg>
  )
}
