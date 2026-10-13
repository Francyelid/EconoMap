import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { sharedStyles } from "@/screen/shared/styles"

export const authTabsClasses = {
  tabs: "flex flex-shrink-0",
  tab: (selected: boolean) =>
    `flex-1 py-4 text-sm font-bold transition-all ${
      selected ? "border-b-2" : ""
    }`,
} as const
export const authTabsStyles = {
  tabs: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    borderBottom: `1px solid ${pal.divider}`,
  }),
  tab: (pal: ReturnType<typeof dmPalette>, selected: boolean): CSSProperties =>
    selected
      ? { color: "#3d6648", borderColor: "#3d6648" }
      : sharedStyles.secondaryText(pal),
}
