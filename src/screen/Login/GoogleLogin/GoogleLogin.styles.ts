import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { sharedStyles } from "@/screen/shared/styles"

export const googleLoginClasses = {
  button:
    "w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 transition active:scale-95",
} as const

export const googleLoginStyles = {
  button: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    ...sharedStyles.dialogCancelButton(pal),
    border: `2px solid ${pal.border}`,
  }),
}
