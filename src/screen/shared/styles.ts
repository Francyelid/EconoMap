import type { CSSProperties } from "react"

import type { dmPalette } from "@/theme"

import { priceColor } from "@/screen/Map/marketUtils"

type Palette = ReturnType<typeof dmPalette>

const communityBackground = {
  background: "var(--color-teal-light)",
} satisfies CSSProperties

const communityText = { color: "#2c6460" } satisfies CSSProperties

// Shared layout and typography patterns. Keep complete Tailwind class names.

export const sharedClasses = {
  selectionLabel:
    "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2",
  authField: "flex flex-col gap-1.5",
  authLabel: "text-xs font-bold uppercase tracking-wide",
  authInput: "w-full rounded-xl px-4 py-3 text-sm outline-none transition",
  authSubmitButton:
    "w-full py-4 rounded-2xl text-sm font-bold text-white transition-all active:scale-95 mt-1",

  confirmationSheet: "w-full rounded-t-3xl p-6 pb-8",
  confirmationHandle: "w-10 h-1 rounded-full mx-auto mb-5",
  dialogIntro: "flex flex-col items-center text-center mb-6",
  dialogButton: "w-full py-4 rounded-2xl font-bold text-sm",
  compactDialogHandle: "w-10 h-1 rounded-full mx-auto mb-4",
  formField: "flex flex-col gap-1",
  relativeContainer: "relative",
  dialogIcon:
    "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3",
  dialogTitle: "font-bold text-lg",
  confirmationMessage: "text-sm mt-1.5 leading-relaxed",
  animatedDialogButton:
    "w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95",
  alignedRow: "flex items-center gap-3",

  addItemSheet: "w-full rounded-t-3xl p-6 pb-8 flex flex-col gap-4",

  centeredHandle: "w-10 h-1 rounded-full mx-auto",

  formTitle: "font-bold text-base",

  quantityRow: "flex gap-3",

  customMarketInput: "w-full rounded-xl px-3 py-3 text-sm outline-none mt-2",

  formActions: "flex gap-2 pt-1",

  formCancelButton: "flex-1 py-3.5 rounded-2xl font-bold text-sm",

  formAddButton: "flex-1 py-3.5 rounded-2xl font-bold text-sm text-white",

  screen: "flex flex-col h-full",

  pageHeader: "px-4 pt-6 pb-3 flex-shrink-0",

  pageHeaderRow: "flex items-start justify-between mb-3",

  addIconButton:
    "w-9 h-9 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm",

  itemRow: "flex items-start gap-3",

  spaciousList: "space-y-3",

  compactList: "space-y-1.5",

  groupHeader: "flex items-center gap-2 mb-2",

  formLabel: "text-[10px] font-bold uppercase tracking-widest mb-1 block",

  formInput: "w-full rounded-xl px-3 py-3 text-sm outline-none",

  emptyList: "text-center py-16",

  emptyListIcon: "text-5xl mb-3",

  itemName: "font-semibold text-sm",

  priceSummaryCard: "rounded-2xl p-3 border",

  priceSummaryLabel: "text-[10px] font-semibold",

  priceSummaryMarket: "font-bold text-sm mt-1 truncate",

  priceSummaryValue: "font-mono text-lg font-bold",

  pageTitle: "text-xl font-bold",

  paddedCard: "rounded-2xl p-4",

  shadowCard: "rounded-2xl p-4 shadow-sm",

  spaciousSearchContainer: "flex items-center gap-2 rounded-xl px-3 py-2.5",

  fullWidth: "w-full",

  tinyBoldText: "text-[10px] font-bold",

  scrollingContent: "flex-1 overflow-y-auto",

  caption: "text-xs mt-0.5",

  priceBadge: "text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0",

  statLabel: "text-[10px] text-slate-500",

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

  itemIcon:
    "w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0",

  itemTitle: "font-bold text-sm",

  metadata: "text-[10px] mt-0.5",

  smallBoldText: "text-xs font-bold",

  filterRow: "flex gap-2",

  footer: "px-5 pb-8 flex-shrink-0",

  sheet: "w-full rounded-t-3xl flex flex-col",

  handleContainer: "flex justify-center pt-3 pb-1 flex-shrink-0",

  handle: "w-10 h-1 rounded-full",

  searchContainer: "flex items-center gap-2 rounded-xl px-3 py-2",

  searchInput: "flex-1 bg-transparent text-sm outline-none",

  filterGroup: "flex rounded-xl overflow-hidden",

  select: "flex-1 text-xs font-semibold rounded-xl px-2 py-2 outline-none",

  emptyIcon: "text-3xl mb-2",

  tinyText: "text-[10px]",
} as const

