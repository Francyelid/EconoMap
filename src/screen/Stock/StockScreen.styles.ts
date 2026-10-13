import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"

export const stockScreenClasses = {
  screen: sharedClasses.screen,
  header: sharedClasses.pageHeader,
} as const

export function createStockScreenStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  return {
    header: sharedStyles.pageHeader(pal),
  }
}
