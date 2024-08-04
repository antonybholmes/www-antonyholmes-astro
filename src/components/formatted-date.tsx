import { format } from "date-fns"

export function FormattedDate({ date }: { date: Date }) {
  return (
    <time
      dateTime={date.toISOString()}
      className="text-base font-light text-gray-500"
    >
      {format(date, "LLL dd, yyyy")}
    </time>
  )
}
