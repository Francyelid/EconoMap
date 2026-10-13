import {
  selectedMarketCardClasses,
  createSelectedMarketCardStyles,
} from "./SelectedMarketCard.styles"
import type { Market } from "@/interfaces/Market"
import { priceLabel, TYPE_EMOJI } from "../marketUtils"

type SelectedMarketCardProps = {
  market: Market
  onClose: () => void
}

export default function SelectedMarketCard({
  market: selected,
  onClose,
}: SelectedMarketCardProps) {
  const styles = createSelectedMarketCardStyles()
  return (
    <div className={selectedMarketCardClasses.selectedCard}>
      <div className={selectedMarketCardClasses.header}>
        <div className={selectedMarketCardClasses.identity}>
          <span className={selectedMarketCardClasses.icon}>
            {TYPE_EMOJI[selected.type] ?? "🏬"}
          </span>
          <div>
            <p className={selectedMarketCardClasses.name}>{selected.name}</p>
            <p className={selectedMarketCardClasses.address}>
              {selected.address}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={selectedMarketCardClasses.closeButton}
        >
          ✕
        </button>
      </div>
      <div className={selectedMarketCardClasses.stats}>
        <div className={selectedMarketCardClasses.stat}>
          <p className={selectedMarketCardClasses.statLabel}>Distância</p>
          <p className={selectedMarketCardClasses.statValue}>
            {selected.distance} km
          </p>
        </div>
        <div
          className={selectedMarketCardClasses.priceStat}
          style={styles.priceBackground(selected.priceIndex)}
        >
          <p className={selectedMarketCardClasses.statLabel}>Preços</p>
          <p
            className={selectedMarketCardClasses.priceValue}
            style={styles.priceText(selected.priceIndex)}
          >
            {priceLabel(selected.priceIndex)}
          </p>
        </div>
        <div className={selectedMarketCardClasses.stat}>
          <p className={selectedMarketCardClasses.statLabel}>Avaliação</p>
          <p className={selectedMarketCardClasses.statValue}>
            ⭐ {selected.rating}
          </p>
        </div>
      </div>
      <div
        className={selectedMarketCardClasses.communityRow}
        style={styles.communityBackground}
      >
        <span className={selectedMarketCardClasses.communityIcon}>👥</span>
        <p
          className={selectedMarketCardClasses.communityText}
          style={styles.communityText}
        >
          {selected.registros} registros de usuários neste mercado
        </p>
      </div>
    </div>
  )
}
