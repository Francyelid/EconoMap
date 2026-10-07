import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { CSSProperties } from "react"

import type { dmPalette } from "@/theme"

export const communityRecordsClasses = {
  neutralBadge: "text-[10px] font-bold px-1.5 py-0.5 rounded-md",

  trendBadge:
    "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md",

  overlay: sharedClasses.overlay,

  sheet: sharedClasses.sheet,

  handleContainer: sharedClasses.handleContainer,

  handle: sharedClasses.handle,

  header: "px-5 pt-1 pb-3 flex items-start justify-between flex-shrink-0",

  title: "font-bold",

  subtitle: sharedClasses.metadata,

  closeButton: "text-lg leading-none mt-0.5",

  banner: "mx-4 mt-3 rounded-xl overflow-hidden flex-shrink-0",

  bannerContent: "px-3 py-2.5 flex items-start gap-2",

  bannerIcon: "text-base flex-shrink-0 mt-0.5",

  bannerText: "text-[10px] leading-relaxed",

  statsRow: "flex",

  statCell: "flex-1 py-2 text-center",

  statValue: sharedClasses.smallBoldText,

  statLabel: "text-[9px]",

  filters: "px-4 mt-3 space-y-2 flex-shrink-0",

  searchContainer: sharedClasses.searchContainer,

  searchInput: sharedClasses.searchInput,

  clearButton: sharedClasses.smallText,

  filterRow: sharedClasses.filterRow,

  select: sharedClasses.select,

  maxPriceContainer: "flex items-center gap-1 rounded-xl px-2 py-2",

  maxPriceLabel: sharedClasses.tinyBoldText,

  maxPriceInput: "w-12 bg-transparent text-xs font-mono font-bold outline-none",

  trendGroup: sharedClasses.filterGroup,

  trendButton: "px-2 py-2 text-[10px] font-bold transition-all",

  results: "overflow-y-auto px-4 py-3",

  emptyState: "text-center py-8",

  emptyIcon: sharedClasses.emptyIcon,

  emptyMessage: sharedClasses.emphasizedText,

  group: "mb-4",

  groupHeader: "flex items-center gap-2 mb-2",

  groupLabel: "text-[10px] font-bold px-2 py-0.5 rounded-full",

  caption: sharedClasses.tinyText,

  item: "flex items-center gap-3 rounded-xl px-3 py-2.5 mb-1",

  details: sharedClasses.details,

  product: "text-sm font-semibold truncate",

  price: "font-mono font-bold text-sm flex-shrink-0",
} as const

export function createCommunityRecordsStyles(
  pal: Pick<ReturnType<typeof dmPalette>, "cardAlt" | "textSecondary" | "card" | "border" | "divider" | "textPrimary" | "textMuted" | "inputBg" | "bg" | "greenMuted">,

  dark: boolean,
) {
  return {
    neutralBadge: {
      background: pal.cardAlt,

      color: pal.textSecondary,
    } satisfies CSSProperties,

    trendBadge: (diff: number): CSSProperties => ({
      background:
        diff > 0
          ? "var(--color-terracotta-light)"
          : "var(--color-brand-green-muted)",

      color: diff > 0 ? "var(--color-terracotta)" : "var(--color-brand-green)",
    }),

    overlay: sharedStyles.sheetOverlay,

    sheet: { background: pal.card, maxHeight: "82%" } satisfies CSSProperties,

    handle: sharedStyles.handle(pal),

    header: {
      borderBottom: `1px solid ${pal.divider}`,
    } satisfies CSSProperties,

    title: sharedStyles.sectionTitle(pal),

    secondaryText: sharedStyles.secondaryText(pal),

    mutedText: sharedStyles.mutedText(pal),

    banner: { border: "1px solid var(--color-teal)" } satisfies CSSProperties,

    bannerContent: sharedStyles.tealBackground(dark),

    bannerText: sharedStyles.tealText(dark),

    statsRow: {
      background: pal.cardAlt,

      borderTop: `1px solid ${dark ? "#1a4d4b" : "#b2e0de"}`,
    } satisfies CSSProperties,

    statCell: (i: number): CSSProperties => ({
      borderRight: i < 2 ? `1px solid ${pal.divider}` : "none",
    }),

    tealText: { color: "var(--color-teal)" } satisfies CSSProperties,

    totalCell: {
      borderLeft: `1px solid ${pal.divider}`,
    } satisfies CSSProperties,

    searchContainer: sharedStyles.searchContainer(pal),

    primaryText: sharedStyles.primaryText(pal),

    select: sharedStyles.input(pal),

    maxPriceContainer: {
      background: pal.inputBg,

      border: `1px solid ${pal.border}`,

      minWidth: 90,
    } satisfies CSSProperties,

    trendGroup: sharedStyles.border(pal),

    trendButton: (
      trendFilter: "all" | "up" | "down",

      k: "all" | "up" | "down",
    ): CSSProperties => ({
      background:
        trendFilter === k
          ? k === "up"
            ? dark
              ? "#4a1a14"
              : "var(--color-terracotta-light)"
            : k === "down"
              ? dark
                ? "#1a3329"
                : "var(--color-brand-green-muted)"
              : "var(--color-brand-green)"
          : pal.inputBg,

      color:
        trendFilter === k
          ? k === "up"
            ? dark
              ? "#fca5a5"
              : "var(--color-terracotta)"
            : k === "down"
              ? dark
                ? "#86efac"
                : "var(--color-brand-green)"
              : "#fff"
          : pal.textSecondary,
    }),

    results: sharedStyles.pageBackground(pal),

    groupLabel: {
      background: pal.greenMuted,

      color: "var(--color-brand-green)",
    } satisfies CSSProperties,

    item: sharedStyles.card(pal),
  }
}
