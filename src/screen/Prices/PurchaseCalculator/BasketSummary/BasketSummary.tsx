import {
  basketSummaryClasses,
  createBasketSummaryStyles,
} from "./BasketSummary.styles"
import type { dmPalette } from "@/theme"
import BasketChart from "../BasketChart/BasketChart"

type BasketSummaryProps = {
  palette: ReturnType<typeof dmPalette>
  productCount: number
  market: string
  total: number
  variation: number
  series: number[]
}

export default function BasketSummary({
  palette: pal,
  productCount,
  market: calcMkt,
  total: lastVal,
  variation,
  series: basketSeries,
}: BasketSummaryProps) {
  const styles = createBasketSummaryStyles(pal)
  return (
    <div className={basketSummaryClasses.chartCard} style={styles.card}>
      <div className={basketSummaryClasses.chartHeader}>
        <div>
          <p
            className={basketSummaryClasses.chartTitle}
            style={styles.primaryText}
          >
            Cesta de {productCount} produto
            {productCount !== 1 ? "s" : ""}
          </p>
          <p
            className={basketSummaryClasses.caption}
            style={styles.secondaryText}
          >
            {calcMkt}
          </p>
        </div>
        <div className={basketSummaryClasses.summary}>
          <p className={basketSummaryClasses.total} style={styles.primaryText}>
            R$ {lastVal.toFixed(2)}
          </p>
          <p
            className={basketSummaryClasses.variation}
            style={styles.variation(variation)}
          >
            {variation >= 0 ? "▲" : "▼"} {Math.abs(variation).toFixed(1)}% vs
            Jan
          </p>
        </div>
      </div>
      <BasketChart series={basketSeries} />
    </div>
  )
}
