import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const purchaseCalculatorClasses = {
  overlay: sharedClasses.overlay,
  sheet: sharedClasses.sheet,
  handleContainer: sharedClasses.handleContainer,
  handle: sharedClasses.handle,
  content: sharedClasses.scrollingContent,
} as const

export function createPurchaseCalculatorStyles(
  pal: ReturnType<typeof dmPalette>,
) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: { background: pal.bg, height: "88%" } satisfies CSSProperties,
    handle: sharedStyles.handle(pal),
  }
}
