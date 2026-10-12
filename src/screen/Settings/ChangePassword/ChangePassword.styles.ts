import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const changePasswordClasses = {
  sheet: "w-full rounded-t-3xl p-5 pb-8",
  title: "font-bold text-base mb-4",
  input: "w-full rounded-xl px-4 py-2.5 pr-14 text-sm outline-none",
  visibilityButton:
    "absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold",
  actions: "flex gap-3 mt-5",
  cancelButton: "flex-1 py-3 rounded-2xl font-semibold text-sm",
  saveButton: "flex-1 py-3 rounded-2xl font-bold text-sm text-white",
} as const

export const changePasswordStyles = {
  saveButton: (
    isPwdValid: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: isPwdValid
      ? "linear-gradient(135deg, #3d6648, #2c4e37)"
      : pal.border,
  }),
}
