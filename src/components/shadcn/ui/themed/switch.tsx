import { VCenterRow } from "@components/v-center-row"
import { ANIMATION_DURATION_S } from "@consts"
import { cn } from "@lib/class-names"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { FOCUS_RING_CLS, TRANS_COLOR_CLS } from "@theme"
import gsap from "gsap"
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react"

// const THUMB_CLS =
//   "pointer-events-none block h-4 w-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"

// const Switch = forwardRef<
//   ElementRef<typeof SwitchPrimitives.Root>,
//   ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
// >(({ className, ...props }, ref) => (
//   <SwitchPrimitives.Root
//     className={cn(
//       "data-[state=unchecked]:input peer flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-color",
//       className,
//     )}
//     {...props}
//     ref={ref}
//   >
//     <SwitchPrimitives.Thumb className={THUMB_CLS} />
//   </SwitchPrimitives.Root>
// ))
// Switch.displayName = SwitchPrimitives.Root.displayName

// export { Switch }

const TOGGLE_CLS = cn(
  FOCUS_RING_CLS,
  TRANS_COLOR_CLS,
  "relative h-6 shrink-0 w-8.5 rounded-full outline-none ease-in-out z-0",
)

const TOGGLE_ENABLED_CLS = cn(
  "data-[state=checked]:bg-primary-color data-[state=checked]:hover:bg-primary-color-hover",
  "data-[state=unchecked]:bg-input/50 data-[state=unchecked]:hover:bg-input/75",
)

const TOGGLE_DISABLED_CLS = cn(
  "data-[state=checked]:bg-input/25",
  "data-[state=unchecked]:bg-input/25 ",
)

const THUMB_CLS =
  "absolute left-[2px] shadow-md pointer-events-none block aspect-square shrink-0 w-5 rounded-full bg-white z-30 -translate-y-1/2"

const HIGHLIGHT_THUMB_CLS =
  "absolute left-[2px] pointer-events-none aspect-square w-5 rounded-full shrink-0 z-10 -translate-y-1/2"

const PRESSED_THUMB_CLS =
  "absolute left-[2px] pointer-events-none aspect-square w-5 rounded-full shrink-0 z-20 -translate-y-1/2"

interface IProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  side?: "left" | "right"
}

export const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  IProps
>(function Switch(
  {
    checked = false,
    disabled = false,
    side = "left",
    className,
    children,
    ...props
  },
  ref,
) {
  const thumbRef = useRef<HTMLSpanElement>(null)
  const highlightThumbRef = useRef<HTMLSpanElement>(null)
  const pressedThumbRef = useRef<HTMLSpanElement>(null)

  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (disabled) {
      return
    }
    gsap
      .timeline()
      .to(
        thumbRef.current,
        {
          transform: checked
            ? "translate(0.625rem, -50%)"
            : "translate(0, -50%)",
          duration: ANIMATION_DURATION_S,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        highlightThumbRef.current,
        {
          transform: checked
            ? `translate(0.625rem, -50%) scale(${hover ? "1.8" : "1"})`
            : `translate(0, -50%) scale(${hover ? "1.8" : "1"})`,
          duration: ANIMATION_DURATION_S,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        pressedThumbRef.current,
        {
          transform: checked
            ? `translate(0.625rem, -50%) scale(${pressed ? "1.8" : "1"})`
            : `translate(0, -50%) scale(${pressed ? "1.8" : "1"})`,
          duration: ANIMATION_DURATION_S,
          ease: "power2.inOut",
        },
        0,
      )
  }, [checked, hover, pressed])

  const button = (
    <SwitchPrimitives.Root
      ref={ref}
      checked={checked}
      disabled={disabled}
      //onCheckedChange={_onClick}
      className={cn(TOGGLE_CLS, [
        disabled,
        TOGGLE_DISABLED_CLS,
        TOGGLE_ENABLED_CLS,
      ])}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...props}
    >
      <SwitchPrimitives.Thumb className={THUMB_CLS} ref={thumbRef} />
      {!disabled && (
        <>
          <SwitchPrimitives.Thumb
            className={cn(HIGHLIGHT_THUMB_CLS, [
              checked,
              "bg-primary-color/10",
              "bg-foreground/5",
            ])}
            ref={highlightThumbRef}
          />
          <SwitchPrimitives.Thumb
            className={cn(PRESSED_THUMB_CLS, [
              checked,
              "bg-primary-color/20",
              "bg-foreground/10",
            ])}
            ref={pressedThumbRef}
          />
        </>
      )}
    </SwitchPrimitives.Root>
  )

  if (children) {
    return (
      <VCenterRow
        className={cn(
          "gap-x-2",

          className,
        )}
      >
        {side === "left" && button}
        <VCenterRow className="gap-x-2">{children}</VCenterRow>
        {side === "right" && button}
      </VCenterRow>
    )
  } else {
    return button
  }
})
