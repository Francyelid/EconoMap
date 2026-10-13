import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const formActionsClasses = {
  actions: sharedClasses.formActions,
  cancelButton: sharedClasses.formCancelButton,
  addButton: sharedClasses.formAddButton,
} as const

export function createFormActionsStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    cancelButton: sharedStyles.cancelButton(pal),
    addButton: sharedStyles.addItemButton,
  }
}
