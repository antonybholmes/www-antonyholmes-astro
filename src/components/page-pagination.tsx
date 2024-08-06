import type { ILinkProps } from "@interfaces/link-props"
import { cn } from "@lib/class-names"
import type { UndefStr } from "@lib/text"
import { range } from "lodash-es"
import { ChevronRightIcon } from "./icons/chevron-right-icon"
import { BaseLink } from "./link/base-link"

const BTN_CLS =
  "flex flex-row justify-center items-center min-w-8 h-8 border border-transparent rounded"

function LinkButton({ className, children, ...props }: ILinkProps) {
  return (
    <BaseLink
      className={cn(
        BTN_CLS,
        "transition duration-300 hover:border-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </BaseLink>
  )
}

function NavButton({ className, children, ...props }: ILinkProps) {
  return (
    <LinkButton className={cn("gap-x-2   px-2 ", className)} {...props}>
      {children}
    </LinkButton>
  )
}

function PrevButton({ href }: ILinkProps) {
  return (
    <NavButton href={href} aria-label="Previous page">
      <ChevronRightIcon className="rotate-180" /> Prev
    </NavButton>
  )
}

function NextButton({ href }: ILinkProps) {
  return (
    <NavButton href={href} aria-label="Next page">
      Next <ChevronRightIcon />
    </NavButton>
  )
}

interface ISelectedPageButtonProps extends ILinkProps {
  page: number
}

function BasePageButton({
  href,
  page,
  className,
  ...props
}: ISelectedPageButtonProps) {
  return (
    <BaseLink href={href} className={cn(BTN_CLS, className)} {...props}>
      {page + 1}
    </BaseLink>
  )
}

function SelectedPageButton({
  href,
  page,
  ...props
}: ISelectedPageButtonProps) {
  return (
    <BasePageButton
      page={page}
      href={href}
      className="bg-blue-600 text-white"
      {...props}
    />
  )
}

interface IPageButtonProps extends ISelectedPageButtonProps {
  selected: boolean
}

function PageButton({ href, page, selected }: IPageButtonProps) {
  if (selected) {
    return (
      <SelectedPageButton
        href={href}
        page={page}
        aria-label={`Goto page ${page}`}
      />
    )
  } else {
    return (
      <BasePageButton
        href={href}
        page={page}
        className="transition duration-300 hover:border-gray-300"
        aria-label={`Goto page ${page}`}
      />
    )
  }
}

function Ellipsis() {
  return <li className={BTN_CLS}>...</li>
}

interface IProps {
  page: number
  pages: number
  root?: string
}

function getPath(page: number, root: UndefStr) {
  return `${root ? `${root}/` : ""}page/${page + 1}`
}

export function PagePagination({ page, pages, root }: IProps) {
  page = Math.max(0, page)

  const pageStart = Math.max(page - 1, 1)
  const pageEnd = Math.min(page + 1, pages - 2)

  const prevPage = Math.max(0, page - 1)
  const nextPage = Math.min(pages - 1, page + 1)

  return (
    <ul className="flex flex-row items-center gap-x-1 font-medium">
      <li>
        <PrevButton href={getPath(prevPage, root)} />
      </li>

      <li>
        <PageButton page={0} href={getPath(0, root)} selected={page === 0} />
      </li>

      {pageStart > 1 && <Ellipsis />}

      {range(pageStart, pageEnd, 1).map((p: number) => (
        <li key={p}>
          <PageButton href={getPath(p, root)} page={p} selected={p === page} />
        </li>
      ))}

      {pageEnd < pages - 2 && <Ellipsis />}

      {pages > 1 && (
        <li>
          <PageButton
            href={getPath(pages - 1, root)}
            page={pages - 1}
            selected={page === pages - 1}
          />
        </li>
      )}

      <li>
        <NextButton href={getPath(nextPage, root)} />
      </li>
    </ul>
  )
}
