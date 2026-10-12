import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { sharedStyles } from "@/screen/shared/styles"

export const loginScreenClasses = {
  decoration: "absolute top-0 left-0 right-0 pointer-events-none",
  brand: "relative flex flex-col items-center pt-12 pb-6 flex-shrink-0",
  logo: "w-24 h-24 object-contain drop-shadow-xl",
  taglineRow: "flex items-center gap-2 mt-2",
  taglineLine: "h-px w-6",
  tagline: "text-[10px] font-bold tracking-widest uppercase",
  card: "relative flex-1 flex flex-col mx-4 rounded-3xl shadow-xl overflow-hidden",
  tabs: "flex flex-shrink-0",
  tab: (selected: boolean) =>
    `flex-1 py-4 text-sm font-bold transition-all ${
      selected ? "border-b-2" : ""
    }`,
  content: "flex-1 overflow-y-auto px-6 pt-6 pb-4 flex flex-col gap-4",
  dividerLine: "flex-1 h-px",
  safeArea: "flex-shrink-0 h-6",
} as const

export const loginScreenStyles = {
  screen: {
    background:
      "linear-gradient(160deg, #2c4e37 0%, #3d6648 60%, #4e7f5a 100%)",
  } satisfies CSSProperties,
  decoration: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    height: "52%",
    background: pal.bg,
    borderRadius: "0 0 48px 48px",
  }),
  tealLine: { background: "#4cb5b0" } satisfies CSSProperties,
  tagline: { color: "rgba(44,36,22,0.5)" } satisfies CSSProperties,
  amberLine: { background: "#e8a530" } satisfies CSSProperties,
  tabs: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    borderBottom: `1px solid ${pal.divider}`,
  }),
  tab: (pal: ReturnType<typeof dmPalette>, selected: boolean): CSSProperties =>
    selected
      ? { color: "#3d6648", borderColor: "#3d6648" }
      : sharedStyles.secondaryText(pal),
}
