import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const stockHeaderClasses = {
  headerRow: sharedClasses.pageHeaderRow,
  title: sharedClasses.pageTitle,
  subtitle: sharedClasses.caption,
  addButton: sharedClasses.addIconButton,
} as const

export function createStockHeaderStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  return {
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    addButton: sharedStyles.accentBackground,
  }
}
