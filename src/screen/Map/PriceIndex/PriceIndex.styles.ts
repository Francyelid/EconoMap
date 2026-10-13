import type { CSSProperties } from "react"
import { priceColor } from "../marketUtils"

export const priceIndexClasses = {
  section: "mt-2.5",
  header: "flex justify-between text-[10px] text-slate-400 mb-1",
  track: "h-1.5 bg-slate-100 rounded-full overflow-hidden",
  bar: "h-full rounded-full",
} as const

export const priceIndexStyles = {
  bar: (value: number): CSSProperties => ({
    width: `${value}%`,
    background: priceColor(value),
  }),
}
