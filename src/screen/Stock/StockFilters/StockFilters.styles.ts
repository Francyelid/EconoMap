import type { CSSProperties } from "react"
import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const stockFiltersClasses = {
  tabs: "flex rounded-xl p-1 mt-3 gap-1",
  tab: "flex-1 py-2 rounded-lg text-[11px] font-bold transition-all",
} as const

export function createStockFiltersStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  return {
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
