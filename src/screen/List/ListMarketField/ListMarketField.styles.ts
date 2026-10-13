import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const listMarketFieldClasses = {
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
  customMarketInput: sharedClasses.customMarketInput,
} as const

export function createListMarketFieldStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
    customMarketInput: sharedStyles.customMarketInput(pal),
  }
}
