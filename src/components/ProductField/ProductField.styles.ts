import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const productFieldClasses = {
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
} as const

export function createProductFieldStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
  }
}
