import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const newReceiptQRClasses = {
  content: "flex-1 flex flex-col items-center justify-center px-6 gap-6 overflow-y-auto",
  viewfinder: "relative flex items-center justify-center",
  corners: "absolute inset-0",
  scanLine: "absolute left-4 right-4 h-0.5 animate-pulse",
  scanIcon: "flex flex-col items-center gap-2",
  instruction: "text-sm text-center font-semibold",
  status: "text-xs text-center animate-pulse",
  footer: sharedClasses.footer,
  manualButton: "w-full py-3.5 rounded-2xl font-bold text-sm",
} as const

export function createNewReceiptQRStyles(pal: Pick<ReturnType<typeof dmPalette>, "textSecondary" | "textMuted" | "cardAlt" | "textPrimary" | "border">) {
  return {
    viewfinder: { width: 240, height: 240, background: "#111", borderRadius: 16 } satisfies CSSProperties,
    scanLine: { background: "var(--color-teal)", top: "48%", boxShadow: "0 0 8px var(--color-teal)" } satisfies CSSProperties,
    secondaryText: sharedStyles.secondaryText(pal),
    mutedText: sharedStyles.mutedText(pal),
    manualButton: sharedStyles.secondaryButton(pal),
  }
}
