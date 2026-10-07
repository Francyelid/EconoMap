import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const basketChartClasses = {
  chart: sharedClasses.fullWidth,
} as const

export function createBasketChartStyles() {
  return {
    chart: sharedStyles.chartHeight,
  }
}
