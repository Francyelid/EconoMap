import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const basketTotalClasses = {
  caption: sharedClasses.tinyText,
  summary: "text-right",
  footer: "px-5 py-3.5 flex-shrink-0 flex items-center justify-between",
  footerLabel: "text-[10px] font-semibold",
  footerTotal: "text-white font-bold text-xl font-mono leading-tight",
  footerVariation: sharedClasses.itemTitle,
} as const

export function createBasketTotalStyles() {
  return {
    footer: { background: "#2c2416" } satisfies CSSProperties,
    footerLabel: sharedStyles.mutedBrandText,
    footerVariation: (variation: number): CSSProperties => ({
      color: variation >= 0 ? "#e8a530" : "#4cb5b0",
    }),
  }
}
