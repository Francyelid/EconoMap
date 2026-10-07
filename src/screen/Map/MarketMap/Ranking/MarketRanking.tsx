import {
  marketRankingClasses,
  createMarketRankingStyles,
} from "./MarketRanking.styles"
import type { Market } from "@/interfaces/Market"
import { priceLabel, TYPE_EMOJI } from "../../marketUtils"

type MarketRankingProps = {
  markets: Market[]
  rankingCollapsed: boolean
  onToggleRanking: () => void
  onSelectMarket: (market: Market) => void
}

export default function MarketRanking({
  markets,
  rankingCollapsed,
  onToggleRanking,
  onSelectMarket,
}: MarketRankingProps) {
  const styles = createMarketRankingStyles()

  return (
    <div>
      <button onClick={onToggleRanking} className={marketRankingClasses.toggle}>
        <p className={marketRankingClasses.title}>Ranking por preço</p>
        <div className={marketRankingClasses.toggleLabel} style={styles.accent}>
          {rankingCollapsed ? "Expandir" : "Minimizar"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={styles.accent.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={styles.chevron(rankingCollapsed)}
          >
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </div>
      </button>
      {!rankingCollapsed &&
        markets.map((m, i) => (
          <div
            key={m.id}
            onClick={() => onSelectMarket(m)}
            className={marketRankingClasses.card}
          >
            <span className={marketRankingClasses.position}>{i + 1}</span>
            <span className={marketRankingClasses.icon}>
              {TYPE_EMOJI[m.type] ?? "🏬"}
            </span>
            <div className={marketRankingClasses.details}>
              <p className={marketRankingClasses.name}>{m.name}</p>
              <p className={marketRankingClasses.distance}>
                {m.distance} km de distância
              </p>
            </div>
            <span
              className={marketRankingClasses.priceBadge}
              style={styles.priceBadge(m.priceIndex)}
            >
              {priceLabel(m.priceIndex)}
            </span>
          </div>
        ))}
    </div>
  )
}
