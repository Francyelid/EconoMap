import { sharedClasses } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import { CHART_COLORS } from "../PriceChart/PriceChart.styles"

export const marketSelectorClasses = {
  sectionLabel: sharedClasses.selectionLabel,
  markets: "flex gap-2 flex-wrap",
  marketButton:
    "px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all",
} as const

export function createMarketSelectorStyles() {
  return {
    marketButton: (active: boolean, index: number): CSSProperties => {
      const col = CHART_COLORS[index % CHART_COLORS.length]
      return {
        borderColor: active ? col : "#e2e8f0",

        background: active ? col + "22" : "white",

        color: active ? col : "#94a3b8",
      }
    },
  }
}
