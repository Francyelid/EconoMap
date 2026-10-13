import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { dmPalette } from "@/theme"

export const marketListClasses = {
  empty: "text-center py-10",
  emptyIcon: sharedClasses.emptyIcon,
  emptyMessage: sharedClasses.emphasizedText,
} as const

export function createMarketListStyles(p: ReturnType<typeof dmPalette>) {
  return {
    secondaryText: sharedStyles.secondaryText(p),
  }
}
