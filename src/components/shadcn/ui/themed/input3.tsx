import { VCenterRow } from "@components/v-center-row"
import { cn } from "@lib/class-names"
import {
  FOCUS_INSET_RING_CLS,
  ROUNDED_MD_CLS,
  TRANS_COLOR_CLS,
  TRANS_TIME_CLS,
} from "@theme"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react"
import type { IPlaceholderProps } from "./input"

const CONTAINER_CLS = cn(
  TRANS_COLOR_CLS,
  ROUNDED_MD_CLS,
  FOCUS_INSET_RING_CLS,
  "relative bg-background border px-2.5 text-sm data-[state=disabled]:border-border",
  "data-[enabled=true]:border-input data-[enabled=true]:focus-within:ring-2 data-[enabled=true]:hover:border-foreground/30",
  "data-[error=true]:ring-2 data-[error=true]:ring-red-600 text-xs mt-2 min-w-0",
)

const PLACEHOLDER_CLS = cn(
  TRANS_TIME_CLS,
  "pointer-events-none absolute data-[value=false]:left-1.5 data-[focus=true]:left-2 top-1/2 z-10 bg-background px-1 data-[focus=false]:text-foreground/30 data-[focus=true]:text-primary-color data-[enabled=false]:text-foreground/50/30",
)

const INPUT_CLS = cn(
  "flex min-w-0  grow h-8 disabled:cursor-not-allowed disabled:opacity-50 read-only:opacity-50 outline-none border-none ring-none shrink-0",
)

export function Placeholder({
  id,
  placeholder,
  focus,
  value,
  disabled = false,

  className,
}: IPlaceholderProps) {
  return (
    <label
      data-focus={focus}
      data-value={value !== ""}
      className={cn(PLACEHOLDER_CLS, className)}
      data-enabled={!disabled}
      style={{
        transform: `translateY(${focus || value ? "-150%" : "-50%"})`,
        fontSize: `${focus || value ? "75%" : "100%"}`,
        fontWeight: `${focus || value ? "bold" : "normal"}`,
      }}
      htmlFor={id}
    >
      {focus ? placeholder?.replace("...", "") : placeholder}
    </label>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | undefined
  globalClassName?: string
  inputClassName?: string
  rightChildren?: ReactNode
}

export const Input3 = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      placeholder,
      value,
      defaultValue,
      type,
      disabled,
      error = false,
      rightChildren,
      className,
      globalClassName,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(false)
    const innerRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => innerRef.current!, [])

    useEffect(() => {
      if (focus && innerRef.current) {
        innerRef.current.select()
      }
    }, [focus])

    return (
      <VCenterRow
        className={cn(CONTAINER_CLS, globalClassName, className, [
          focus,
          "border-border/30",
        ])}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        data-enabled={!disabled}
        data-error={error}
      >
        <Placeholder
          id={id}
          placeholder={placeholder}
          focus={focus}
          value={value ?? defaultValue}
          className={globalClassName}
          disabled={disabled}
        />
        <input
          ref={innerRef}
          type={type}
          value={value}
          defaultValue={defaultValue}
          className={cn(INPUT_CLS, globalClassName, inputClassName)}
          disabled={disabled}
          {...props}
        />

        {rightChildren}
      </VCenterRow>
    )
  },
)
