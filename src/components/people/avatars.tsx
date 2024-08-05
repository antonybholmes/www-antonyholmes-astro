import { VCenterRow } from "@components/v-center-row"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { Avatar } from "./avatar"

interface IProps extends IElementProps {
  people: string[]
  showTitle?: boolean
  isSmall?: boolean
}

export function Avatars({
  people,

  isSmall = false,
  className,
}: IProps) {
  return (
    <VCenterRow className={cn("gap-4", className)}>
      {people.map((person, index) => (
        <Avatar person={person} isSmall={isSmall} key={index} />
      ))}
    </VCenterRow>
  )
}
