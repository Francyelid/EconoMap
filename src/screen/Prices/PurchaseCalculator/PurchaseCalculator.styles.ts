import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const purchaseCalculatorClasses = {
  overlay: sharedClasses.overlay,
  sheet: sharedClasses.sheet,
  handleContainer: sharedClasses.handleContainer,
  handle: sharedClasses.handle,
  header: "px-5 pt-2 pb-3 flex-shrink-0",
  headerRow: "flex items-center justify-between mb-1",
  title: "font-bold text-base text-white",
  closeButton: "text-lg",
  caption: sharedClasses.tinyText,
  marketSelect:
    "w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none mt-3",
  content: sharedClasses.scrollingContent,
  chartCard: "mx-4 mt-4 rounded-2xl p-4",
  chartHeader: "flex items-start justify-between mb-2",
  chartTitle: sharedClasses.smallBoldText,
  summary: "text-right",
  total: "font-mono font-bold text-lg leading-tight",
  variation: sharedClasses.tinyBoldText,
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
  footer: "px-5 py-3.5 flex-shrink-0 flex items-center justify-between",
  footerLabel: "text-[10px] font-semibold",
  footerTotal: "text-white font-bold text-xl font-mono leading-tight",
  footerVariation: sharedClasses.itemTitle,
} as const

export function createPurchaseCalculatorStyles(
  pal: ReturnType<typeof dmPalette>,
) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: { background: pal.bg, height: "88%" } satisfies CSSProperties,
    handle: sharedStyles.handle(pal),
    header: {
      background: "linear-gradient(150deg,#2c4e37,#3d6648)",
      borderRadius: "20px 20px 0 0",
    } satisfies CSSProperties,
    title: sharedStyles.serifHeading,
    closeButton: { color: "rgba(255,255,255,0.5)" } satisfies CSSProperties,
    caption: { color: "#a8c9b0" } satisfies CSSProperties,
    marketSelect: {
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.25)",
    } satisfies CSSProperties,
    marketOption: {
      color: "#2c2416",
      background: "#fff",
    } satisfies CSSProperties,
    card: sharedStyles.card(pal),
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
    footer: { background: "#2c2416" } satisfies CSSProperties,
    footerLabel: sharedStyles.mutedBrandText,
    footerVariation: (variation: number): CSSProperties => ({
      color: variation >= 0 ? "#e8a530" : "#4cb5b0",
    }),
  }
}
