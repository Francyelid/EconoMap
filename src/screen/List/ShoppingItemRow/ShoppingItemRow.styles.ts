import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
const CAT_COLOR: Record<string, string> = {
  Grãos: "#f59e0b",

  Hortifruti: "#22c55e",

  Carnes: "#ef4444",

  Laticínios: "#3b82f6",

  Padaria: "#f97316",

  Outros: "#8b5cf6",
}

export const shoppingItemRowClasses = {
  item: "rounded-xl px-3 py-2.5 shadow-sm flex items-center gap-2",
  checkbox:
    "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
  category: "w-1.5 h-7 rounded-full flex-shrink-0",
  details: sharedClasses.details,
  itemName: sharedClasses.itemName,
  metadata: "flex items-center gap-1.5 mt-0.5",
  quantity: sharedClasses.tinyText,
  marketBadge:
    "text-[10px] font-semibold px-1.5 py-0.5 rounded-md transition-all",
  marketPicker: "mt-2 flex flex-wrap gap-1",
  removeMarket: "text-[10px] px-2 py-1 rounded-lg font-semibold",
  marketOption: "text-[10px] px-2 py-1 rounded-lg font-semibold transition-all",
  itemTotal: "text-xs font-mono font-bold text-slate-700 flex-shrink-0",
  removeItem:
    "text-slate-200 hover:text-red-400 text-xs transition-colors flex-shrink-0",
} as const

export function createShoppingItemRowStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    card: sharedStyles.card(pal),
    checkbox: (checked: boolean): CSSProperties => ({
      background: checked ? "#3d6648" : "transparent",
      borderColor: checked ? "#3d6648" : pal.border,
    }),
    category: (category: string): CSSProperties => ({
      background: CAT_COLOR[category] ?? "#8b5cf6",
    }),
    itemName: (checked: boolean): CSSProperties => ({
      color: checked ? pal.textSecondary : pal.textPrimary,
      textDecoration: checked ? "line-through" : "none",
    }),
    secondaryText: sharedStyles.secondaryText(pal),
    marketBadge: (hasMarket: boolean): CSSProperties => ({
      background: hasMarket ? "#d4e6d9" : "#f0ebe4",
      color: hasMarket ? "#3d6648" : "#9c8e7e",
    }),
    removeMarket: {
      background: "#f5ebe8",
      color: "#c04830",
    } satisfies CSSProperties,
    marketOption: (selected: boolean): CSSProperties => ({
      background: selected ? "#3d6648" : "#ede8df",
      color: selected ? "#fff" : "#5a4e3e",
    }),
  }
}
