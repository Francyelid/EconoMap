import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const calculatorHeaderClasses = {
  header: "px-5 pt-2 pb-3 flex-shrink-0",
  headerRow: "flex items-center justify-between mb-1",
  title: "font-bold text-base text-white",
  closeButton: "text-lg",
  caption: sharedClasses.tinyText,
  marketSelect:
    "w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none mt-3",
} as const

export function createCalculatorHeaderStyles() {
  return {
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
  }
}
