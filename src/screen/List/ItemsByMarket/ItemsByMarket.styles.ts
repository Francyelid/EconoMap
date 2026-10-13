import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { dmPalette } from "@/theme"

export const itemsByMarketClasses = {
  groups: sharedClasses.spaciousList,

  items: sharedClasses.compactList,

  completed: "text-[10px] font-bold uppercase tracking-widest pt-1 mb-2",

  empty: sharedClasses.emptyList,

  emptyIcon: sharedClasses.emptyListIcon,

  emptyTitle: sharedClasses.itemName,
} as const

export function createItemsByMarketStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
  }
}
