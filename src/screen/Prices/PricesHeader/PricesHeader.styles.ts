import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const pricesHeaderClasses = {
  title: sharedClasses.pageTitle,
  subtitle: sharedClasses.caption,
} as const

export function createPricesHeaderStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
  }
}
