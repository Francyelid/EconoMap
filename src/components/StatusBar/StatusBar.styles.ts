import type { CSSProperties } from "react"

export const statusBarClasses = {
  bar: "px-5 pt-3 pb-2 flex items-center justify-between flex-shrink-0",
  time: "text-xs font-bold font-mono",
  indicators: "flex items-center gap-1 text-xs",
  battery: "font-mono font-semibold",
} as const

export const statusBarStyles = {
  bar: (dark: boolean): CSSProperties => ({
    background: dark ? "#0f1723" : "#3d6648",
  }),
  text: { color: "#a8c9b0" } satisfies CSSProperties,
}
