import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const marketRankingClasses = {
  toggle: "w-full flex items-center justify-between mb-2",
  title: "text-xs font-bold text-slate-600",
  toggleLabel: "flex items-center gap-1 text-[10px] font-semibold",
  card: "flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 mb-1.5 border border-slate-100 shadow-sm cursor-pointer active:scale-98 transition-transform",
  position:
    "w-5 h-5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center flex-shrink-0",
  icon: "text-base",
  details: sharedClasses.details,
  name: "text-xs font-semibold text-slate-900 truncate",
  distance: sharedClasses.statLabel,
  priceBadge: sharedClasses.priceBadge,
} as const

export function createMarketRankingStyles() {
  return {
    accent: sharedStyles.accentText,
    chevron: (rankingCollapsed: boolean): CSSProperties =>
      sharedStyles.chevronRotation(rankingCollapsed ? -90 : 90),
    priceBadge: sharedStyles.priceBadge,
  }
}
