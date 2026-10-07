import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const seasonalInsightClasses = {
  card: sharedClasses.paddedCard,
  title: "text-xs font-bold mb-1.5",
  description: "text-xs leading-relaxed",
} as const

export function createSeasonalInsightStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    card: sharedStyles.alternateCard(pal),
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
  }
}
