import {
  marketFiltersClasses,
  createMarketFiltersStyles,
} from "./MarketFilters.styles"
import type { dmPalette } from "@/theme"
import type { PriceFilter } from "../types"

type MarketFiltersProps = {
  palette: ReturnType<typeof dmPalette>
  allTypes: string[]
  searchFilter: string
  onSearchFilterChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  priceFilter: PriceFilter
  onPriceFilterChange: (value: PriceFilter) => void
}

export default function MarketFilters({
  palette: p,
  allTypes,
  searchFilter,
  onSearchFilterChange: setSearchFilter,
  typeFilter,
  onTypeFilterChange: setTypeFilter,
  priceFilter,
  onPriceFilterChange: setPriceFilter,
}: MarketFiltersProps) {
  const styles = createMarketFiltersStyles(p)
  return (
    <div className={marketFiltersClasses.filters}>
      <div className={marketFiltersClasses.search} style={styles.search}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={styles.secondaryText.color}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className={marketFiltersClasses.searchInput}
          style={styles.primaryText}
          placeholder="Buscar mercado…"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        {searchFilter && (
          <button
            onClick={() => setSearchFilter("")}
            className={marketFiltersClasses.clearSearch}
            style={styles.mutedText}
          >
            ✕
          </button>
        )}
      </div>
      <div className={marketFiltersClasses.filterRow}>
        <select
          className={marketFiltersClasses.select}
          style={styles.select}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {allTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <div
          className={marketFiltersClasses.priceFilters}
          style={styles.priceFilters}
        >
          {([
            ["all", "Todos"],
            ["cheap", "Barato"],
            ["mid", "Médio"],
            ["expensive", "Caro"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setPriceFilter(k)}
              className={marketFiltersClasses.priceFilter}
              style={styles.priceFilter(priceFilter === k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
