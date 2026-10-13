import {
  priceChartCardClasses,
  createPriceChartCardStyles,
} from "./PriceChartCard.styles"
import type { dmPalette } from "@/theme"
import PriceChart from "../PriceChart/PriceChart"
import type { PricePeriod } from "../types"

type PriceChartCardProps = {
  palette: ReturnType<typeof dmPalette>
  product: string
  markets: string[]
  period: PricePeriod
}

export default function PriceChartCard({
  palette: pal,
  product: selProduct,
  markets: selMarkets,
  period: periodFilter,
}: PriceChartCardProps) {
  const styles = createPriceChartCardStyles(pal)
  return (
    <div className={priceChartCardClasses.chartCard} style={styles.card}>
      <div className={priceChartCardClasses.chartHeader}>
        <p
          className={priceChartCardClasses.chartTitle}
          style={styles.primaryText}
        >
          {selProduct}
        </p>
        <p
          className={priceChartCardClasses.chartPeriod}
          style={styles.secondaryText}
        >
          Jan – Ago 2026
        </p>
      </div>
      {selMarkets.length > 0 ? (
        <PriceChart
          product={selProduct}
          markets={selMarkets}
          period={periodFilter === "custom" ? "all" : periodFilter}
        />
      ) : (
        <div
          className={priceChartCardClasses.emptyChart}
          style={styles.secondaryText}
        >
          Selecione ao menos um mercado
        </div>
      )}
      <div className={priceChartCardClasses.legend}>
        {selMarkets.map((m, i) => (
          <div key={m} className={priceChartCardClasses.legendItem}>
            <div
              className={priceChartCardClasses.legendDot}
              style={styles.legendDot(i)}
            />
            <span
              className={priceChartCardClasses.legendLabel}
              style={styles.secondaryText}
            >
              {m}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
