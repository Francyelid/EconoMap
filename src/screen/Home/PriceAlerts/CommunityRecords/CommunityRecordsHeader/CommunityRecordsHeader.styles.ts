import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { CommunityPalette } from "../types"

export const communityRecordsHeaderClasses = {
  handleContainer: sharedClasses.handleContainer,
  handle: sharedClasses.handle,
  header: "px-5 pt-1 pb-3 flex items-start justify-between flex-shrink-0",
  title: "font-bold",
  subtitle: sharedClasses.metadata,
  closeButton: "text-lg leading-none mt-0.5",
} as const

export function createCommunityRecordsHeaderStyles(
  pal: Pick<CommunityPalette, "border" | "divider" | "textPrimary" | "textSecondary" | "textMuted">,
) {
  return {
    handle: sharedStyles.handle(pal),
    header: {
      borderBottom: `1px solid ${pal.divider}`,
    } satisfies CSSProperties,
    title: sharedStyles.sectionTitle(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    mutedText: sharedStyles.mutedText(pal),
  }
}
