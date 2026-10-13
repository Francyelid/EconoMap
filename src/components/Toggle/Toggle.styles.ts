import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const toggleClasses = {
  toggle:
    "relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200",
  toggleThumb:
    "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200",
} as const
export const toggleStyles = {
  toggle: (on: boolean): CSSProperties => ({
    background: on ? "#3d6648" : "#e0d9cd",
  }),
  toggleThumb: (on: boolean): CSSProperties => ({
    left: on ? "calc(100% - 1.375rem)" : "0.125rem",
  }),
}
