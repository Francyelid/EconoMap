import type { CSSProperties } from "react"

export const aboutProjectClasses = {
  icon: "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3",
  title: "font-bold text-xl",
  subtitle: "text-xs font-semibold mt-1",
  details: "rounded-2xl p-4 space-y-2 mb-5",
  detailRow: "flex justify-between items-start gap-3",
  detailLabel: "text-[10px] font-bold uppercase tracking-widest flex-shrink-0",
  detailValue: "text-xs text-right",
} as const

export const aboutProjectStyles = {
  closeButton: {
    background: "#3d6648",
    color: "#fff",
  } satisfies CSSProperties,
}
