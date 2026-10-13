import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const stockSummaryClasses = {
  title: sharedClasses.pageTitle,
  summary: sharedClasses.filterRow,
  summaryCard: "flex-1 rounded-xl p-2.5 border text-center",
  summaryLabel: "text-[9px] font-semibold uppercase tracking-wide",
} as const

export function createStockSummaryStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  const statusColors = createStockStatusColors(dark)
  return {
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
  }
}
