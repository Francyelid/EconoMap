import type { CSSProperties } from "react"
import { sharedStyles } from "@/screen/shared/styles"

export const totalEstimateClasses = {
  card: "rounded-2xl p-3.5 text-white",
  summary: "flex justify-between items-end",
  label: "text-[10px] opacity-75",
  total: "text-xl font-bold font-mono mt-0.5",
  completed: "text-right",
  count: "text-sm font-bold",
  progressTrack: "mt-2.5 rounded-full overflow-hidden h-1.5",
  progressBar: "h-full rounded-full transition-all duration-500",
} as const

export function createTotalEstimateStyles() {
  return {
    card: sharedStyles.brandGradient,
    progressTrack: {
      background: "rgba(255,255,255,0.2)",
    } satisfies CSSProperties,
    progressBar: (progress: number): CSSProperties => ({
      width: `${progress}%`,
      background: "#a8c9b0",
    }),
  }
}
