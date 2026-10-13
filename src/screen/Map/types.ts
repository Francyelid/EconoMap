export type MapView = "map" | "list"
export type PriceFilter = "all" | "cheap" | "mid" | "expensive"

export type MarketFiltersProps = {
  allTypes: string[]
  searchFilter: string
  onSearchFilterChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  priceFilter: PriceFilter
  onPriceFilterChange: (value: PriceFilter) => void
}
