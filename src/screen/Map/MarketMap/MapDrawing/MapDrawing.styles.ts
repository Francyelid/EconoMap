import type { CSSProperties } from "react"
import { priceColor, priceLabel } from "@/screen/Map/marketUtils"

export const mapDrawingColors = {
  park: "#bbf7d0",
  block: "#f1f5f9",
  street: "#cbd5e1",
  location: "#3b82f6",
} as const

export const priceLegend = [45, 65, 100].map((priceIndex) => ({
  color: priceColor(priceIndex),
  label: priceLabel(priceIndex),
}))

export const mapDrawingClasses = {
  map: "relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-[#dff0e0]",
  drawing: "absolute inset-0 w-full h-full",
  marker: "absolute",
  locationLabel:
    "text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-semibold shadow-sm",
  pinContent: (active: boolean) =>
    `flex flex-col items-center transition-transform ${
      active ? "scale-110" : ""
    }`,
  pinIcon:
    "w-9 h-9 rounded-full flex items-center justify-center text-base shadow-md border-2 border-white",
  legend:
    "absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-2 shadow-sm border border-white",
  legendTitle: "text-[9px] font-bold text-slate-600 mb-1",
  legendItems: "flex gap-2.5",
  legendItem: "flex items-center gap-1 text-[9px] text-slate-600",
  legendDot: "w-2 h-2 rounded-full inline-block",
} as const

export function createMapDrawingStyles() {
  return {
    map: { height: 280 } satisfies CSSProperties,
    location: {
      left: "30%",
      top: "50%",
      transform: "translate(10px,-50%)",
    } satisfies CSSProperties,
    pinPosition: (x: number, y: number): CSSProperties => ({
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%,-100%)",
    }),
    pinIcon: (priceIndex: number): CSSProperties => ({
      background: priceColor(priceIndex),
    }),
    pinTip: (priceIndex: number): CSSProperties => ({
      width: 0,
      height: 0,

      borderLeft: "5px solid transparent",

      borderRight: "5px solid transparent",

      borderTop: `6px solid ${priceColor(priceIndex)}`,

      filter: "drop-shadow(0 1px 1px rgba(0,0,0,.15))",
    }),
    legendDot: (col: string): CSSProperties => ({ background: col }),
  }
}
