import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const loginScreenClasses = {
  decoration: "absolute top-0 left-0 right-0 pointer-events-none",
  card: "relative flex-1 flex flex-col mx-4 rounded-3xl shadow-xl overflow-hidden",
  content: "flex-1 overflow-y-auto px-6 pt-6 pb-4 flex flex-col gap-4",
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
}
