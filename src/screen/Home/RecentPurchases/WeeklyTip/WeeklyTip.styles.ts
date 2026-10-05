import { sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"

export const weeklyTipClasses = {
  card: "rounded-2xl p-4 mb-3 flex items-center gap-3",
  logo: "w-12 h-12 object-contain flex-shrink-0",
  title: "text-white font-bold text-sm",
  description: "text-green-100 text-xs mt-0.5 leading-relaxed",
} as const

export const weeklyTipStyles = {
  card: {
    background: "linear-gradient(120deg, var(--color-brand-green), var(--color-brand-green-light))",
    border: "none",
  },
  title: sharedStyles.serifHeading,
} satisfies Record<string, CSSProperties>
