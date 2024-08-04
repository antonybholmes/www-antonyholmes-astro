import type { ReactNode } from "react"
import { type IElementProps } from "./element-props"
import type { IPageTitleProps } from "./page-title-props"

export interface ILayoutProps extends IElementProps, IPageTitleProps {
  name?: string
  description?: string
  showTitle?: boolean
  tab?: string
  isIndexed?: boolean
  headerChildren?: ReactNode
}
