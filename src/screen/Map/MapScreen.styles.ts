import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { dmPalette } from "@/theme"

export const mapScreenClasses = {
  screen: sharedClasses.screen,
  content: "flex-1 overflow-y-auto px-4 py-4 space-y-3",
} as const

export function createMapScreenStyles(p: ReturnType<typeof dmPalette>) {
  return {
    background: sharedStyles.pageBackground(p),
  }
}
