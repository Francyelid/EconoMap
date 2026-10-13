import type { CSSProperties } from "react"

import type { dmPalette } from "@/theme"

import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

export const deleteStockModalClasses = {
  overlay: sharedClasses.overlay,

  sheet: "w-full rounded-t-3xl p-6 pb-8",

  handle: "w-10 h-1 rounded-full mx-auto mb-5",

  identity: "flex items-center gap-3 mb-4",

  icon: "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl",

  name: "font-bold",

  metadata: sharedClasses.caption,

  message: "text-sm leading-relaxed mb-5",

  confirmation: "flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl",

  confirmationIcon: "text-sm",

  confirmationText: sharedClasses.textButton,

  actions: "flex flex-col gap-2.5",

  addAndDeleteButton:
    "w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95",

  deleteButton:
    "w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95",

  cancelButton: "w-full py-3 rounded-2xl font-bold text-sm transition-all",
} as const

export function createDeleteStockModalStyles(
  pal: ReturnType<typeof dmPalette>,

  dark: boolean,
) {
  return {
    overlay: sharedStyles.sheetOverlay,

    sheet: sharedStyles.cardBackground(pal),

    handle: sharedStyles.handle(pal),

    icon: { background: dark ? "#4a1a14" : "#f5ebe8" } satisfies CSSProperties,

    title: sharedStyles.sectionTitle(pal),

    secondaryText: sharedStyles.secondaryText(pal),

    primaryText: sharedStyles.primaryText(pal),

    confirmation: { background: pal.greenMuted } satisfies CSSProperties,

    accent: sharedStyles.accentText,

    addAndDeleteButton: {
      background: "#3d6648",

      color: "#fff",

      boxShadow: "0 4px 12px #3d664833",
    } satisfies CSSProperties,

    deleteButton: sharedStyles.dangerButton,

    cancelButton: sharedStyles.cancelButton(pal),
  }
}
