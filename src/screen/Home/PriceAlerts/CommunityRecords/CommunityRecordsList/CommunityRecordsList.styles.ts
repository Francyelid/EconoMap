import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const communityRecordsListClasses = {
  neutralBadge: "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
  trendBadge:
    "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md",
  subtitle: sharedClasses.metadata,
  results: "overflow-y-auto px-4 py-3",
  emptyState: "text-center py-8",
  emptyIcon: sharedClasses.emptyIcon,
  emptyMessage: sharedClasses.emphasizedText,
  group: "mb-4",
  groupHeader: "flex items-center gap-2 mb-2",
  groupLabel: "text-[10px] font-bold px-2 py-0.5 rounded-full",
  caption: sharedClasses.tinyText,
  item: "flex items-center gap-3 rounded-xl px-3 py-2.5 mb-1",
  details: sharedClasses.details,
  product: "text-sm font-semibold truncate",
  price: "font-mono font-bold text-sm flex-shrink-0",
} as const

export function createCommunityRecordsListStyles(
  pal: Pick<ReturnType<typeof dmPalette>, "bg" | "card" | "cardAlt" | "border" | "textPrimary" | "textSecondary" | "greenMuted">,
) {
  return {
    neutralBadge: {
      background: pal.cardAlt,

      color: pal.textSecondary,
    } satisfies CSSProperties,
    trendBadge: (diff: number): CSSProperties => ({
      background:
        diff > 0
          ? "var(--color-terracotta-light)"
          : "var(--color-brand-green-muted)",

      color: diff > 0 ? "var(--color-terracotta)" : "var(--color-brand-green)",
    }),
    secondaryText: sharedStyles.secondaryText(pal),
    primaryText: sharedStyles.primaryText(pal),
    results: sharedStyles.pageBackground(pal),
    groupLabel: {
      background: pal.greenMuted,

      color: "var(--color-brand-green)",
    } satisfies CSSProperties,
    item: sharedStyles.card(pal),
  }
}
