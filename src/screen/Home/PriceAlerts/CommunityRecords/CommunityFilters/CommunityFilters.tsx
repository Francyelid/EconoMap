import {
  communityFiltersClasses,
  createCommunityFiltersStyles,
} from "./CommunityFilters.styles"
import type { CommunityPalette, TrendFilter } from "../types"

type CommunityFiltersProps = {
  palette: Pick<CommunityPalette, "inputBg" | "border" | "textPrimary" | "textSecondary" | "textMuted">
  dark: boolean
  search: string
  setSearch: (value: string) => void
  mktFilter: string
  setMktFilter: (value: string) => void
  trendFilter: TrendFilter
  setTrendFilter: (value: TrendFilter) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  allMarkets: string[]
}

export default function CommunityFilters({
  palette: pal,
  dark,
  search,
  setSearch,
  mktFilter,
  setMktFilter,
  trendFilter,
  setTrendFilter,
  maxPrice,
  setMaxPrice,
  allMarkets,
}: CommunityFiltersProps) {
  const styles = createCommunityFiltersStyles(pal, dark)
  return (
    <div className={communityFiltersClasses.filters}>
      {/* Search */}
      <div
        className={communityFiltersClasses.searchContainer}
        style={styles.searchContainer}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={pal.textSecondary}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className={communityFiltersClasses.searchInput}
          style={styles.primaryText}
          placeholder="Buscar produto ou mercado…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className={communityFiltersClasses.clearButton}
            style={styles.mutedText}
          >
            ✕
          </button>
        )}
      </div>

      {/* Row: market + price + trend */}
      <div className={communityFiltersClasses.filterRow}>
        {/* Market select */}
        <select
          className={communityFiltersClasses.select}
          style={styles.select}
          value={mktFilter}
          onChange={(e) => setMktFilter(e.target.value)}
        >
          {allMarkets.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        {/* Max price */}
        <div
          className={communityFiltersClasses.maxPriceContainer}
          style={styles.maxPriceContainer}
        >
          <span
            className={communityFiltersClasses.maxPriceLabel}
            style={styles.secondaryText}
          >
            Até R$
          </span>
          <input
            type="number"
            className={communityFiltersClasses.maxPriceInput}
            style={styles.primaryText}
            placeholder="—"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Trend filter */}
        <div
          className={communityFiltersClasses.trendGroup}
          style={styles.trendGroup}
        >
          {([
            ["all", "Todos"],
            ["down", "▼"],
            ["up", "▲"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTrendFilter(k)}
              className={communityFiltersClasses.trendButton}
              style={styles.trendButton(trendFilter, k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
