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
