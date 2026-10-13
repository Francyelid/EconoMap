import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { CHART_COLORS } from "../PriceChart/PriceChart.styles"

export const priceChartCardClasses = {
  chartCard: sharedClasses.shadowCard,
  chartHeader: sharedClasses.sectionHeader,
  chartTitle: sharedClasses.itemTitle,
  chartPeriod: "text-[10px] font-mono",
  emptyChart: "h-28 flex items-center justify-center text-xs",
  legend: "flex gap-4 mt-3 flex-wrap",
  legendItem: "flex items-center gap-1.5",
  legendDot: "w-2.5 h-2.5 rounded-full",
  legendLabel: sharedClasses.tinyText,
} as const

export function createPriceChartCardStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    card: sharedStyles.card(pal),
    legendDot: (index: number): CSSProperties => ({
      background: CHART_COLORS[index % CHART_COLORS.length],
    }),
  }
}
