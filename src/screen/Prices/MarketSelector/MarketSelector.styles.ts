import { sharedClasses } from "@/screen/shared/styles"

import type { CSSProperties } from "react"

import type { dmPalette } from "@/theme"

export const marketSelectorClasses = {
  sectionLabel: "mb-2 text-xs font-semibold",

  markets: "flex gap-2 flex-wrap",

  marketButton:
    "min-h-10 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors focus-visible:outline-2 focus-visible:outline-green-600",
} as const

export function createMarketSelectorStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    marketButton: (active: boolean): CSSProperties => {
      return {
        borderColor: active ? pal.green : pal.border,

        background: active ? pal.green : pal.cardAlt,

        color: active ? "#fff" : pal.textSecondary,
      }
    },
  }
}
