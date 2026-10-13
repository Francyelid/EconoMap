import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const basketSummaryClasses = {
  caption: sharedClasses.tinyText,
  chartCard: "mx-4 mt-4 rounded-2xl p-4",
  chartHeader: "flex items-start justify-between mb-2",
  chartTitle: sharedClasses.smallBoldText,
  summary: "text-right",
  total: "font-mono font-bold text-lg leading-tight",
  variation: sharedClasses.tinyBoldText,
} as const

export function createBasketSummaryStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    card: sharedStyles.card(pal),
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    variation: sharedStyles.priceVariation,
  }
}
