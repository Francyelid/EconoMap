export type MapView = "map" | "list"
import type { PriceFilter } from "@/business/market"
export type { PriceFilter } from "@/business/market"

export type MarketFiltersProps = {
  allTypes: string[]
  searchFilter: string
  onSearchFilterChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  priceFilter: PriceFilter
  onPriceFilterChange: (value: PriceFilter) => void
}
