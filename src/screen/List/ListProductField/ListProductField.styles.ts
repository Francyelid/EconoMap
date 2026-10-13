import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const listProductFieldClasses = {
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
} as const

export function createListProductFieldStyles(
  pal: ReturnType<typeof dmPalette>,
) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
  }
}
