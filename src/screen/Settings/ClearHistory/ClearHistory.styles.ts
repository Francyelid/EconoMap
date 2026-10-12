import type { CSSProperties } from "react"

export const clearHistoryClasses = {
  intro: "flex flex-col items-center text-center mb-5",
  actions: "flex flex-col gap-2.5",
} as const

export const clearHistoryStyles = {
  confirmButton: {
    background: "#c04830",
    color: "#fff",
    boxShadow: "0 4px 16px #c0483033",
  } satisfies CSSProperties,
}
