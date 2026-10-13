import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const settingsScreenClasses = {
  sections: "px-4 py-5 space-y-4",
  logoutButton:
    "w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95",
  footer: "text-center text-[10px] pb-2",
} as const
export const settingsScreenStyles = {
  screen: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    background: pal.bg,
    minHeight: "100%",
  }),
  logoutButton: {
    background: "#f5ebe8",
    color: "#c04830",
    border: "1.5px solid #e8c4bc",
  } satisfies CSSProperties,
}
