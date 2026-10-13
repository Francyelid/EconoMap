import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const pricesScreenClasses = {
  screen: "px-4 py-6 space-y-5",
  stats: "grid grid-cols-2 gap-3",
} as const

export function createPricesScreenStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    screen: { background: pal.bg, minHeight: "100%" } satisfies CSSProperties,
  }
}
