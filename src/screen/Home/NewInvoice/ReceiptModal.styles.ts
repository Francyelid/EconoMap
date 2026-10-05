import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const receiptModalClasses = {
  overlay: sharedClasses.overlay,
  sheet: "w-full flex flex-col",
  content: sharedClasses.content,
  storeCard: "rounded-2xl p-4 space-y-2",
  sectionTitle: sharedClasses.sectionTitle,
  storeName: "text-sm font-bold",
  caption: sharedClasses.smallText,
  items: sharedClasses.list,
  itemCard: sharedClasses.compactCard,
  details: sharedClasses.details,
  itemName: sharedClasses.emphasizedText,
  itemActions: "flex gap-1",
  iconButton: "w-8 h-8 rounded-xl flex items-center justify-center text-base",
  shareCard: "flex items-center gap-3 rounded-2xl p-4",
  shareDetails: sharedClasses.fill,
  toggle: "relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200",
  toggleThumb: "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200",
  footer: "px-5 pb-8 flex-shrink-0 space-y-2",
  primaryButton: sharedClasses.primaryButton,
  secondaryButton: "w-full py-3 rounded-2xl font-semibold text-sm",
} as const

export function createReceiptModalStyles(pal: Pick<ReturnType<typeof dmPalette>, "card" | "cardAlt" | "border" | "textMuted" | "textPrimary" | "textSecondary">) {
  return {
    overlay: { background: "rgba(44,36,22,0.6)", backdropFilter: "blur(4px)", zIndex: 60 } satisfies CSSProperties,
    sheet: { height: "90%", background: pal.card, borderRadius: "24px 24px 0 0" } satisfies CSSProperties,
    card: sharedStyles.alternateCard(pal),
    mutedText: sharedStyles.mutedText(pal),
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    iconButton: { background: pal.card } satisfies CSSProperties,
    toggle: (shareWithUsers: boolean): CSSProperties => ({ background: shareWithUsers ? "var(--color-brand-green)" : "var(--color-cream-dark)" }),
    toggleThumb: (shareWithUsers: boolean): CSSProperties => ({ left: shareWithUsers ? "calc(100% - 1.375rem)" : "0.125rem" }),
    primaryButton: sharedStyles.primaryButton,
    secondaryButton: sharedStyles.secondaryButton(pal),
  }
}
