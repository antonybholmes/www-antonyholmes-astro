import { VCenterRow } from "@components/v-center-row"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { FOCUS_INSET_RING_CLS, INPUT_BORDER_CLS } from "@theme"
import { cva, type VariantProps } from "class-variance-authority"
import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react"

export const PLACEHOLDER_CLS = cn(
  "min-w-0 flex flex-row gap-x-2 h-8 items-center bg-background placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
  FOCUS_INSET_RING_CLS,
)

export const inputVariants = cva(PLACEHOLDER_CLS, {
  variants: {
    variant: {
      default: cn("px-2", INPUT_BORDER_CLS),
      plain: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const INPUT_CLS = cn(
  "disabled:cursor-not-allowed disabled:opacity-50 read-only:opacity-50 outline-none border-none ring-none min-w-0 grow",
)

export interface IPlaceholderProps extends IElementProps {
  id: string | undefined
  placeholder: string | undefined
  focus: boolean
  value: string | number | readonly string[] | undefined
  disabled?: boolean
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  inputCls?: string
  leftChildren?: ReactNode
  rightChildren?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftChildren,
      rightChildren,
      type,
      inputCls,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(false)

    return (
      <VCenterRow
        className={inputVariants({
          variant,
          className: cn(PLACEHOLDER_CLS, [focus, "ring-2"], className),
        })}
      >
        {leftChildren && leftChildren}
        <input
          type={type}
          className={cn(INPUT_CLS, inputCls)}
          ref={ref}
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        {rightChildren && rightChildren}
      </VCenterRow>
    )
  },
)
