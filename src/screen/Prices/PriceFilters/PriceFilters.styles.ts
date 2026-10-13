import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const priceFiltersClasses = {
  filters: sharedClasses.list,
  search: sharedClasses.spaciousSearchContainer,
  searchInput: sharedClasses.searchInput,
  clearButton: sharedClasses.smallText,
  filterRow: sharedClasses.filterRow,
  marketSelect: sharedClasses.select,
  maxPrice: "flex items-center gap-1 rounded-xl px-3 py-2",
  maxPriceLabel: sharedClasses.tinyBoldText,
  maxPriceInput: "w-14 bg-transparent text-xs font-mono font-bold outline-none",
  periodGroup: sharedClasses.filterGroup,
  periodButton: "flex-1 py-2 text-[11px] font-bold transition-all",
  dateRow: "flex gap-2 items-center",
  dateField: sharedClasses.fill,
  dateLabel: "text-[10px] font-bold uppercase tracking-widest mb-1 block",
  dateInput: "w-full rounded-xl px-3 py-2 text-xs outline-none",
} as const

export function createPriceFiltersStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    search: sharedStyles.searchContainer(pal),
    mutedText: sharedStyles.mutedText(pal),
    input: sharedStyles.input(pal),
    border: sharedStyles.border(pal),
    periodButton: (selected: boolean): CSSProperties =>
      sharedStyles.selectedFilter(pal, selected),
  }
}
