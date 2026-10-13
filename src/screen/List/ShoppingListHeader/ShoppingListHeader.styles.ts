import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const shoppingListHeaderClasses = {
  header: "px-4 pt-5 pb-3 flex-shrink-0",
  headerRow: sharedClasses.pageHeaderRow,
  title: sharedClasses.pageTitle,
  subtitle: sharedClasses.caption,
  addButton:
    "w-9 h-9 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm",
  viewRow: "flex gap-2 mt-3",
  viewGroup: "flex flex-1 rounded-xl overflow-hidden",
  viewButton: "flex-1 py-2 text-xs font-bold transition-all",
} as const

export function createShoppingListHeaderStyles(
  pal: ReturnType<typeof dmPalette>,
) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    header: sharedStyles.pageHeader(pal),
    title: sharedStyles.sectionTitle(pal),
    addButton: sharedStyles.accentBackground,
    viewGroup: { border: "1px solid #e0d9cd" } satisfies CSSProperties,
    viewButton: (selected: boolean): CSSProperties => ({
      background: selected ? "#3d6648" : "#f8f5f1",
      color: selected ? "#fff" : "#9c8e7e",
    }),
  }
}
