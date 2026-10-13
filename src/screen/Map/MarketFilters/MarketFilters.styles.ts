import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const marketFiltersClasses = {
  filters: sharedClasses.list,
  search: sharedClasses.spaciousSearchContainer,
  searchInput: sharedClasses.searchInput,
  clearSearch: sharedClasses.smallText,
  filterRow: sharedClasses.filterRow,
  select: sharedClasses.select,
  priceFilters: sharedClasses.filterGroup,
  priceFilter: "px-2.5 py-2 text-[10px] font-bold transition-all",
} as const

export function createMarketFiltersStyles(p: ReturnType<typeof dmPalette>) {
  return {
    search: sharedStyles.searchContainer(p),
    primaryText: sharedStyles.primaryText(p),
    mutedText: sharedStyles.mutedText(p),
    select: sharedStyles.input(p),
    priceFilters: sharedStyles.border(p),
    priceFilter: (active: boolean): CSSProperties =>
      sharedStyles.selectedFilter(p, active),
    secondaryText: sharedStyles.secondaryText(p),
  }
}
