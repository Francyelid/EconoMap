import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"
import { priceColor } from "@/screen/Map/marketUtils"

export const marketListClasses = {
  filters: sharedClasses.list,
  search: "flex items-center gap-2 rounded-xl px-3 py-2.5",
  searchInput: sharedClasses.searchInput,
  clearSearch: sharedClasses.smallText,
  filterRow: sharedClasses.filterRow,
  select: sharedClasses.select,
  priceFilters: sharedClasses.filterGroup,
  priceFilter: "px-2.5 py-2 text-[10px] font-bold transition-all",
  empty: "text-center py-10",
  emptyIcon: sharedClasses.emptyIcon,
  emptyMessage: sharedClasses.emphasizedText,
  card: "rounded-2xl p-4 shadow-sm",
  cardContent: "flex items-start gap-3",
  icon: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
  details: sharedClasses.details,
  titleRow: "flex items-start justify-between gap-1",
  name: "font-bold text-sm leading-tight",
  priceBadge: sharedClasses.priceBadge,
  address: sharedClasses.caption,
  metadata: "flex gap-3 mt-2 text-xs",
  communityRow: "flex items-center gap-1 mt-1.5",
  communityBadge: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
  priceSection: "mt-2.5",
  priceHeader: "flex justify-between text-[10px] text-slate-400 mb-1",
  priceTrack: "h-1.5 bg-slate-100 rounded-full overflow-hidden",
  priceBar: "h-full rounded-full",
} as const

export function createMarketListStyles(p: ReturnType<typeof dmPalette>) {
  return {
    search: sharedStyles.searchContainer(p),
    primaryText: sharedStyles.primaryText(p),
    mutedText: sharedStyles.mutedText(p),
    select: sharedStyles.input(p),
    priceFilters: sharedStyles.border(p),
    priceFilter: (active: boolean): CSSProperties => ({
      background: active ? "var(--color-brand-green)" : p.inputBg,
      color: active ? "#fff" : p.textSecondary,
    }),
    secondaryText: sharedStyles.secondaryText(p),
    card: sharedStyles.card(p),
    icon: (priceIndex: number): CSSProperties => ({
      background: priceColor(priceIndex) + "18",
    }),
    priceBadge: sharedStyles.priceBadge,
    communityBadge: sharedStyles.communityBadge,
    priceBar: (priceIndex: number): CSSProperties => ({
      width: `${priceIndex}%`,
      background: priceColor(priceIndex),
    }),
  }
}
