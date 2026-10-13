import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { priceColor } from "../marketUtils"

export const marketCardClasses = {
  card: sharedClasses.shadowCard,
  cardContent: sharedClasses.itemRow,
  icon: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
  details: sharedClasses.details,
  titleRow: "flex items-start justify-between gap-1",
  name: "font-bold text-sm leading-tight",
  priceBadge: sharedClasses.priceBadge,
  address: sharedClasses.caption,
  metadata: "flex gap-3 mt-2 text-xs",
  communityRow: "flex items-center gap-1 mt-1.5",
  communityBadge: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
} as const

export function createMarketCardStyles(p: ReturnType<typeof dmPalette>) {
  return {
    primaryText: sharedStyles.primaryText(p),
    secondaryText: sharedStyles.secondaryText(p),
    card: sharedStyles.card(p),
    icon: (priceIndex: number): CSSProperties => ({
      background: priceColor(priceIndex) + "18",
    }),
    priceBadge: sharedStyles.priceBadge,
    communityBadge: sharedStyles.communityBadge,
  }
}
