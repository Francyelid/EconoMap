import { sharedClasses } from "@/screen/shared/styles"
import type { CSSProperties } from "react"

export const receiptActionClasses = {
  actionSection: sharedClasses.sectionSpacing,
  primaryButton:
    "w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform",
} as const

export const receiptActionStyles = {
  primaryButton: {
    background: "var(--color-terracotta)",
    color: "#fff",
    boxShadow: "0 4px 16px #c0483044",
  },
} satisfies Record<string, CSSProperties>
