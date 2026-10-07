import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const CHART_COLORS = ["#16a34a", "#f97316", "#0ea5e9", "#8b5cf6"]

export const priceChartClasses = {
  chart: sharedClasses.fullWidth,
} as const

export function createPriceChartStyles() {
  return {
    chart: sharedStyles.chartHeight,
  }
}