// Each helper requires only the palette fields used by its pattern.

export const sharedStyles = {
  authSubmitButton: (
    pal: Pick<Palette, "border" | "textSecondary">,
    canSubmit: boolean,
  ): CSSProperties => ({
    background: canSubmit
      ? "linear-gradient(135deg, #3d6648, #2c4e37)"
      : pal.border,
    color: canSubmit ? "#fff" : pal.textSecondary,
    boxShadow: canSubmit ? "0 4px 16px #3d664844" : "none",
  }),
  paletteDivider: (pal: Pick<Palette, "divider">): CSSProperties => ({
    background: pal.divider,
  }),

  dialogOverlay: {
    background: "rgba(44,36,22,0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 50,
  } satisfies CSSProperties,

  greenMutedBackground: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    background: pal.greenMuted,
  }),

  brandText: { color: "#3d6648" } satisfies CSSProperties,

  dangerText: { color: "#c04830" } satisfies CSSProperties,
  dangerIconBackground: (dark: boolean): CSSProperties => ({
    background: dark ? "#4a1a14" : "#f5ebe8",
  }),
  dialogCancelButton: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    background: pal.cardAlt,
    color: pal.textPrimary,
  }),

  customMarketInput: (
    pal: Pick<Palette, "inputBg" | "textPrimary">,
  ): CSSProperties => ({
    background: pal.inputBg,

    border: "1px solid var(--color-amber)",

    color: pal.textPrimary,
  }),

  cancelButton: (
    pal: Pick<Palette, "inputBg" | "textSecondary">,
  ): CSSProperties => ({ background: pal.inputBg, color: pal.textSecondary }),

  addItemButton: (hasName: boolean): CSSProperties => ({
    background: hasName ? "var(--color-brand-green)" : "#c8bfb2",

    boxShadow: hasName ? "0 4px 12px #3d664833" : "none",
  }),

  dangerBackground: {
    background: "var(--color-terracotta-light)",
  } satisfies CSSProperties,

  dangerButton: {
    background: "var(--color-terracotta-light)",

    color: "var(--color-terracotta)",
  } satisfies CSSProperties,

  pageHeader: (pal: Pick<Palette, "headerBg" | "border">): CSSProperties => ({
    background: pal.headerBg,

    borderBottom: `1px solid ${pal.border}`,
  }),

  cardBackground: (pal: Pick<Palette, "card">): CSSProperties => ({
    background: pal.card,
  }),

  accentBackground: {
    background: "var(--color-brand-green)",
  } satisfies CSSProperties,

  divider: { background: "#c8bfb2" } satisfies CSSProperties,

  brandGradient: {
    background:
      "linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-light))",
  } satisfies CSSProperties,

  sheetOverlay: {
    background: "rgba(44,36,22,0.45)",

    backdropFilter: "blur(3px)",

    zIndex: 50,
  } satisfies CSSProperties,

  selectedFilter: (
    pal: Pick<Palette, "inputBg" | "textSecondary">,

    selected: boolean,
  ): CSSProperties => ({
    background: selected ? "var(--color-brand-green)" : pal.inputBg,

    color: selected ? "#fff" : pal.textSecondary,
  }),

  chartHeight: (height: number): CSSProperties => ({ height }),

  priceVariation: (variation: number): CSSProperties => ({
    color:
      variation >= 0 ? "var(--color-terracotta)" : "var(--color-brand-green)",
  }),

  priceBadge: (priceIndex: number): CSSProperties => ({
    color: priceColor(priceIndex),

    background: priceColor(priceIndex) + "20",
  }),

  priceBackground: (priceIndex: number): CSSProperties => ({
    background: priceColor(priceIndex) + "20",
  }),

  priceText: (priceIndex: number): CSSProperties => ({
    color: priceColor(priceIndex),
  }),

  communityBackground,

  communityText,

  communityBadge: {
    ...communityBackground,

    ...communityText,
  } satisfies CSSProperties,

  border: (pal: Pick<Palette, "border">): CSSProperties => ({
    border: `1px solid ${pal.border}`,
  }),

  tealBackground: (dark = false): CSSProperties =>
    dark ? { background: "#0d3534" } : communityBackground,

  tealText: (dark = false): CSSProperties =>
    dark ? { color: "#5eead4" } : communityText,

  chevronRotation: (degrees: number): CSSProperties => ({
    transform: `rotate(${degrees}deg)`,

    transition: "transform .2s",
  }),

  serifHeading: { fontFamily: "Lora, serif" } satisfies CSSProperties,

  mutedBrandText: { color: "var(--color-bark-light)" } satisfies CSSProperties,

  translucentButton: {
    background: "rgba(255,255,255,0.15)",
  } satisfies CSSProperties,

  alternateCard: (pal: Pick<Palette, "cardAlt" | "border">): CSSProperties => ({
    background: pal.cardAlt,

    border: `1px solid ${pal.border}`,
  }),

  mutedText: (pal: Pick<Palette, "textMuted">): CSSProperties => ({
    color: pal.textMuted,
  }),

  primaryText: (pal: Pick<Palette, "textPrimary">): CSSProperties => ({
    color: pal.textPrimary,
  }),

  secondaryText: (pal: Pick<Palette, "textSecondary">): CSSProperties => ({
    color: pal.textSecondary,
  }),

  primaryButton: {
    background: "linear-gradient(135deg, var(--color-brand-green), #2c4e37)",

    boxShadow: "0 4px 16px #3d664844",
  } satisfies CSSProperties,

  secondaryButton: (
    pal: Pick<Palette, "cardAlt" | "textPrimary" | "border">,
  ): CSSProperties => ({
    background: pal.cardAlt,

    color: pal.textPrimary,

    border: `1px solid ${pal.border}`,
  }),

  sectionTitle: (pal: Pick<Palette, "textPrimary">): CSSProperties => ({
    color: pal.textPrimary,

    fontFamily: "Lora, serif",
  }),

  accentText: { color: "var(--color-brand-green)" } satisfies CSSProperties,

  card: (pal: Pick<Palette, "card" | "border">): CSSProperties => ({
    background: pal.card,

    border: `1px solid ${pal.border}`,
  }),

  pageBackground: (pal: Pick<Palette, "bg">): CSSProperties => ({
    background: pal.bg,
  }),

  input: (
    pal: Pick<Palette, "inputBg" | "border" | "textPrimary">,
  ): CSSProperties => ({
    background: pal.inputBg,

    border: `1px solid ${pal.border}`,

    color: pal.textPrimary,
  }),

  handle: (pal: Pick<Palette, "border">): CSSProperties => ({
    background: pal.border,
  }),

  searchContainer: (
    pal: Pick<Palette, "inputBg" | "border">,
  ): CSSProperties => ({
    background: pal.inputBg,

    border: `1px solid ${pal.border}`,
  }),
}

