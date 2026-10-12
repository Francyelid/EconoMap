import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { CommunityPalette } from "../types"

export const communitySummaryClasses = {
  banner: "mx-4 mt-3 rounded-xl overflow-hidden flex-shrink-0",
  bannerContent: "px-3 py-2.5 flex items-start gap-2",
  bannerIcon: "text-base flex-shrink-0 mt-0.5",
  bannerText: "text-[10px] leading-relaxed",
  statsRow: "flex",
  statCell: "flex-1 py-2 text-center",
  statValue: sharedClasses.smallBoldText,
  statLabel: "text-[9px]",
} as const

export function createCommunitySummaryStyles(
  pal: Pick<CommunityPalette, "cardAlt" | "divider">,
  dark: boolean,
) {
  return {
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
  }
}
