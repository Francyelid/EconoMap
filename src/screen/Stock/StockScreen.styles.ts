import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"

export const stockScreenClasses = {
  screen: sharedClasses.screen,
  header: sharedClasses.pageHeader,
  headerRow: sharedClasses.pageHeaderRow,
  title: sharedClasses.pageTitle,
  subtitle: sharedClasses.caption,
  addButton: sharedClasses.addIconButton,
  summary: sharedClasses.filterRow,
  summaryCard: "flex-1 rounded-xl p-2.5 border text-center",
  summaryLabel: "text-[9px] font-semibold uppercase tracking-wide",
  tabs: "flex rounded-xl p-1 mt-3 gap-1",
  tab: "flex-1 py-2 rounded-lg text-[11px] font-bold transition-all",
} as const

export function createStockScreenStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  const statusColors = createStockStatusColors(dark)
  return {
    header: sharedStyles.pageHeader(pal),
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    addButton: sharedStyles.accentBackground,
    expiredCard: {
      background: statusColors.expiredBackground,
      borderColor: statusColors.expiredBorder,
    } satisfies CSSProperties,
    expiredLabel: { color: statusColors.expiredLabel } satisfies CSSProperties,
    expiredValue: { color: statusColors.expiredText } satisfies CSSProperties,
    warningCard: {
      background: statusColors.warningBackground,
      borderColor: statusColors.warningBorder,
    } satisfies CSSProperties,
    warningLabel: { color: statusColors.warningLabel } satisfies CSSProperties,
    warningValue: { color: statusColors.warningText } satisfies CSSProperties,
    okCard: {
      background: statusColors.okBackground,
      borderColor: statusColors.okBorder,
    } satisfies CSSProperties,
    okLabel: { color: statusColors.okLabel } satisfies CSSProperties,
    okValue: { color: statusColors.okText } satisfies CSSProperties,
    tabs: { background: dark ? "#374151" : "#f1f5f9" } satisfies CSSProperties,
    tab: (selected: boolean): CSSProperties =>
      selected
        ? {
            background: pal.card,
            color: pal.textPrimary,
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }
        : { color: pal.textSecondary },
  }
}
