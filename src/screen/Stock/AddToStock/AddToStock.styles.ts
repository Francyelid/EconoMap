import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const addToStockClasses = {
  overlay: sharedClasses.overlay,
  sheet: sharedClasses.addItemSheet,
  handle: sharedClasses.centeredHandle,
  title: sharedClasses.formTitle,
} as const

export function createAddToStockStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: sharedStyles.cardBackground(pal),
    handle: sharedStyles.handle(pal),
    title: sharedStyles.sectionTitle(pal),
  }
}
