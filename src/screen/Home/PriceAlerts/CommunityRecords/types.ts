import type { dmPalette } from "@/theme"

export type CommunityPalette = Pick<ReturnType<typeof dmPalette>, "cardAlt" | "textSecondary" | "card" | "border" | "divider" | "textPrimary" | "textMuted" | "inputBg" | "bg" | "greenMuted">
export type TrendFilter = "all" | "up" | "down"
