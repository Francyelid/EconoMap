import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { CSSProperties } from "react"

import type { dmPalette } from "@/theme"

export const newReceiptManualClasses = {
  content: sharedClasses.content,

  section: "space-y-3",

  sectionTitle: sharedClasses.sectionTitle,

  field: "flex flex-col gap-1",

  label: sharedClasses.textButton,

  input: "w-full rounded-xl px-4 py-2.5 text-sm outline-none",

  itemCard: "rounded-2xl p-3 space-y-2",

  itemHeader: "flex items-center justify-between",

  itemTitle: sharedClasses.smallBoldText,

  itemInput: "w-full rounded-xl px-3 py-2 text-sm outline-none",

  itemRow: "grid grid-cols-[minmax(0,1fr)_5rem_minmax(0,1.4fr)] gap-2",

  quantityInput: "w-full min-w-0 rounded-xl px-3 py-2 text-sm outline-none",

  unitSelect: "w-full min-w-0 rounded-xl pl-3 pr-2 py-2 text-sm outline-none",

  priceInput: "w-full min-w-0 rounded-xl px-3 py-2 text-sm outline-none",

  caption: sharedClasses.smallText,

  addButton:
    "w-full py-2.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-1.5",

  addIcon: "text-lg leading-none",

  footer: sharedClasses.footer,

  primaryButton: sharedClasses.primaryButton,
} as const

export function createNewReceiptManualStyles(
  pal: Pick<ReturnType<typeof dmPalette>, "textMuted" | "cardAlt" | "border" | "textSecondary" | "inputBg" | "textPrimary">,
) {
  return {
    mutedText: sharedStyles.mutedText(pal),

    itemCard: sharedStyles.alternateCard(pal),

    secondaryText: sharedStyles.secondaryText(pal),

    removeButton: { color: "var(--color-terracotta)" } satisfies CSSProperties,

    addButton: {
      border: `1.5px dashed ${pal.border}`,
      color: "var(--color-brand-green)",
      background: "transparent",
    } satisfies CSSProperties,

    primaryButton: sharedStyles.primaryButton,

    input: sharedStyles.input(pal),

    label: sharedStyles.secondaryText(pal),
  }
}
