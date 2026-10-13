import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const listQuantityFieldsClasses = {
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
  quantityRow: sharedClasses.quantityRow,
  field: sharedClasses.fill,
} as const

export function createListQuantityFieldsStyles(
  pal: ReturnType<typeof dmPalette>,
) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
  }
}
