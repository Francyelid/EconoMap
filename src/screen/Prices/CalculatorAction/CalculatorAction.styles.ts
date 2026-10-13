import type { CSSProperties } from "react"

export const calculatorActionClasses = {
  calculatorButton:
    "w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95",
} as const

export function createCalculatorActionStyles() {
  return {
    calculatorButton: {
      background: "linear-gradient(135deg, #3d6648, #4e7f5a)",
      color: "#fff",
      boxShadow: "0 4px 14px #3d664840",
    } satisfies CSSProperties,
  }
}
