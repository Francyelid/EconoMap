import type { dmPalette } from "@/theme"

export type RecentPurchasesPalette = Pick<ReturnType<typeof dmPalette>, "bg" | "card" | "border" | "textPrimary" | "textSecondary">

export type RecentPurchase = {
  date: string
  market: string
  total: number
  items: number
  emoji: string
}
