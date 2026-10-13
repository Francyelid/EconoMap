import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const settingsRowClasses = {
  row: "w-full flex items-center gap-3 px-4 py-3.5",
  interactiveRow:
    "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all active:opacity-70",
} as const
export const settingsRowStyles = {
  rowIcon: (
    danger: boolean,
    dark: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: danger ? (dark ? "#4a1a14" : "#f5ebe8") : pal.cardAlt,
  }),
  rowLabel: (
    danger: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({ color: danger ? "#c04830" : pal.textPrimary }),
  row: { background: "transparent" } satisfies CSSProperties,
}
