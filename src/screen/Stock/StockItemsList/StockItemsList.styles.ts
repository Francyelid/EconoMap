import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"

export const stockItemsListClasses = {
  content: "flex-1 overflow-y-auto px-4 py-3 space-y-2",
  card: "rounded-2xl p-4 border",
  row: sharedClasses.itemRow,
  icon: "w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0 border",
  details: sharedClasses.details,
  heading: "flex items-start justify-between gap-2",
  nameContainer: "min-w-0",
  name: sharedClasses.itemTitle,
  metadata: sharedClasses.metadata,
  badge: sharedClasses.priceBadge,
  footer: "flex items-center justify-between mt-2",
  expiry: sharedClasses.tinyText,
  actions: "flex items-center gap-2",
  price: "font-mono text-[10px] font-semibold",
  deleteButton:
    "w-6 h-6 rounded-lg flex items-center justify-center transition-all active:scale-90",
  empty: sharedClasses.emptyList,
  emptyIcon: sharedClasses.emptyListIcon,
  emptyTitle: sharedClasses.itemName,
} as const

export function createStockItemsListStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  const statusColors = createStockStatusColors(dark)
  const appearance = (st: "expired" | "warning" | "ok") => {
    const cardBg =
      st === "expired"
        ? statusColors.expiredBackground
        : st === "warning"
          ? statusColors.warningBackground
          : pal.card

    const cardBorder =
      st === "expired"
        ? statusColors.expiredBorder
        : st === "warning"
          ? statusColors.warningBorder
          : pal.border

    const badgeBg =
      st === "expired"
        ? statusColors.expiredBadge
        : st === "warning"
          ? statusColors.warningBadge
          : statusColors.okBadge

    const badgeColor =
      st === "expired"
        ? statusColors.expiredText
        : st === "warning"
          ? statusColors.warningText
          : statusColors.okText

    return { cardBg, cardBorder, badgeBg, badgeColor }
  }
  return {
    background: sharedStyles.pageBackground(pal),
    card: (status: "expired" | "warning" | "ok"): CSSProperties => {
      const colors = appearance(status)
      return { background: colors.cardBg, borderColor: colors.cardBorder }
    },
    icon: {
      background: pal.card,
      borderColor: pal.border,
    } satisfies CSSProperties,
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    badge: (status: "expired" | "warning" | "ok"): CSSProperties => {
      const colors = appearance(status)
      return { background: colors.badgeBg, color: colors.badgeColor }
    },
    deleteButton: sharedStyles.dangerBackground,
    deleteIcon: { color: "var(--color-terracotta)" } satisfies CSSProperties,
    mutedText: sharedStyles.mutedText(pal),
  }
}
