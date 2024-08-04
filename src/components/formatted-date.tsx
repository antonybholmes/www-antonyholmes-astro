import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { format } from "date-fns"

interface IProps extends IElementProps {
  date: Date
}

export function FormattedDate({ date, className }: IProps) {
  return (
    <time
      dateTime={date.toISOString()}
      className={cn("font-light text-gray-500", className)}
    >
      {format(date, "LLL dd, yyyy")}
    </time>
  )
}
