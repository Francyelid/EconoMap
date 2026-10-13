import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"

export const stockItemsListClasses = {
  content: "flex-1 overflow-y-auto px-4 py-3 space-y-2",
  empty: sharedClasses.emptyList,
  emptyIcon: sharedClasses.emptyListIcon,
  emptyTitle: sharedClasses.itemName,
} as const

export function createStockItemsListStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  return {
    background: sharedStyles.pageBackground(pal),
    mutedText: sharedStyles.mutedText(pal),
  }
}
