import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const marketItemGroupClasses = {
  header: sharedClasses.groupHeader,
  icon: "text-sm",
  name: sharedClasses.smallBoldText,
  divider: "flex-1 h-px",
  subtotal: "text-[10px] font-mono font-bold",
  items: sharedClasses.compactList,
} as const

export function createMarketItemGroupStyles(
  palette: ReturnType<typeof dmPalette>,
) {
  return {
    accent: sharedStyles.accentText,
    divider: sharedStyles.divider,
    secondaryText: sharedStyles.secondaryText(palette),
  }
}
