import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

export const addToListClasses = {
  overlay: sharedClasses.overlay,
  sheet: "w-full rounded-t-3xl p-6 pb-8 flex flex-col gap-4",
  handle: "w-10 h-1 rounded-full mx-auto",
  title: "font-bold text-base",
  label: sharedClasses.formLabel,
  input: sharedClasses.formInput,
  quantityRow: "flex gap-3",
  field: sharedClasses.fill,
  customMarketInput: "w-full rounded-xl px-3 py-3 text-sm outline-none mt-2",
  actions: "flex gap-2 pt-1",
  cancelButton: "flex-1 py-3.5 rounded-2xl font-bold text-sm",
  addButton: "flex-1 py-3.5 rounded-2xl font-bold text-sm text-white",
} as const

export function createAddToListStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: sharedStyles.cardBackground(pal),
    handle: sharedStyles.handle(pal),
    title: sharedStyles.sectionTitle(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    input: sharedStyles.input(pal),
    customMarketInput: {
      background: pal.inputBg,
      border: "1px solid #e8a530",
      color: pal.textPrimary,
    } satisfies CSSProperties,
    cancelButton: {
      background: pal.inputBg,
      color: pal.textSecondary,
    } satisfies CSSProperties,
    addButton: (hasName: boolean): CSSProperties => ({
      background: hasName ? "#3d6648" : "#c8bfb2",
      boxShadow: hasName ? "0 4px 12px #3d664833" : "none",
    }),
  }
}
