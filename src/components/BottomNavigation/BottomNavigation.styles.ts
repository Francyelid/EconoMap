import type { CSSProperties } from "react"
import { sharedClasses } from "@/screen/shared/styles"

export const bottomNavigationClasses = {
  container: "px-1 pt-2 pb-3 flex-shrink-0",
  items: "flex",
  item: "flex-1 flex flex-col items-center gap-1 py-1 rounded-xl transition-all",
  label: sharedClasses.tinyBoldText,
} as const

export const bottomNavigationStyles = {
  container: (dark: boolean): CSSProperties => ({
    background: dark ? "#1e2235" : "#fff",
    borderTop: `1px solid ${dark ? "#2e3550" : "#e0d9cd"}`,
  }),
  item: (active: boolean): CSSProperties => ({
    background: active ? "#d4e6d9" : "transparent",
  }),
  label: (active: boolean): CSSProperties => ({
    color: active ? "#3d6648" : "#9c8e7e",
  }),
}
