import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const listFormActionsClasses = {
  actions: sharedClasses.formActions,
  cancelButton: sharedClasses.formCancelButton,
  addButton: sharedClasses.formAddButton,
} as const

export function createListFormActionsStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    cancelButton: sharedStyles.cancelButton(pal),
    addButton: sharedStyles.addItemButton,
  }
}
