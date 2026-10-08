import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const itemsByMarketClasses = {
  groups: sharedClasses.spaciousList,
  groupHeader: sharedClasses.groupHeader,
  icon: "text-sm",
  marketName: sharedClasses.smallBoldText,
  divider: "flex-1 h-px",
  subtotal: "text-[10px] font-mono font-bold",
  items: sharedClasses.compactList,
  completed: "text-[10px] font-bold uppercase tracking-widest pt-1 mb-2",
  empty: sharedClasses.emptyList,
  emptyIcon: sharedClasses.emptyListIcon,
  emptyTitle: sharedClasses.itemName,
} as const

export function createItemsByMarketStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    accent: sharedStyles.accentText,
    divider: sharedStyles.divider,
    secondaryText: sharedStyles.secondaryText(pal),
  }
}
