import { cn } from "@lib/class-names"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ROUNDED_MD_CLS } from "@theme"
import * as React from "react"

export const TABS_CLS = cn(
  ROUNDED_MD_CLS,
  "h-8 inline-flex flex-row justify-center bg-muted p-0.5 text-foreground/50",
)

export const TRIGGER_SELECTED_CLS =
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"

export const TRIGGER_CLS = cn(
  TRIGGER_SELECTED_CLS,
  "trans-300 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 transition-all disabled:opacity-50 data-[state=active]:font-medium data-[state=active]:bg-background data-[state=active]:shadow data-[state=active]:text-primary data-[state=inactive]:hover:text-foreground",
)

//const CONTENT_CLS = "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export const Tabs = TabsPrimitive.Root

export const BaseTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={className} {...props} />
))
BaseTabsList.displayName = "BaseTabsList" //TabsPrimitive.List.displayName

export const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabsList>,
  React.ComponentPropsWithoutRef<typeof BaseTabsList>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => (
  <BaseTabsList ref={ref} className={cn(TABS_CLS, className)} {...props} />
))
TabsList.displayName = "TabsList" //TabsPrimitive.List.displayName

interface IBaseTabsTrigger
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  selected?: boolean
}

export const BaseTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  IBaseTabsTrigger
  // eslint-disable-next-line react/prop-types
>(({ selected = false, className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TRIGGER_SELECTED_CLS, className)}
    data-selected={selected}
    {...props}
  />
))
BaseTabsTrigger.displayName = "BaseTabsTrigger" //TabsPrimitive.Trigger.displayName

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof BaseTabsTrigger>,
  React.ComponentPropsWithoutRef<typeof BaseTabsTrigger>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => (
  <BaseTabsTrigger
    ref={ref}
    className={cn(TRIGGER_CLS, className)}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger" //TabsPrimitive.Trigger.displayName

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={className} {...props} />
))
TabsContent.displayName = "TabsContent" //TabsPrimitive.Content.displayName
