import { ICON_CLS, type IIconProps } from "@interfaces/icon-props"
import { cn } from "@lib/class-names"

export function PlusIcon({
  w = "w-2.5",
  style,
  className,
  ...props
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2.1167 2.1167"
      className={cn(ICON_CLS, w, className)}
      style={{
        strokeLinecap: "round",
        strokeLinejoin: "round",

        ...style,
      }}
      {...props}
    >
      {/* <path d="M 3,8 L 13,8 M 8,3 L 8,13" /> */}

      <g transform="translate(-77.589 -96.176)">
        <path
          transform="matrix(.26458 0 0 .26458 78.052 97.631)"
          d="m2.2246-5.5c-0.26491 0.013342-0.47461 0.23166-0.47461 0.5v3h-3c-0.277 0-0.5 0.223-0.5 0.5s0.223 0.5 0.5 0.5h3v3c0 0.277 0.223 0.5 0.5 0.5s0.5-0.223 0.5-0.5v-3h3c0.277 0 0.5-0.223 0.5-0.5s-0.223-0.5-0.5-0.5h-3v-3c0-0.277-0.223-0.5-0.5-0.5-0.00866 0-0.016845-4.304e-4 -0.025391 0z"
        />
      </g>
    </svg>
  )
}
