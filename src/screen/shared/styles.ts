import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

type Palette = ReturnType<typeof dmPalette>

// Shared layout and typography patterns. Keep complete Tailwind class names.
export const sharedClasses = {
  sectionSpacing: "px-4 mt-4",
  overlay: "absolute inset-0 flex items-end",
  content: "flex-1 overflow-y-auto px-5 py-4 space-y-4",
  sectionTitle: "text-xs font-bold uppercase tracking-widest",
  smallText: "text-xs",
  list: "space-y-2",
  compactCard: "rounded-2xl p-3 flex items-center gap-3",
  details: "flex-1 min-w-0",
  emphasizedText: "text-sm font-semibold",
  fill: "flex-1",
  primaryButton: "w-full py-3.5 rounded-2xl font-bold text-sm text-white",
  sectionHeader: "flex items-center justify-between mb-3",
  heading: "text-base font-bold",
  textButton: "text-xs font-semibold",
  itemIcon: "w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0",
  itemTitle: "font-bold text-sm",
  metadata: "text-[10px] mt-0.5",
  smallBoldText: "text-xs font-bold",
  filterRow: "flex gap-2",
  footer: "px-5 pb-8 flex-shrink-0",
  sheet: "w-full rounded-t-3xl flex flex-col",
  handleContainer: "flex justify-center pt-3 pb-1 flex-shrink-0",
  handle: "w-10 h-1 rounded-full",
  searchContainer: "flex items-center gap-2 rounded-xl px-3 py-2",
  select: "flex-1 text-xs font-semibold rounded-xl px-2 py-2 outline-none",
  emptyIcon: "text-3xl mb-2",
  tinyText: "text-[10px]",
} as const

// Each helper requires only the palette fields used by its pattern.
export const sharedStyles = {
  serifHeading: { fontFamily: "Lora, serif" } satisfies CSSProperties,
  mutedBrandText: { color: "var(--color-bark-light)" } satisfies CSSProperties,
  translucentButton: { background: "rgba(255,255,255,0.15)" } satisfies CSSProperties,
  alternateCard: (pal: Pick<Palette, "cardAlt" | "border">): CSSProperties => ({ background: pal.cardAlt, border: `1px solid ${pal.border}` }),
  mutedText: (pal: Pick<Palette, "textMuted">): CSSProperties => ({ color: pal.textMuted }),
  primaryText: (pal: Pick<Palette, "textPrimary">): CSSProperties => ({ color: pal.textPrimary }),
  secondaryText: (pal: Pick<Palette, "textSecondary">): CSSProperties => ({ color: pal.textSecondary }),
  primaryButton: { background: "linear-gradient(135deg, var(--color-brand-green), #2c4e37)", boxShadow: "0 4px 16px #3d664844" } satisfies CSSProperties,
  secondaryButton: (pal: Pick<Palette, "cardAlt" | "textPrimary" | "border">): CSSProperties => ({ background: pal.cardAlt, color: pal.textPrimary, border: `1px solid ${pal.border}` }),
  sectionTitle: (pal: Pick<Palette, "textPrimary">): CSSProperties => ({ color: pal.textPrimary, fontFamily: "Lora, serif" }),
  accentText: { color: "var(--color-brand-green)" } satisfies CSSProperties,
  card: (pal: Pick<Palette, "card" | "border">): CSSProperties => ({ background: pal.card, border: `1px solid ${pal.border}` }),
  pageBackground: (pal: Pick<Palette, "bg">): CSSProperties => ({ background: pal.bg }),
  input: (pal: Pick<Palette, "inputBg" | "border" | "textPrimary">): CSSProperties => ({ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }),
  handle: (pal: Pick<Palette, "border">): CSSProperties => ({ background: pal.border }),
  searchContainer: (pal: Pick<Palette, "inputBg" | "border">): CSSProperties => ({ background: pal.inputBg, border: `1px solid ${pal.border}` }),
}
