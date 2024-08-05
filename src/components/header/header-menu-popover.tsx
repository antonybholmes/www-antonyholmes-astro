import { type IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"

//import { PrimaryColorLink } from "@components/link/primary-color-link"
import { VCenterRow } from "@components/v-center-row"
import { useState } from "react"

import { Popover, PopoverContent } from "@components/shadcn/ui/themed/popover"

import { BaseLink } from "@components/link/base-link"
import { PrimaryColorLink } from "@components/link/primary-color-link"
import { Button } from "@components/shadcn/ui/themed/button"
import type { ILinkProps } from "@interfaces/link-props"
import { PopoverAnchor } from "@radix-ui/react-popover"
import { MenuButtonIcon } from "./menu-button-icon"
//import { MenuButtonIcon } from "./menu-button-icon"

export function ModuleButtonLink({
  className,
  children,
  ...props
}: ILinkProps) {
  return (
    <BaseLink
      className={cn(
        "w-28 flex overflow-hidden flex-col items-center shrink-0 grow-0 justify-start gap-y-2 py-3 rounded border border-transparent hover:shadow-lg   hover:border-border/50 focus-visible:shadow-lg focus-visible:border-border/25 ",
        className,
      )}
      {...props}
    >
      {children}
    </BaseLink>
  )
}

// export function HeaderLinks({ onClick, className }: IProps) {
//   // sort alphabetically and ignore sections
//   const items = HEADER_LINKS.map(section => {
//     return section.modules.filter(
//       module => module.mode !== "dev" || process.env.NODE_ENV !== "production",
//     )
//   })
//     .flat()
//     .sort((modA, modB) => modA.name.localeCompare(modB.name))
//     .map((module, moduleIndex) => {
//       return (
//         <li key={moduleIndex}>
//           <ModuleButtonLink
//             href={module.slug}
//             onClick={onClick}
//             aria-label={module.name}
//             target="_blank"
//             title={module.description}
//           >
//             {/* <GearIcon className="mt-1"/> */}

//             <div
//               className="flex h-7 w-7 shrink-0 flex-row items-center justify-center rounded-full text-sm text-white/95"
//               style={{
//                 backgroundColor: module.color ?? "lightslategray",
//               }}
//             >
//               <span className="font-semibold">{module.name[0].toUpperCase()}</span>
//               <span>{module.name[1].toLowerCase()}</span>
//             </div>

//             <p className="text-xs text-center truncate">{module.name}</p>
//             {/* <p className="text-xs text-foreground/50 text-center truncate">
//                   {module.description}
//                 </p> */}
//           </ModuleButtonLink>
//         </li>
//       )
//     })

//   return (
//     <ul
//       className={cn(
//         "p-2 pb-6 gap-y-6 overflow-y-auto custom-scrollbar grid grid-cols-4 gap-2",
//         className,
//       )}
//     >
//       {items}
//     </ul>
//   )
// }

interface IFileMenu extends IElementProps {
  tab?: string
}

export function HeaderMenuPopover({ tab }: IFileMenu) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open}>
      <PopoverAnchor asChild>
        <Button
          id="header-menu-popover-button"
          variant="trans"
          size="none"
          rounded="none"
          ripple={false}
          selected={open}
          onClick={() => setOpen(!open)}
          className="h-11 w-11"
          aria-label={open ? "Close Menu" : "Open Menu"}
        >
          <MenuButtonIcon fill="fill-white/90" />
        </Button>
      </PopoverAnchor>

      <PopoverContent
        onEscapeKeyDown={() => setOpen(false)}
        onInteractOutside={e => {
          // @ts-ignore
          if (e.target?.id !== "header-menu-popover-button") {
            setOpen(false)
          }
        }}
        align="start"
        alignOffset={8}
        className="text-xs flex flex-col p-2 bg-background/70 backdrop-blur-xl"
      >
        {/* <HeaderLinks tab={tab} onClick={() => setOpen(false)} /> */}

        <VCenterRow className="px-4 pb-4 gap-x-5 justify-end">
          <PrimaryColorLink
            href="/about"
            aria-label="About"
            className="text-xs"
          >
            About
          </PrimaryColorLink>
          <PrimaryColorLink
            href="/privacy"
            aria-label="Privacy"
            className="text-xs"
          >
            Privacy
          </PrimaryColorLink>
        </VCenterRow>
      </PopoverContent>
    </Popover>
  )
}
