import { sharedClasses } from "@/screen/shared/styles"

export const priciestMarketClasses = {
  card: sharedClasses.priceSummaryCard + " bg-orange-50 border-orange-100",
  label: sharedClasses.priceSummaryLabel + " text-orange-700",
  market: sharedClasses.priceSummaryMarket + " text-orange-900",
  price: sharedClasses.priceSummaryValue + " text-orange-600",
} as const