export const sharedChartAppearance = {
  gridColor: "#f1f5f9",

  labelColor: "#94a3b8",

  basketColor: "var(--color-brand-green)",

  pointBorder: "white",

  fontSize: "8.5",

  compactFontSize: "8",

  fontFamily: "DM Mono, monospace",

  gridWidth: "1",

  lineWidth: "2.2",

  pointWidth: "1.5",

  lineJoin: "round",

  lineCap: "round",

  areaOpacity: "0.18",

  areaEndOpacity: "0",
} as const

export function createStockStatusColors(dark: boolean) {
  return {
    expiredBackground: dark ? "#2d1a1a" : "#fef2f2",

    expiredBorder: dark ? "#5c2626" : "#fecaca",

    expiredLabel: dark ? "#f87171" : "#ef4444",

    expiredText: dark ? "#fca5a5" : "#b91c1c",

    warningBackground: dark ? "#2d2010" : "#fff7ed",

    warningBorder: dark ? "#5c3d10" : "#fed7aa",

    warningLabel: dark ? "#fb923c" : "#f97316",

    warningText: dark ? "#fdba74" : "#c2410c",

    okBackground: dark ? "#0f2a1a" : "#f0fdf4",

    okBorder: dark ? "#1a4d2e" : "#bbf7d0",

    okLabel: dark ? "#4ade80" : "#16a34a",

    okText: dark ? "#86efac" : "#15803d",

    expiredBadge: dark ? "#5c2626" : "#fee2e2",

    warningBadge: dark ? "#5c3d10" : "#ffedd5",

    okBadge: dark ? "#1a4d2e" : "#dcfce7",
  }
}
