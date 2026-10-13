import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const basketProductListClasses = {
  products: "px-4 pt-3 pb-4 space-y-2",
  productsTitle: "text-[10px] font-bold uppercase tracking-widest",
  productButton:
    "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all",
  checkbox:
    "w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all",
  details: sharedClasses.details,
  productName: "font-semibold text-sm",
  metadata: sharedClasses.metadata,
  price: "font-mono font-bold",
  selectedPrice: "font-mono font-bold text-sm flex-shrink-0",
} as const

export function createBasketProductListStyles(
  pal: ReturnType<typeof dmPalette>,
) {
  return {
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    variation: sharedStyles.priceVariation,
    productButton: (checked: boolean): CSSProperties => ({
      background: checked ? pal.greenMuted : pal.card,
      border: `1px solid ${checked ? "#3d6648" : pal.border}`,
    }),
    checkbox: (checked: boolean): CSSProperties => ({
      background: checked ? "#3d6648" : pal.border,
    }),
    mutedText: sharedStyles.mutedText(pal),
    selectedPrice: sharedStyles.accentText,
  }
}
