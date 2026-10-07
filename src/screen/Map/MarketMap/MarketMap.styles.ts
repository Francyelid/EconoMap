import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const marketMapClasses = {
  selectedCard: "bg-white rounded-2xl p-4 border border-slate-200 shadow-sm",
  header: "flex items-start justify-between",
  identity: "flex items-start gap-2.5",
  icon: "text-2xl",
  name: "font-bold text-slate-900",
  address: "text-xs text-slate-500",
  closeButton: "text-slate-300 text-lg leading-none p-0.5",
  stats: "grid grid-cols-3 gap-2 mt-3",
  stat: "bg-slate-50 rounded-xl p-2 text-center",
  statLabel: sharedClasses.statLabel,
  statValue: "font-bold text-slate-900 text-sm mt-0.5",
  priceStat: "rounded-xl p-2 text-center",
  priceValue: "font-bold text-sm mt-0.5",
  communityRow:
    "flex items-center justify-center gap-1 mt-2 px-2 py-1.5 rounded-xl",
  communityIcon: sharedClasses.smallText,
  communityText: "text-[11px] font-semibold",
} as const

export function createMarketMapStyles() {
  return {
    priceBackground: sharedStyles.priceBackground,
    priceText: sharedStyles.priceText,
    communityBackground: sharedStyles.communityBackground,
    communityText: sharedStyles.communityText,
  }
}
