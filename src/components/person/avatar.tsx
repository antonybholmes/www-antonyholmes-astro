import { BaseCol } from "@components/base-col"
import { BaseLink } from "@components/link/base-link"
import { VCenterRow } from "@components/v-center-row"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { getAuthorBaseUrl } from "@lib/urls"
import { AvatarImage } from "./avatar-image"

interface IProps extends IElementProps {
  person: string
  showTitle?: boolean
  isSmall?: boolean
}

export function Avatar({ person, isSmall = false, className }: IProps) {
  const href = getAuthorBaseUrl(person)

  return (
    <VCenterRow className={cn("gap-x-3", className)}>
      <BaseLink href={href} aria-label={`Click to read more about ${person}`}>
        <AvatarImage
          person={person}
          className={cn([isSmall, "h-10 w-10", "h-12 w-12"])}
        />
      </BaseLink>
      <BaseCol>
        <BaseLink
          href={href}
          aria-label={`Click to read more information about ${person}`}
          data-underline={true}
          className={cn("font-semibold", [isSmall, "text-sm"])}
        >
          {person}
        </BaseLink>
      </BaseCol>
    </VCenterRow>
  )
}
