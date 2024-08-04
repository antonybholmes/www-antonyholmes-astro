import { Tooltip } from "@components/tooltip"
import type { ButtonState } from "@interfaces/button-props"
import type { ITooltipSide } from "@interfaces/tooltip-side-props"
import { cn } from "@lib/class-names"
import { Slot } from "@radix-ui/react-slot"
import {
  BASE_BUTTON_CLS,
  BASE_ICON_BUTTON_CLS,
  BUTTON_H_CLS,
  CENTERED_BUTTON_CLS,
  CORE_PRIMARY_BUTTON_CLS,
  CORE_PRIMARY_COLOR_BUTTON_CLS,
  DESTRUCTIVE_CLS,
  FOCUS_RING_CLS,
  ICON_BUTTON_CLS,
  LARGE_BUTTON_H_CLS,
  LARGE_ICON_BUTTON_CLS,
  MEDIUM_BUTTON_H_CLS,
  SECONDARY_BUTTON_CLS as OUTLINE_BUTTON_CLS,
  SM_ICON_BUTTON_CLS,
  SMALL_BUTTON_H_CLS,
  TRANS_COLOR_CLS,
  XL_BUTTON_H_CLS,
  XS_ICON_BUTTON_CLS,
  XXL_BUTTON_H_CLS,
} from "@theme"
import { cva, type VariantProps } from "class-variance-authority"
import gsap from "gsap"
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from "react"

const BASE_GHOST_CLS = "hover:bg-accent data-[selected=true]:bg-accent"

const BASE_MUTED_CLS =
  "data-[selected=false]:hover:bg-muted data-[selected=true]:bg-muted"

const BASE_ACCENT_CLS =
  "bg-muted hover:bg-accent data-[selected=true]:bg-accent"

const BASE_TOOLBAR_CLS = cn(
  BASE_MUTED_CLS,
  "border data-[selected=false]:border-transparent data-[selected=true]:border-border data-[selected=false]:hover:border-border",
)

//const BASE_OUTLINE_CLS = cn(BASE_GHOST_CLS, "border border-border")

const BASE_MENU_CLS = cn(
  BASE_GHOST_CLS,
  "justify-start text-left whitespace-nowrap",
)

const LINK_CLS = cn(
  FOCUS_RING_CLS,
  "text-primary-color underline-offset-4 hover:underline",
)

export interface IRippleClick {
  x: number
  y: number
}

export const RIPPLE_CLS =
  "pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0"

