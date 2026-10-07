import { marketListClasses, createMarketListStyles } from "./MarketList.styles"
import type { Market } from "@/interfaces/Market"
import { dmPalette, useDark } from "@/theme"
import { priceLabel, TYPE_EMOJI } from "../marketUtils"

export type PriceFilter = "all" | "cheap" | "mid" | "expensive"

type MarketListProps = {
  markets: Market[]
  allTypes: string[]
  searchFilter: string
  onSearchFilterChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  priceFilter: PriceFilter
  onPriceFilterChange: (value: PriceFilter) => void
}

export default function MarketList({
  markets: sorted,
  allTypes,
  searchFilter,
  onSearchFilterChange: setSearchFilter,
  typeFilter,
  onTypeFilterChange: setTypeFilter,
  priceFilter,
  onPriceFilterChange: setPriceFilter,
}: MarketListProps) {
  const p = dmPalette(useDark())

  const styles = createMarketListStyles(p)

  return (
    <>
      {/* Filters for list view */}
      <div className={marketListClasses.filters}>
        <div className={marketListClasses.search} style={styles.search}>
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
            className={marketListClasses.searchInput}
            style={styles.primaryText}
            placeholder="Buscar mercado…"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter("")}
              className={marketListClasses.clearSearch}
              style={styles.mutedText}
            >
              ✕
            </button>
          )}
        </div>
        <div className={marketListClasses.filterRow}>
          <select
            className={marketListClasses.select}
            style={styles.select}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {allTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <div
            className={marketListClasses.priceFilters}
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
                className={marketListClasses.priceFilter}
                style={styles.priceFilter(priceFilter === k)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      {sorted.length === 0 && (
        <div className={marketListClasses.empty} style={styles.secondaryText}>
          <p className={marketListClasses.emptyIcon}>🔍</p>
          <p className={marketListClasses.emptyMessage}>
            Nenhum mercado encontrado
          </p>
        </div>
      )}
      {sorted.map((m) => (
        <div key={m.id} className={marketListClasses.card} style={styles.card}>
          <div className={marketListClasses.cardContent}>
            <div
              className={marketListClasses.icon}
              style={styles.icon(m.priceIndex)}
            >
              {TYPE_EMOJI[m.type] ?? "🏬"}
            </div>
            <div className={marketListClasses.details}>
              <div className={marketListClasses.titleRow}>
                <p
                  className={marketListClasses.name}
                  style={styles.primaryText}
                >
                  {m.name}
                </p>
                <span
                  className={marketListClasses.priceBadge}
                  style={styles.priceBadge(m.priceIndex)}
                >
                  {priceLabel(m.priceIndex)}
                </span>
              </div>
              <p
                className={marketListClasses.address}
                style={styles.secondaryText}
              >
                {m.address}
              </p>
              <div
                className={marketListClasses.metadata}
                style={styles.secondaryText}
              >
                <span>📍 {m.distance} km</span>
                <span>⭐ {m.rating}</span>
                <span>{m.type}</span>
              </div>
              <div className={marketListClasses.communityRow}>
                <span
                  className={marketListClasses.communityBadge}
                  style={styles.communityBadge}
                >
                  👥 {m.registros} registros de usuários
                </span>
              </div>
              <div className={marketListClasses.priceSection}>
                <div className={marketListClasses.priceHeader}>
                  <span>Índice de preço</span>
                  <span>{m.priceIndex}/100</span>
                </div>
                <div className={marketListClasses.priceTrack}>
                  <div
                    className={marketListClasses.priceBar}
                    style={styles.priceBar(m.priceIndex)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
