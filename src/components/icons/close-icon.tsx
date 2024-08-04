import { ICON_CLS, type IIconProps } from "@interfaces/icon-props"
import { cn } from "@lib/class-names"

export function CloseIcon({
  w = "w-2.5",
  fill = "fill-foreground",
  selected = false,
  className,
  style,
}: IIconProps) {
  return (
    <svg
      viewBox="0 0 1.5744 1.5744"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(ICON_CLS, w, fill, className)}
      style={{ ...style, strokeLinecap: "round", strokeLinejoin: "round" }}
      data-selected={selected}
    >
      {/* <path d="M 5,5 L 19,19 M 19,5 L 5,19" />  
      {/* <path d="M 5,5 L 19,19" />
      <path d="M 19,5 L 5,19" /> */}

      <g transform="translate(-77.86 -96.447)">
        <path d="m79.391 96.481c-0.05206-0.04707-0.13213-0.04545-0.18234 0.0048l-0.56127 0.56127-0.56127-0.56127c-0.05182-0.05182-0.13527-0.05182-0.18709 0-0.05182 0.05182-0.05182 0.13526 0 0.18709l0.56127 0.56127-0.56127 0.56127c-0.05182 0.05182-0.05182 0.13526 0 0.18709 0.05182 0.05182 0.13526 0.05182 0.18709 0l0.56127-0.56127 0.56127 0.56127c0.05182 0.05182 0.13526 0.05182 0.18709 0 0.05182-0.05182 0.05182-0.13526 0-0.18709l-0.56127-0.56132 0.56127-0.56127c0.05182-0.05182 0.05182-0.13527 0-0.18709-0.0016-0.0016-0.0031-0.0032-0.0048-0.0048z" />
      </g>
    </svg>
  )
}
