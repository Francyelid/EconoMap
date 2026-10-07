import { sharedClasses } from "@/screen/shared/styles"

export const cheapestMarketClasses = {
  card: sharedClasses.priceSummaryCard + " bg-green-50 border-green-100",
  label: sharedClasses.priceSummaryLabel + " text-green-700",
  market: sharedClasses.priceSummaryMarket + " text-green-900",
  price: sharedClasses.priceSummaryValue + " text-green-700",
} as const
