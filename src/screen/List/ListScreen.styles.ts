import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"
export const listScreenClasses = {
  screen: sharedClasses.screen,
  content: "flex-1 overflow-y-auto px-4 py-3",
} as const

export function createListScreenStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    background: sharedStyles.pageBackground(pal),
  }
}
