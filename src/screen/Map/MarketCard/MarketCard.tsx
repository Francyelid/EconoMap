import { marketCardClasses, createMarketCardStyles } from "./MarketCard.styles"
import type { Market } from "@/interfaces/Market"
import type { dmPalette } from "@/theme"
import { priceLabel, TYPE_EMOJI } from "../marketUtils"
import PriceIndex from "../PriceIndex/PriceIndex"

type MarketCardProps = {
  market: Market
  palette: ReturnType<typeof dmPalette>
}

export default function MarketCard({ market: m, palette: p }: MarketCardProps) {
  const styles = createMarketCardStyles(p)
  return (
    <div className={marketCardClasses.card} style={styles.card}>
      <div className={marketCardClasses.cardContent}>
        <div
          className={marketCardClasses.icon}
          style={styles.icon(m.priceIndex)}
        >
          {TYPE_EMOJI[m.type] ?? "🏬"}
        </div>
        <div className={marketCardClasses.details}>
          <div className={marketCardClasses.titleRow}>
            <p className={marketCardClasses.name} style={styles.primaryText}>
              {m.name}
            </p>
            <span
              className={marketCardClasses.priceBadge}
              style={styles.priceBadge(m.priceIndex)}
            >
              {priceLabel(m.priceIndex)}
            </span>
          </div>
          <p className={marketCardClasses.address} style={styles.secondaryText}>
            {m.address}
          </p>
          <div
            className={marketCardClasses.metadata}
            style={styles.secondaryText}
          >
            <span>📍 {m.distance} km</span>
            <span>⭐ {m.rating}</span>
            <span>{m.type}</span>
          </div>
          <div className={marketCardClasses.communityRow}>
            <span
              className={marketCardClasses.communityBadge}
              style={styles.communityBadge}
            >
              👥 {m.registros} registros de usuários
            </span>
          </div>
          <PriceIndex value={m.priceIndex} />
        </div>
      </div>
    </div>
  )
}
