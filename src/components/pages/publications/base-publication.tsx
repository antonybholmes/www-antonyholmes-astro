import { useEffect, useState } from "react"

import { BaseRow } from "@components/base-row"
import { HCenterCol } from "@components/h-center-col"
import { ChevronRightIcon } from "@components/icons/chevron-right-icon"
import { BaseLink } from "@components/link/base-link"
import { PrimaryColorLink } from "@components/link/primary-color-link"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"

type AbstractProps = {
  publication: any
  isExpanded: boolean
}

function Abstract({ publication, isExpanded = false }: AbstractProps) {
  return (
    <>
      <div className="mt-2 text-sm text-gray-500">
        <p className={cn("overflow-hidden", [!isExpanded, "h-0"])}>
          {publication.abstract}
        </p>
      </div>
    </>
  )
}

function pubmedUrl(pubmed: number) {
  return `https://pubmed.ncbi.nlm.nih.gov/${pubmed}/`
}

function doiUrl(doi: string) {
  return `https://doi.org/${doi}`
}

function getUrl(publication: any) {
  if (publication.doi !== "") {
    return doiUrl(publication.doi)
  } else if (publication.pmid !== "") {
    return pubmedUrl(publication.pmid)
  } else {
    return ""
  }
}

interface BasePublicationProps extends IElementProps {
  index?: number
  publication: any
  showCount?: boolean
  showAbstract?: boolean
}

function BasePublication({
  index = -1,
  publication,
  showAbstract = false,
  showCount = false,

  className,
}: BasePublicationProps) {
  const [isExpanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(showAbstract)
  }, [showAbstract])

  // const _handlePubClick = (journal: string) {
  //   if (onPubClick !== null) {
  //     onPubClick(journal)
  //   }
  // }

  //console.log(publication)

  const url = getUrl(publication)

  const authors = publication.authorList
    .join(", ")
    .replace("Holmes A", "Holmes AB")
    .replace(/Holmes AB+/, "Holmes AB")
    .replace("Holmes AB", "<strong>Holmes AB</strong>")

  const links = []

  // links.push(
  //   <li key={links.length}>
  //     {publication.journal}. {publication.year}.
  //   </li>
  // )

  // if (showDOI && publication.doi !== "") {
  //   links.push(
  //     <li key={links.length}>
  //       {`DOI: `}
  //       <BlackLink
  //         ariaLabel="View article from DOI"
  //         href={doiUrl(publication.doi)}
  //       >
  //         {publication.doi}
  //       </BlackLink>
  //     </li>
  //   )
  // }

  if (publication.pmid && publication.pmid !== "") {
    links.push(
      <li key={links.length}>
        {`PMID: `}
        <BaseLink
          aria-label="View article from PubMed ID"
          href={pubmedUrl(publication.pmid)}
          data-underline={true}
        >
          {publication.pmid}
        </BaseLink>
      </li>,
    )
  }

  // if (publication.pmcid && publication.pmcid !== "") {
  //   links.push(
  //     <li key={links.length}>
  //       {`PMC: `}
  //       <BlackLink
  //         ariaLabel="View article from PubMed PMC ID"
  //         href={pubmedUrl(publication.pmcid)}
  //       >
  //         {publication.pmcid}
  //       </BlackLink>
  //     </li>
  //   )
  // }

  const title = publication.title

  return (
    <article
      className={cn("publication flex flex-row gap-x-2 text-sm", className)}
    >
      <HCenterCol className="mt-1 grow-0 gap-y-2">
        {showCount && (
          <div className="text-center text-gray-500">{`${index + 1}`}</div>
        )}
        <button
          aria-label="Show abstract"
          onClick={() => setExpanded(!isExpanded)}
        >
          <ChevronRightIcon
            className={cn("trans-all w-3 stroke-2 ", [isExpanded, "rotate-90"])}
          />
        </button>
      </HCenterCol>

      <div className="grow">
        <BaseRow className="gap-x-2">
          <div className="grow">
            {/* <ul className="m-0 flex flex-row flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          {links.map(link => link)}
        </ul> */}
            <h2 className="text-lg font-semibold">
              {url !== "" ? (
                <PrimaryColorLink
                  aria-label="View article"
                  href={url}
                  data-underline={true}
                >
                  {title}
                </PrimaryColorLink>
              ) : (
                title
              )}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: authors }} />
            {/* <p className="text-sm font-light capitalize text-green-600">
        {publication.journal}. {publication.year}.
      </p> */}

            <ul className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-emerald-700">
              <li>
                {publication.journal}. {publication.year}.
              </li>
            </ul>

            <ul className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-emerald-700">
              {links.map(link => link)}
            </ul>
          </div>
          {/* <VCenterRow>
            <PillButton
              ariaLabel="Show abstract"
              className="h-7 w-7 min-w-7 stroke-gray-400 hover:bg-gray-200 hover:stroke-gray-900"
              onClick={() => setExpanded(!isExpanded)}
            >
              <ChevronRightIcon
                className={cn(
                  "trans-300 w-3 stroke-2  transition-transform",
                  [isExpanded, "rotate-90"]
                )}
              />
            </PillButton>
          </VCenterRow> */}
        </BaseRow>

        {isExpanded && publication.abstract !== "" ? (
          <Abstract publication={publication} isExpanded={isExpanded} />
        ) : (
          <></>
        )}
      </div>
    </article>
  )
}

export default BasePublication
