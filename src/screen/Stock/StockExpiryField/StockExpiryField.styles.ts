import {
  sharedClasses,
  sharedStyles,
  createStockStatusColors,
} from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const stockExpiryFieldClasses = {
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
} as const

export function createStockExpiryFieldStyles(
  pal: ReturnType<typeof dmPalette>,
  dark: boolean,
) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
  }
}
