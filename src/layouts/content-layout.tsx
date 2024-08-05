import type { ILayoutProps } from "@interfaces/layout-props"
import { Children } from "react"

import { Breadcrumb } from "@components/breadcrumb"
import { ContentDiv } from "@components/content-div"
import type { ICrumbProps } from "@lib/crumbs"
import { BaseLayout } from "./base-layout"

export interface IProps extends ILayoutProps, ICrumbProps {
  headerClassName?: string
}

export function ContentLayout({
  title = "",

  tab,
  isIndexed,
  headerClassName, //"text-white bg-card-blue lg:text-gray-900 lg:bg-white",
  crumbs,
  className,
  headerChildren,
  children,
}: IProps) {
  const c = Children.toArray(children)

  return (
    <BaseLayout
      title={title}
      tab={tab}
      isIndexed={isIndexed}
      className={className}
      headerChildren={headerChildren}
    >
      <ContentDiv className={headerClassName}>
        <div className="pt-4">
          {crumbs && <Breadcrumb crumbs={crumbs} className="mb-8" />}
          {/* {showTitle && title !== "" && (
            <PageTitle
              title={title}
              subTitle={subTitle}
              superTitle={superTitle}
              className="mb-8"
            />
          )} */}
          {c[0]}
        </div>
      </ContentDiv>
      <ContentDiv>{c[1]}</ContentDiv>
    </BaseLayout>
  )
}
