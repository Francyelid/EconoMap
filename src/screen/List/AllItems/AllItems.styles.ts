import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const allItemsClasses = {
  list: sharedClasses.list,
  completed: "text-[10px] font-bold uppercase tracking-widest pt-2",
  empty: sharedClasses.emptyList,
  emptyIcon: sharedClasses.emptyListIcon,
  emptyTitle: sharedClasses.itemName,
  emptyHint: "text-xs mt-1",
} as const

export function createAllItemsStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
  }
}
