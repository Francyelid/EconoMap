import type { CSSProperties } from "react"

import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { dmPalette } from "@/theme"

export const addToListClasses = {
  overlay: sharedClasses.overlay,
  sheet: sharedClasses.addItemSheet,
  handle: sharedClasses.centeredHandle,
  title: sharedClasses.formTitle,
} as const

export function createAddToListStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: sharedStyles.cardBackground(pal),
    handle: sharedStyles.handle(pal),
    title: sharedStyles.sectionTitle(pal),
  }
}
