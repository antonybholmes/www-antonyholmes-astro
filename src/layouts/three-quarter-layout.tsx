import type { ILayoutProps } from "@interfaces/layout-props"
import type { ICrumbProps } from "@lib/crumbs"
import { BaseThreeQuarterLayout } from "./base-three-quarter-layout"
import { ContentLayout } from "./content-layout"

export interface IProps extends ILayoutProps, ICrumbProps {
  isRight?: boolean
}

export function ThreeQuarterLayout({
  title,

  tab,
  crumbs,
  isRight = true,
  className,
  headerChildren,
  children,
}: IProps) {
  return (
    <ContentLayout
      title={title}
      tab={tab}
      showTitle={false}
      showCrumbs={false}
      headerChildren={headerChildren}
      className={className}
    >
      <BaseThreeQuarterLayout
        title={title}
        tab={tab}
        isRight={isRight}
        crumbs={crumbs}
      >
        {children}
      </BaseThreeQuarterLayout>
    </ContentLayout>
  )
}
