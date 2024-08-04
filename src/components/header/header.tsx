import { VCenterRow } from "@components/v-center-row"

import { cn } from "@lib/class-names"
import { type ReactNode } from "react"

import type { IElementProps } from "@interfaces/element-props"
import { HeaderMenuPopover } from "./header-menu-popover"
import { Logo } from "./logo"
// import { LoggedInComp } from "@modules/edb"
// import { HeaderMenuPopover } from "./header-menu-popover"

export interface IHeaderChildrenProps {
  headerLeftChildren?: ReactNode
  headerCenterChildren?: ReactNode
  headerRightChildren?: ReactNode
}

export interface IHeaderProps extends IElementProps, IHeaderChildrenProps {
  name?: string
  tab?: string
}

export function Header({
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
    <header className={cn("grid grid-cols-4 h-11", className)}>
      <VCenterRow className="gap-x-2">
        <HeaderMenuPopover />
        <Logo />
        {headerLeftChildren}
      </VCenterRow>

      <VCenterRow className="justify-center col-span-2">{children}</VCenterRow>

      <VCenterRow className="gap-x-2 justify-end pr-2">
        {headerRightChildren}

        {/* <LoggedInComp /> */}
        {/* <ThemeMenu /> */}
      </VCenterRow>
    </header>
  )
}
