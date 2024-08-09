import { VCenterRow } from "@components/v-center-row"

import { cn } from "@lib/class-names"
import { type ReactNode } from "react"

import { ContentDiv } from "@components/content-div"
import type { IElementProps } from "@interfaces/element-props"
import HeaderLinks from "./header-links"
import { Logo } from "./logo"
// import { LoggedInComp } from "@modules/edb"
// import { HeaderMenuPopover } from "./header-menu-popover"

export interface IHeaderChildrenProps {
  headerLeftChildren?: ReactNode
  headerCenterChildren?: ReactNode
  headerRightChildren?: ReactNode
}

export interface IHeaderProps extends IElementProps, IHeaderChildrenProps {
  tab?: string
}

export function Header({
  title,
  tab,
  className,
  headerLeftChildren,
  headerRightChildren,
  children,
}: IHeaderProps) {
  // const [, setScrollY] = useState(0)

  // const handleScroll = () => {
  //   setScrollY(window.scrollY)
  // }

  // useWindowScrollListener(handleScroll)

  // useWindowResize(({ width, height }) => {
  //   // If larger than medium, auto close menu
  //   if (width > 800) {
  //     setShowMenu(false)
  //   }
  // })

  // function onClick() {
  //   setShowMenu(!showMenu) //toggleHeight()
  // }

  return (
    <ContentDiv>
      <header className={cn("grid grid-cols-4", className)}>
        <VCenterRow className="gap-x-8">
          {/* <HeaderMenuPopover /> */}
          <Logo />
          <HeaderLinks title={title} tab={tab} />
          {headerLeftChildren}
        </VCenterRow>

        <VCenterRow className="justify-center col-span-2">
          {children}
        </VCenterRow>

        <VCenterRow className="gap-x-2 justify-end pr-2">
          {headerRightChildren}

          {/* <LoggedInComp /> */}
          {/* <ThemeMenu /> */}
        </VCenterRow>
      </header>
    </ContentDiv>
  )
}
