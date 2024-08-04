import { type ISVGProps } from "./svg-props"

export const ICON_CLS = "shrink-0 aspect-square pointer-events-none"

export interface IIconProps extends ISVGProps {
  w?: string
  stroke?: string
  selected?: boolean
}