export const buttonVariants = cva(BASE_BUTTON_CLS, {
  variants: {
    variant: {
      none: "",
      default: CORE_PRIMARY_BUTTON_CLS,
      primary: CORE_PRIMARY_BUTTON_CLS,
      "primary-color": CORE_PRIMARY_COLOR_BUTTON_CLS,
      destructive: DESTRUCTIVE_CLS,
      trans: "hover:bg-white/25 data-[selected=true]:bg-white/25",
      outline: OUTLINE_BUTTON_CLS,
      ghost: BASE_GHOST_CLS,
      muted: BASE_MUTED_CLS,
      accent: BASE_ACCENT_CLS,
      toolbar: BASE_TOOLBAR_CLS,
      side: "hover:bg-background",
      menu: BASE_MENU_CLS,
      link: LINK_CLS,
      footer: "hover:bg-primary/20 data-[selected=true]:bg-primary/20",
    },
    font: {
      none: "",
      default: "font-normal",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    rounded: {
      none: "",
      default: "rounded-md",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full ",
    },
    ring: {
      default: "ring-offset-1",
      "offset-1": "ring-offset-1",
      "offset-2": "ring-offset-2",
      inset: "ring-inset",
    },
    items: {
      default: "items-center",
      center: "items-center",
      start: "items-start",
      end: "items-end",
    },
    justify: {
      default: "justify-center",
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
    },
    size: {
      default: BUTTON_H_CLS,
      base: BUTTON_H_CLS,
      //narrow: cn(BUTTON_H_CLS, "w-5 justify-center"),
      tab: "px-2 h-7 justify-center",
      sm: SMALL_BUTTON_H_CLS,
      md: MEDIUM_BUTTON_H_CLS,
      lg: LARGE_BUTTON_H_CLS,
      xl: XL_BUTTON_H_CLS,
      xxl: XXL_BUTTON_H_CLS,
      icon: cn(ICON_BUTTON_CLS, "justify-center"),
      "icon-lg": cn(
        BASE_ICON_BUTTON_CLS,
        CENTERED_BUTTON_CLS,
        LARGE_ICON_BUTTON_CLS,
      ),
      "icon-md": cn(
        BASE_ICON_BUTTON_CLS,
        CENTERED_BUTTON_CLS,
        MEDIUM_BUTTON_H_CLS,
      ),
      "icon-sm": SM_ICON_BUTTON_CLS,
      "icon-xs": XS_ICON_BUTTON_CLS,
      none: "",
    },
    padding: {
      none: "",
      default: "px-4",
      md: "px-3",
      sm: "px-2",
      xs: "px-1",
    },
    gap: {
      none: "",
      default: "gap-x-2",
      sm: "gap-x-1",
      xs: "gap-x-0.5",
    },
    animation: {
      default: TRANS_COLOR_CLS,
      color: TRANS_COLOR_CLS,
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    justify: "default",
    items: "default",
    gap: "default",
    size: "default",
    font: "default",
    rounded: "default",
    padding: "default",
    animation: "default",
  },
})

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    ITooltipSide {
  asChild?: boolean
  selected?: boolean
  state?: ButtonState
  ripple?: boolean
  tooltip?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "default",
      size = "default",
      rounded: rounding = "default",
      ring = "default",
      font = "default",
      padding = "default",
      gap = "default",
      justify = "default",
      items = "default",
      animation = "default",
      selected = false,
      state = "inactive",
      asChild = false,
      type = "button",
      ripple = true,
      tooltip,
      tooltipSide = "bottom",
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      children,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "button"

    const rippleRef = useRef<HTMLSpanElement>(null)
    const [clickProps, setClickProps] = useState<IRippleClick>({ x: -1, y: -1 })

    useEffect(() => {
      if (!ripple) {
        return
      }

      if (clickProps.x !== -1) {
        gsap.fromTo(
          rippleRef.current,
          {
            left: clickProps.x,
            top: clickProps.y,
            transform: "scale(1)",
            height: "1rem",
            width: "1rem",
            opacity: 0.9,
          },
          {
            transform: "scale(12)",
            opacity: 0,
            duration: 2,
            ease: "power3.out",
          },
        )
      } else {
        gsap.to(rippleRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
      }
    }, [clickProps])

    function _onMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
      setClickProps({ x: -1, y: -1 })

      onMouseUp?.(e)
    }

    function _onMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
      //console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      setClickProps({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      onMouseDown?.(e)
    }

    function _onMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
      setClickProps({ x: -1, y: -1 })
      onMouseLeave?.(e)
    }

    const comp = (
      <Comp
        className={buttonVariants({
          variant,
          size,
          rounded: rounding,
          ring,
          font,
          padding,
          gap,
          justify,
          items,
          animation,
          className: cn("relative", className),
        })}
        ref={ref}
        data-selected={selected}
        data-state={state}
        type={type}
        onMouseDown={_onMouseDown}
        onMouseUp={_onMouseUp}
        onMouseLeave={_onMouseLeave}
        {...props}
      >
        {children}
        <span ref={rippleRef} className={RIPPLE_CLS} />
      </Comp>
    )

    if (tooltip) {
      return (
        <Tooltip side={tooltipSide} content={tooltip}>
          {comp}
        </Tooltip>
      )
    } else {
      return comp
    }
  },
)
