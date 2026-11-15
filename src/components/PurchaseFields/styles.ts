import type { dmPalette } from "@/theme"
import { sharedStyles } from "@/screen/shared/styles"

export type PurchaseFieldPalette = Pick<ReturnType<typeof dmPalette>, "card" | "cardAlt" | "border" | "inputBg" | "textPrimary" | "textSecondary" | "textMuted">
export const purchaseFieldClasses = {
  field: "flex flex-col gap-1",
  label: "text-xs font-semibold",
  input: "w-full min-w-0 rounded-xl px-4 py-2.5 text-sm outline-none",
  itemInput: "w-full min-w-0 rounded-xl px-3 py-2.5 text-sm outline-none",
}
export function createPurchaseFieldStyles(palette: PurchaseFieldPalette) {
  return {
    input: sharedStyles.input(palette),
    secondaryText: sharedStyles.secondaryText(palette),
    label: sharedStyles.secondaryText(palette),
  }
}
