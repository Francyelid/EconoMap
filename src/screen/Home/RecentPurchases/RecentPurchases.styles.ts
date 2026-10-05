import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export type RecentPurchasesPalette = Pick<
  ReturnType<typeof dmPalette>,
  "bg" | "card" | "border" | "textPrimary" | "textSecondary"
>

export const recentPurchasesClasses = {
  section: "px-4 mt-5 pb-6",
  header: sharedClasses.sectionHeader,
  title: sharedClasses.heading,
  viewAllButton: sharedClasses.textButton,
  list: sharedClasses.list,
  purchaseCard: "rounded-xl px-3 py-3 flex items-center gap-3",
  icon: "w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
  details: sharedClasses.details,
  market: "font-semibold text-sm truncate",
  metadata: sharedClasses.metadata,
  total: "font-bold text-sm font-mono flex-shrink-0",
} as const

export function createRecentPurchasesStyles(p: RecentPurchasesPalette) {
  return {
    title: sharedStyles.sectionTitle(p),
    accent: sharedStyles.accentText,
    purchaseCard: sharedStyles.card(p),
    icon: sharedStyles.pageBackground(p),
    market: sharedStyles.primaryText(p),
    metadata: sharedStyles.secondaryText(p),
  } satisfies Record<string, CSSProperties>
}
