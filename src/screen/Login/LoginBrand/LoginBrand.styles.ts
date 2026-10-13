import type { CSSProperties } from "react"

export const loginBrandClasses = {
  brand: "relative flex flex-col items-center pt-12 pb-6 flex-shrink-0",
  logo: "w-24 h-24 object-contain drop-shadow-xl",
  taglineRow: "flex items-center gap-2 mt-2",
  taglineLine: "h-px w-6",
  tagline: "text-[10px] font-bold tracking-widest uppercase",
} as const
export const loginBrandStyles = {
  tealLine: { background: "#4cb5b0" } satisfies CSSProperties,
  tagline: { color: "rgba(44,36,22,0.5)" } satisfies CSSProperties,
  amberLine: { background: "#e8a530" } satisfies CSSProperties,
}
