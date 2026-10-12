import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const addToStockClasses = {
  overlay: sharedClasses.overlay,
  sheet: sharedClasses.addItemSheet,
  handle: sharedClasses.centeredHandle,
  title: sharedClasses.formTitle,
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
  quantityRow: sharedClasses.quantityRow,
  field: sharedClasses.fill,
  customMarketInput: sharedClasses.customMarketInput,
  actions: sharedClasses.formActions,
  cancelButton: sharedClasses.formCancelButton,
  addButton: sharedClasses.formAddButton,
} as const

export function createAddToStockStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: sharedStyles.cardBackground(pal),
    handle: sharedStyles.handle(pal),
    title: sharedStyles.sectionTitle(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
    customMarketInput: sharedStyles.customMarketInput(pal),
    cancelButton: sharedStyles.cancelButton(pal),
    addButton: sharedStyles.addItemButton,
  }
}
