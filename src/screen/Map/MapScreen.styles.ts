import type { CSSProperties } from "react"

import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { dmPalette } from "@/theme"

export const mapScreenClasses = {
  screen: "flex flex-col h-full",

  header: "px-4 pt-6 pb-3 flex-shrink-0",

  title: sharedClasses.pageTitle,

  subtitle: sharedClasses.caption,

  tabs: "flex mt-3 rounded-xl p-1 gap-1",

  tab: "flex-1 py-2 rounded-lg text-xs font-bold transition-all",

  content: "flex-1 overflow-y-auto px-4 py-4 space-y-3",
} as const

export function createMapScreenStyles(
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

    background: sharedStyles.pageBackground(p),
  }
}
