import { cn } from "@lib/class-names"
import { FOCUS_INSET_RING_CLS, ROUNDED_MD_CLS, TRANS_TIME_CLS } from "@theme"

import { forwardRef, useState, type TextareaHTMLAttributes } from "react"
import type { IPlaceholderProps } from "./input"

export const TEXTAREA_GROUP_CLS = cn(
  ROUNDED_MD_CLS,
  FOCUS_INSET_RING_CLS,
  "relative rounded-md p-2.5 mt-2 bg-background border data-[enabled=true]:border-input data-[enabled=true]:focus-within:ring-2",
)

export const PLACEHOLDER_CLS = cn(
  TRANS_TIME_CLS,
  "pointer-events-none absolute  left-1.5 top-2 z-10 bg-background px-1 data-[focus=false]:text-foreground/30 data-[focus=true]:text-primary-color",
)

export const TEXT_CLS =
  "relative w-full h-full text-foreground bg-background disabled:cursor-not-allowed disabled:opacity-50 outline-none ring-none resize-none"

export function Placeholder({
  id,
  placeholder,
  focus,
  value,
}: IPlaceholderProps) {
  return (
    <label
      className={PLACEHOLDER_CLS}
      data-focus={focus}
      data-value={value !== ""}
      style={{
        transform: `translateY(${focus || value ? "-100%" : "0"})`,
        fontSize: `${focus || value ? "75%" : "100%"}`,
        fontWeight: `${focus || value ? "bold" : "normal"}`,
      }}
      htmlFor={id}
    >
      {focus ? placeholder?.replace("...", "") : placeholder}
    </label>
  )
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea3 = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, className, placeholder, value, disabled = false, ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    //const [_value, setInputValue] = useState("")

    //function _onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    //  setInputValue(event.target.value)
    //}

    //console.log(value)

    return (
      <div
        className={cn(TEXTAREA_GROUP_CLS, className)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        data-enabled={!disabled}
      >
        <Placeholder
          id={id}
          placeholder={placeholder}
          focus={focus}
          value={value}
        />
        <textarea
          id={id}
          className={TEXT_CLS}
          ref={ref}
          value={value}
          //onChange={_onChange}
          {...props}
        />
      </div>
    )
  },
)
