import {
  mapDrawingClasses,
  createMapDrawingStyles,
  mapDrawingColors,
  priceLegend,
} from "./MapDrawing.styles"
import type { Market } from "@/interfaces/Market"
import { TYPE_EMOJI } from "../../marketUtils"

type MapDrawingProps = {
  markets: Market[]
  selected: Market | null
  onSelectMarket: (market: Market | null) => void
}

export default function MapDrawing({
  markets,
  selected,
  onSelectMarket,
}: MapDrawingProps) {
  const styles = createMapDrawingStyles()

  return (
    <div className={mapDrawingClasses.map} style={styles.map}>
      <svg
        viewBox="0 0 100 100"
        className={mapDrawingClasses.drawing}
        preserveAspectRatio="none"
      >
        {/* Parks */}
        <rect
          x="40"
          y="4"
          width="26"
          height="21"
          fill={mapDrawingColors.park}
          rx="2"
        />
        <rect
          x="4"
          y="65"
          width="17"
          height="18"
          fill={mapDrawingColors.park}
          rx="2"
        />
        <rect
          x="70"
          y="44"
          width="22"
          height="18"
          fill={mapDrawingColors.park}
          rx="2"
        />
        {/* City blocks */}
        <rect
          x="4"
          y="4"
          width="31"
          height="26"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="4"
          y="34"
          width="13"
          height="26"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="20"
          y="34"
          width="16"
          height="12"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="40"
          y="30"
          width="26"
          height="10"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="70"
          y="4"
          width="26"
          height="35"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="40"
          y="48"
          width="26"
          height="18"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="70"
          y="67"
          width="26"
          height="28"
          fill={mapDrawingColors.block}
          rx="1"
        />
        <rect
          x="4"
          y="88"
          width="62"
          height="8"
          fill={mapDrawingColors.block}
          rx="1"
        />
        {/* Streets horizontal */}
        <rect
          x="0"
          y="30"
          width="100"
          height="3.5"
          fill={mapDrawingColors.street}
        />
        <rect
          x="0"
          y="46"
          width="100"
          height="3.5"
          fill={mapDrawingColors.street}
        />
        <rect
          x="0"
          y="62"
          width="100"
          height="3.5"
          fill={mapDrawingColors.street}
        />
        <rect
          x="0"
          y="85"
          width="100"
          height="3.5"
          fill={mapDrawingColors.street}
        />
        {/* Streets vertical */}
        <rect
          x="36"
          y="0"
          width="3.5"
          height="100"
          fill={mapDrawingColors.street}
        />
        <rect
          x="67"
          y="0"
          width="3.5"
          height="100"
          fill={mapDrawingColors.street}
        />
        <rect
          x="16"
          y="0"
          width="3.5"
          height="100"
          fill={mapDrawingColors.street}
        />
        {/* You marker */}
        <circle cx="30" cy="50" r="3.5" fill={mapDrawingColors.location} />
        <circle
          cx="30"
          cy="50"
          r="7"
          fill={mapDrawingColors.location}
          opacity="0.18"
        />
      </svg>

      {/* "Você" label */}
      <div className={mapDrawingClasses.marker} style={styles.location}>
        <span className={mapDrawingClasses.locationLabel}>Você</span>
      </div>

      {/* Market pins */}
      {markets.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelectMarket(selected?.id === m.id ? null : m)}
          className={mapDrawingClasses.marker}
          style={styles.pinPosition(m.x, m.y)}
        >
          <div className={mapDrawingClasses.pinContent(selected?.id === m.id)}>
            <div
              className={mapDrawingClasses.pinIcon}
              style={styles.pinIcon(m.priceIndex)}
            >
              {TYPE_EMOJI[m.type] ?? "🏬"}
            </div>
            <div style={styles.pinTip(m.priceIndex)} />
          </div>
        </button>
      ))}

      {/* Legend */}
      <div className={mapDrawingClasses.legend}>
        <p className={mapDrawingClasses.legendTitle}>Índice de Preço</p>
        <div className={mapDrawingClasses.legendItems}>
          {priceLegend.map(({ color, label }) => (
            <span key={label} className={mapDrawingClasses.legendItem}>
              <span
                className={mapDrawingClasses.legendDot}
                style={styles.legendDot(color)}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
