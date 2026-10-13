import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const mapHeaderClasses = {
  header: sharedClasses.pageHeader,
  title: sharedClasses.pageTitle,
  subtitle: sharedClasses.caption,
  tabs: "flex mt-3 rounded-xl p-1 gap-1",
  tab: "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
} as const

export function createMapHeaderStyles(
  p: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  return {
    header: {
      background: p.headerBg,

      borderBottom: `1px solid ${p.border}`,
    } satisfies CSSProperties,
    primaryText: sharedStyles.primaryText(p),
    secondaryText: sharedStyles.secondaryText(p),
    tabs: { background: dark ? "#374151" : "#f1f5f9" } satisfies CSSProperties,
    tab: (active: boolean): CSSProperties => ({
      background: active ? p.card : "transparent",

      color: active ? p.textPrimary : p.textSecondary,

      boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
    }),
  }
}
