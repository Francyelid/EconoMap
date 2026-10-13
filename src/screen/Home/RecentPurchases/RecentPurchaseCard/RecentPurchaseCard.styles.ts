import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { CSSProperties } from "react"

import type { RecentPurchasesPalette } from "../types"

export const recentPurchaseCardClasses = {
  purchaseCard: "rounded-xl px-3 py-3 flex items-center gap-3",

  icon: "w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0",

  details: sharedClasses.details,

  market: "font-semibold text-sm truncate",

  metadata: sharedClasses.metadata,

  total: "font-bold text-sm font-mono flex-shrink-0",
} as const

export function createRecentPurchaseCardStyles(p: RecentPurchasesPalette) {
  return {
    accent: sharedStyles.accentText,

    purchaseCard: sharedStyles.card(p),

    icon: sharedStyles.pageBackground(p),

    market: sharedStyles.primaryText(p),

    metadata: sharedStyles.secondaryText(p),
  } satisfies Record<string, CSSProperties>
}
