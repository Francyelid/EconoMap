import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { CommunityPalette } from "../types"

export const communityFiltersClasses = {
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
} as const

export function createCommunityFiltersStyles(
  pal: Pick<CommunityPalette, "inputBg" | "border" | "textPrimary" | "textSecondary" | "textMuted">,
  dark: boolean,
) {
  return {
    secondaryText: sharedStyles.secondaryText(pal),
    mutedText: sharedStyles.mutedText(pal),
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
  }
}
