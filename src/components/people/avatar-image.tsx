import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { getUrlFriendlyImg } from "@lib/urls"

export interface IAvatarProps extends IElementProps {
  person: string
}

interface IProps extends IAvatarProps {}

export function AvatarImage({ person, className }: IProps) {
  return (
    <img
      src={`/assets/people/opt/${getUrlFriendlyImg(person)}`}
      alt={`Picture of ${person}`}
      className={cn("rounded-full", className)}
    />
  )
}
