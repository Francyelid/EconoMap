import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const selectCurrencyClasses = {
  sheet: "w-full rounded-t-3xl pb-8",
  handle: "w-10 h-1 rounded-full mx-auto mt-4 mb-4",
  header: "px-5 mb-3",
  list: "overflow-y-auto",
  option:
    "w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all active:scale-95",
  symbol: "text-sm font-bold w-8",
  divider: "mx-5 h-px",
} as const

export const selectCurrencyStyles = {
  list: { maxHeight: "60vh" } satisfies CSSProperties,
  option: (
    isSelected: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: isSelected ? pal.greenMuted : "transparent",
  }),
  divider: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    background: pal.divider,
  }),
}
