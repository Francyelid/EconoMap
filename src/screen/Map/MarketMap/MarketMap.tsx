import { marketMapClasses, createMarketMapStyles } from "./MarketMap.styles"
import type { Market } from "@/interfaces/Market"
import { priceLabel, TYPE_EMOJI } from "../marketUtils"
import MapDrawing from "./MapDrawing/MapDrawing"
import MarketRanking from "./Ranking/MarketRanking"

type MarketMapProps = {
  markets: Market[]
  rankedMarkets: Market[]
  selected: Market | null
  onSelectMarket: (market: Market | null) => void
  rankingCollapsed: boolean
  onToggleRanking: () => void
}

export default function MarketMap({
  markets,
  rankedMarkets,
  selected,
  onSelectMarket: setSelected,
  rankingCollapsed,
  onToggleRanking,
}: MarketMapProps) {
  const styles = createMarketMapStyles()

  return (
    <>
      <MapDrawing
        markets={markets}
        selected={selected}
        onSelectMarket={setSelected}
      />

      {/* Selected market */}
      {selected && (
        <div className={marketMapClasses.selectedCard}>
          <div className={marketMapClasses.header}>
            <div className={marketMapClasses.identity}>
              <span className={marketMapClasses.icon}>
                {TYPE_EMOJI[selected.type] ?? "🏬"}
              </span>
              <div>
                <p className={marketMapClasses.name}>{selected.name}</p>
                <p className={marketMapClasses.address}>{selected.address}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className={marketMapClasses.closeButton}
            >
              ✕
            </button>
          </div>
          <div className={marketMapClasses.stats}>
            <div className={marketMapClasses.stat}>
              <p className={marketMapClasses.statLabel}>Distância</p>
              <p className={marketMapClasses.statValue}>
                {selected.distance} km
              </p>
            </div>
            <div
              className={marketMapClasses.priceStat}
              style={styles.priceBackground(selected.priceIndex)}
            >
              <p className={marketMapClasses.statLabel}>Preços</p>
              <p
                className={marketMapClasses.priceValue}
                style={styles.priceText(selected.priceIndex)}
              >
                {priceLabel(selected.priceIndex)}
              </p>
            </div>
            <div className={marketMapClasses.stat}>
              <p className={marketMapClasses.statLabel}>Avaliação</p>
              <p className={marketMapClasses.statValue}>⭐ {selected.rating}</p>
            </div>
          </div>
          <div
            className={marketMapClasses.communityRow}
            style={styles.communityBackground}
          >
            <span className={marketMapClasses.communityIcon}>👥</span>
            <p
              className={marketMapClasses.communityText}
              style={styles.communityText}
            >
              {selected.registros} registros de usuários neste mercado
            </p>
          </div>
        </div>
      )}

      <MarketRanking
        markets={rankedMarkets}
        rankingCollapsed={rankingCollapsed}
        onToggleRanking={onToggleRanking}
        onSelectMarket={setSelected}
      />
    </>
  )
}
