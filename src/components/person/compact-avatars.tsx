import { BaseLink } from "@components/link/base-link"
import { VCenterRow } from "@components/v-center-row"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { getAuthorBaseUrl } from "@lib/urls"
import { AvatarImage } from "./avatar-image"

interface IProps extends IElementProps {
  people: string[]
  showImages?: boolean
}

export function CompactAvatars({
  people,
  showImages = true,
  className,
}: IProps) {
  return (
    <VCenterRow className="gap-x-3">
      {showImages && (
        <ul
          className={cn("relative h-12", className)}
          style={{ width: `${3 + (people.length - 1) * 0.5}rem` }}
        >
          {people.map((person, index) => (
            <li key={index}>
              <BaseLink
                href={getAuthorBaseUrl(person)}
                aria-label={`Click to read more about ${person}`}
                className={cn("absolute block rounded-full", `ml-${index * 2}`)}
              >
                <AvatarImage person={person} className="h-12 w-12" />
              </BaseLink>
            </li>
          ))}
        </ul>
      )}

      <ul className="flex flex-row flex-wrap items-center gap-x-1 text-sm font-semibold">
        {people.map((person, index) => (
          <li key={index}>
            <BaseLink
              href={getAuthorBaseUrl(person)}
              aria-label={`Click to read more about ${person}`}
              data-underline={true}
            >
              {person}
            </BaseLink>
            {index < people.length - 2 ? <span>,</span> : <></>}
            {index === people.length - 2 ? (
              <span className="ml-1">&</span>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </VCenterRow>
  )
}
