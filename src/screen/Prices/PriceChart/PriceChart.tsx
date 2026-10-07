import { CHART_COLORS } from "./PriceChart.styles"
import { sharedChartAppearance } from "@/screen/shared/styles"
import { priceChartClasses, createPriceChartStyles } from "./PriceChart.styles"
import { MONTHS } from "@/mocks/MONTHS"

import { PRICE_DATA } from "@/mocks/PRICE_DATA"

export default function PriceChart({
  product,
  markets,
  period = "all",
}: {
  product: string
  markets: string[]
  period?: "7d" | "30d" | "90d" | "all"
}) {
  const data = PRICE_DATA[product]

  if (!data || markets.length === 0) return null

  const slice = (arr: number[]) => {
    if (period === "all") return arr

    const n = period === "7d" ? 7 : period === "30d" ? 30 : 90

    return arr.slice(-n)
  }

  const slicedMonths =
    period === "all"
      ? MONTHS
      : MONTHS.slice(-(period === "7d" ? 7 : period === "30d" ? 30 : 90))

  const vals = markets.flatMap((m) => slice(data[m] ?? []))

  const lo = Math.min(...vals) * 0.92

  const hi = Math.max(...vals) * 1.06

  const W = 300,
    H = 130,
    PL = 38,
    PR = 8,
    PT = 8,
    PB = 22

  const pts_len = slicedMonths.length

  const sx = (i: number) => PL + (i / Math.max(pts_len - 1, 1)) * (W - PL - PR)

  const sy = (v: number) => PT + (1 - (v - lo) / (hi - lo || 1)) * (H - PT - PB)

  const gridVals = [lo, lo + (hi - lo) * 0.33, lo + (hi - lo) * 0.67, hi]

  const styles = createPriceChartStyles()

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={priceChartClasses.chart}
      style={styles.chart(H)}
    >
      {gridVals.map((v, i) => {
        const y = sy(v)

        return (
          <g key={i}>
            <line
              x1={PL}
              y1={y}
              x2={W - PR}
              y2={y}
              stroke={sharedChartAppearance.gridColor}
              strokeWidth={sharedChartAppearance.gridWidth}
            />
            <text
              x={PL - 4}
              y={y + 3.5}
              textAnchor="end"
              fontSize={sharedChartAppearance.fontSize}
              fill={sharedChartAppearance.labelColor}
              fontFamily={sharedChartAppearance.fontFamily}
            >
              {v.toFixed(0)}
            </text>
          </g>
        )
      })}
      {slicedMonths.map((m, i) => (
        <text
          key={m}
          x={sx(i)}
          y={H - 4}
          textAnchor="middle"
          fontSize={sharedChartAppearance.fontSize}
          fill={sharedChartAppearance.labelColor}
        >
          {m}
        </text>
      ))}
      {markets.map((mkt, mi) => {
        const raw = data[mkt]

        if (!raw) return null

        const series = slice(raw)

        const pts = series.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")

        const col = CHART_COLORS[mi % CHART_COLORS.length]

        return (
          <g key={mkt}>
            <polyline
              points={pts}
              fill="none"
              stroke={col}
              strokeWidth={sharedChartAppearance.lineWidth}
              strokeLinejoin={sharedChartAppearance.lineJoin}
              strokeLinecap={sharedChartAppearance.lineCap}
            />
            {series.map((v, i) => (
              <circle
                key={i}
                cx={sx(i)}
                cy={sy(v)}
                r="3"
                fill={col}
                stroke={sharedChartAppearance.pointBorder}
                strokeWidth={sharedChartAppearance.pointWidth}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
