import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const settingsDividerClasses = {
  divider: "mx-4",
} as const
export const settingsDividerStyles = {
  divider: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    height: 1,
    background: pal.divider,
  }),
}
