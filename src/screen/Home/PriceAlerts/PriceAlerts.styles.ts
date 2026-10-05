import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const priceAlertsClasses = {
  section: sharedClasses.sectionSpacing,
  header: sharedClasses.sectionHeader,
  title: sharedClasses.heading,
  viewAllButton: sharedClasses.textButton,
  list: sharedClasses.list,
  card: sharedClasses.compactCard,
  icon: sharedClasses.itemIcon,
  details: sharedClasses.details,
  productRow: "flex items-center gap-2",
  product: sharedClasses.itemTitle,
  badge: "text-xs font-bold px-1.5 py-0.5 rounded-md",
  tip: "text-xs mt-0.5 truncate",
} as const

export function createPriceAlertsStyles(p: Pick<ReturnType<typeof dmPalette>, "textPrimary" | "card">) {
  return {
    title: sharedStyles.sectionTitle(p),
    accent: sharedStyles.accentText,
    card: (up: boolean): CSSProperties => ({ background: p.card, border: `1px solid ${up ? "var(--color-terracotta-muted)" : "var(--color-brand-green-muted)"}` }),
    icon: (up: boolean): CSSProperties => ({ background: up ? "var(--color-terracotta-light)" : "var(--color-brand-green-muted)" }),
    primaryText: sharedStyles.primaryText(p),
    badge: (up: boolean): CSSProperties => ({ background: up ? "var(--color-terracotta-light)" : "var(--color-brand-green-muted)", color: up ? "var(--color-terracotta)" : "var(--color-brand-green)", }),
    tip: sharedStyles.mutedBrandText,
  }
}
