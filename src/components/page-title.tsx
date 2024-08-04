import type { IElementProps } from "@interfaces/element-props"
import type IPageTitleProps from "@interfaces/page-title-props"
import { cn } from "@lib/class-names"

interface IProps extends IPageTitleProps, IElementProps {
  subClassName?: string
}

export const PageTitle = ({
  title,
  superTitle,
  subTitle,
  className,
  subClassName,
}: IProps) => (
  <header className={cn("flex flex-col gap-y-1", className)}>
    {superTitle && <h3 className="text-lg font-normal">{superTitle}</h3>}

    <h1 className="text-4xl font-bold capitalize">{title}</h1>

    {subTitle && (
      <h2 className={cn("text-lg font-normal", subClassName)}>{subTitle}</h2>
    )}
  </header>
)
