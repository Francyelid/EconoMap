import { sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"

export const spendingSummaryClasses = {
  summaryCard: "relative rounded-2xl p-4",
  summaryLabel:
    "text-green-100 text-[10px] font-semibold uppercase tracking-widest",
  summaryRow: "flex items-end justify-between mt-1",
  summaryValue: "text-white font-bold text-3xl",
  summaryDecimals: "text-lg",
  badge: "text-[10px] font-bold px-2 py-1 rounded-full",
  statsRow: "flex gap-4 mt-3 pt-3",
  statLabel: "text-green-200 text-[10px]",
  statValue: "text-white font-bold text-base mt-0.5",
} as const

export const spendingSummaryStyles = {
  heading: sharedStyles.serifHeading,
  summaryCard: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  badge: { background: "var(--color-teal)", color: "#fff" },
  statsRow: { borderTop: "1px solid rgba(255,255,255,0.15)" },
  statDivider: { width: 1, background: "rgba(255,255,255,0.15)" },
} satisfies Record<string, CSSProperties>
