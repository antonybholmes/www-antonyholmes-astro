import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { DotFilledIcon } from "@radix-ui/react-icons"

import { CheckIcon } from "@components/icons/check-icon"
import { ChevronRightIcon } from "@components/icons/chevron-right-icon"
import { cn } from "@lib/class-names"
import { BUTTON_H_CLS, ROUNDED_CLS, ROW_BUTTON_CLS } from "@theme"
import {
  Children,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  const c = Children.toArray(children)
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        BUTTON_H_CLS,
        "flex cursor-default select-none flex-row items-center gap-x-1 px-2 text-xs outline-none focus:bg-muted data-[state=open]:bg-muted ",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      <span className="flex w-6 shrink-0">{c.length > 1 && c[0]}</span>

      <span className="min-w-24 grow">{c.length > 1 ? c[1] : c[0]}</span>

      <span className="flex w-6 shrink-0 justify-end">
        <ChevronRightIcon className="ml-auto" />
      </span>
    </DropdownMenuPrimitive.SubTrigger>
  )
})

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      ROUNDED_CLS,
      "z-modal min-w-56 border border-border bg-popover text-xs py-1.5 px-px text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        ROUNDED_CLS,
        "flex flex-col text-xs px-px gap-y-0.5 py-1.5 z-modal min-w-48 overflow-hidden border border-border/50 bg-popover text-popover-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuPrimitiveItem = DropdownMenuPrimitive.Item

const DROPDOWN_MENU_CLS = cn(
  BUTTON_H_CLS,
  ROW_BUTTON_CLS,
  "relative border border-transparent cursor-default select-none gap-x-1 outline-none focus:bg-muted focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
)

export const DROPDOWN_MENU_ICON_CONT_CLS = cn(
  BUTTON_H_CLS,
  "flex flex-row items-center shrink-0 grow-0 justify-center w-7",
)

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveItem> & {
    inset?: boolean
    checked?: boolean
  }
>(({ className, inset = false, checked = false, children, ...props }, ref) => {
  const c = Children.toArray(children)

  return (
    <DropdownMenuPrimitiveItem
      ref={ref}
      className={cn(
        DROPDOWN_MENU_CLS,
        [inset, "pl-8"],
        [checked, "bg-muted border-border"],
        className,
      )}
      {...props}
    >
      <span className={DROPDOWN_MENU_ICON_CONT_CLS}>
        {c.length > 1 && c[0]}
      </span>

      {c.length > 0 && (
        <span className="grow">{c.length > 1 ? c[1] : c[0]} </span>
      )}

      {c.length > 2 && (
        <span className={DROPDOWN_MENU_ICON_CONT_CLS}>{c[2]}</span>
      )}
    </DropdownMenuPrimitiveItem>
  )
})
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const c = Children.toArray(children)

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        BUTTON_H_CLS,
        ROUNDED_CLS,
        "relative flex cursor-default select-none flex-row items-center gap-x-1 text-xs outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[state=checked]:bg-muted data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="inline-flex flex-row">
        <span className={DROPDOWN_MENU_ICON_CONT_CLS}>
          <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon w="w-4" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>

        {c.length > 1 && (
          <span className={DROPDOWN_MENU_ICON_CONT_CLS}>{c[1]}</span>
        )}
      </span>

      {c.length > 0 && <span className="grow">{c[0]}</span>}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      ROUNDED_CLS,
      BUTTON_H_CLS,
      "relative flex cursor-default select-none items-center text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className={DROPDOWN_MENU_ICON_CONT_CLS}>
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pl-9 text-xs font-medium",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const MenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
))
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuPrimitiveItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  MenuSeparator,
}
