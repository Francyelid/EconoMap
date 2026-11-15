export type MapView = "map" | "list"
import type { MarketType, MarketTypeFilter } from "@/models/MarketType"
import type { PriceFilter } from "@/business/market"
export type { PriceFilter } from "@/business/market"

export type MarketFiltersProps = {
  allTypes: readonly MarketType[]
  searchFilter: string
  onSearchFilterChange: (value: string) => void
  typeFilter: MarketTypeFilter
  onTypeFilterChange: (value: MarketTypeFilter) => void
  priceFilter: PriceFilter
  onPriceFilterChange: (value: PriceFilter) => void
}
