import type { dmPalette } from "@/theme"
import { sharedStyles } from "@/screen/shared/styles"

export const priceFiltersClasses = {
  filters: "space-y-3 pt-3",
  heading: "flex items-center justify-between gap-2",
  title: "text-xs font-bold",
  clearButton:
    "min-h-8 rounded-lg px-2 text-[11px] font-semibold focus-visible:outline-2 focus-visible:outline-green-600",
  field: "min-w-0 space-y-1.5",
  label: "block text-[11px] font-semibold",
  search:
    "flex min-h-11 items-center gap-2 rounded-xl border px-3 focus-within:ring-2 focus-within:ring-green-600/20",
  searchInput: "w-full min-w-0 bg-transparent py-2.5 text-sm outline-none",
  periodField: "min-w-0 space-y-2.5 border-t pt-2",
  periodGroup: "grid grid-cols-2 gap-1 rounded-xl p-1",
  periodButton:
    "flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-green-600",
  dateRow: "grid grid-cols-1 gap-3 min-[360px]:grid-cols-2",
  dateInput:
    "min-h-11 w-full min-w-0 rounded-xl px-2 py-2 text-xs outline-none",
} as const

export function createPriceFiltersStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    card: { background: pal.card, borderColor: pal.border },
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    accent: { color: pal.green },
    search: { background: pal.inputBg, borderColor: pal.border },
    input: sharedStyles.input(pal),
    divider: { borderColor: pal.divider },
    surface: { background: pal.cardAlt },
    periodButton: (active: boolean) => ({
      background: active ? pal.green : "transparent",
      color: active ? "#fff" : pal.textSecondary,
    }),
  }
}
