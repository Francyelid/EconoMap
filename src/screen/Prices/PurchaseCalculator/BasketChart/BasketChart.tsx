import { sharedChartAppearance } from "@/screen/shared/styles"
import {
  basketChartClasses,
  createBasketChartStyles,
} from "./BasketChart.styles"
import { MONTHS } from "@/mocks/MONTHS"

type BasketChartProps = {
  series: number[]
}

export default function BasketChart({
  series: basketSeries,
}: BasketChartProps) {
  const maxVal = Math.max(...basketSeries) * 1.06 || 1

  const minVal = Math.min(...basketSeries) * 0.92 || 0

  // SVG basket chart

  const W = 300,
    H = 110,
    PL = 38,
    PR = 8,
    PT = 8,
    PB = 22

  const sx = (i: number) => PL + (i / (MONTHS.length - 1)) * (W - PL - PR)

  const sy = (v: number) =>
    PT + (1 - (v - minVal) / (maxVal - minVal || 1)) * (H - PT - PB)

  const pts = basketSeries.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")

  const areaPath =
    `M${sx(0)},${sy(basketSeries[0])} ` +
    basketSeries
      .slice(1)
      .map((v, i) => `L${sx(i + 1)},${sy(v)}`)
      .join(" ") +
    ` L${sx(MONTHS.length - 1)},${H - PB} L${sx(0)},${H - PB} Z`

  const styles = createBasketChartStyles()

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={basketChartClasses.chart}
      style={styles.chart(H)}
    >
      <defs>
        <linearGradient id="basketGrad" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={sharedChartAppearance.basketColor}
            stopOpacity={sharedChartAppearance.areaOpacity}
          />
          <stop
            offset="100%"
            stopColor={sharedChartAppearance.basketColor}
            stopOpacity={sharedChartAppearance.areaEndOpacity}
          />
        </linearGradient>
      </defs>
      {[minVal, minVal + (maxVal - minVal) * 0.5, maxVal].map((v, i) => (
        <g key={i}>
          <line
            x1={PL}
            y1={sy(v)}
            x2={W - PR}
            y2={sy(v)}
            stroke={sharedChartAppearance.gridColor}
            strokeWidth={sharedChartAppearance.gridWidth}
          />
          <text
            x={PL - 4}
            y={sy(v) + 3.5}
            textAnchor="end"
            fontSize={sharedChartAppearance.compactFontSize}
            fill={sharedChartAppearance.labelColor}
            fontFamily={sharedChartAppearance.fontFamily}
          >
            {v.toFixed(0)}
          </text>
        </g>
      ))}
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={sx(i)}
          y={H - 4}
          textAnchor="middle"
          fontSize={sharedChartAppearance.compactFontSize}
          fill={sharedChartAppearance.labelColor}
        >
          {m}
        </text>
      ))}
      <path d={areaPath} fill="url(#basketGrad)" />
      <polyline
        points={pts}
        fill="none"
        stroke={sharedChartAppearance.basketColor}
        strokeWidth={sharedChartAppearance.lineWidth}
        strokeLinejoin={sharedChartAppearance.lineJoin}
        strokeLinecap={sharedChartAppearance.lineCap}
      />
      {basketSeries.map((v, i) => (
        <circle
          key={i}
          cx={sx(i)}
          cy={sy(v)}
          r="3"
          fill={sharedChartAppearance.basketColor}
          stroke={sharedChartAppearance.pointBorder}
          strokeWidth={sharedChartAppearance.pointWidth}
        />
      ))}
    </svg>
  )
}
