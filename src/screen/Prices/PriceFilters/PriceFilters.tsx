import {
  priceFiltersClasses,
  createPriceFiltersStyles,
} from "./PriceFilters.styles"
import type { dmPalette } from "@/theme"
import { sharedChartAppearance } from "@/screen/shared/styles"
import type { PricePeriod } from "../types"

type PriceFiltersProps = {
  palette: ReturnType<typeof dmPalette>
  search: string
  setSearch: (value: string) => void
  mktFilter: string
  setMktFilter: (value: string) => void
  maxPriceFilter: string
  setMaxPriceFilter: (value: string) => void
  periodFilter: PricePeriod
  setPeriodFilter: (value: PricePeriod) => void
  dateFrom: string
  setDateFrom: (value: string) => void
  dateTo: string
  setDateTo: (value: string) => void
  allMktNames: string[]
}

export default function PriceFilters({
  palette: pal,
  search,
  setSearch,
  mktFilter,
  setMktFilter,
  maxPriceFilter,
  setMaxPriceFilter,
  periodFilter,
  setPeriodFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  allMktNames,
}: PriceFiltersProps) {
  const styles = createPriceFiltersStyles(pal)
  return (
    <div className={priceFiltersClasses.filters}>
      <div className={priceFiltersClasses.search} style={styles.search}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={styles.secondaryText.color}
          strokeWidth="2.5"
          strokeLinecap={sharedChartAppearance.lineCap}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className={priceFiltersClasses.searchInput}
          style={styles.primaryText}
          placeholder="Buscar produto…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className={priceFiltersClasses.clearButton}
            style={styles.mutedText}
          >
            ✕
          </button>
        )}
      </div>
      <div className={priceFiltersClasses.filterRow}>
        <select
          className={priceFiltersClasses.marketSelect}
          style={styles.input}
          value={mktFilter}
          onChange={(e) => setMktFilter(e.target.value)}
        >
          {allMktNames.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <div className={priceFiltersClasses.maxPrice} style={styles.search}>
          <span
            className={priceFiltersClasses.maxPriceLabel}
            style={styles.secondaryText}
          >
            Até R$
          </span>
          <input
            type="number"
            className={priceFiltersClasses.maxPriceInput}
            style={styles.primaryText}
            placeholder="—"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
          />
        </div>
      </div>
      {/* Period filter */}
      <div className={priceFiltersClasses.periodGroup} style={styles.border}>
        {([
          { k: "all", l: "Tudo" },

          { k: "custom", l: "📅 Data específica" },
        ] as const).map(({ k, l }) => (
          <button
            key={k}
            onClick={() => setPeriodFilter(k)}
            className={priceFiltersClasses.periodButton}
            style={styles.periodButton(periodFilter === k)}
          >
            {l}
          </button>
        ))}
      </div>
      {/* Custom date range */}
      {periodFilter === "custom" && (
        <div className={priceFiltersClasses.dateRow}>
          <div className={priceFiltersClasses.dateField}>
            <label
              className={priceFiltersClasses.dateLabel}
              style={styles.secondaryText}
            >
              De
            </label>
            <input
              type="date"
              className={priceFiltersClasses.dateInput}
              style={styles.input}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className={priceFiltersClasses.dateField}>
            <label
              className={priceFiltersClasses.dateLabel}
              style={styles.secondaryText}
            >
              Até
            </label>
            <input
              type="date"
              className={priceFiltersClasses.dateInput}
              style={styles.input}
              value={dateTo}
              min={dateFrom}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
