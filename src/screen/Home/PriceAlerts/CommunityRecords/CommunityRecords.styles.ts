import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { CommunityPalette } from "./types"

export const communityRecordsClasses = {
  overlay: sharedClasses.overlay,
  sheet: sharedClasses.sheet,
} as const

export function createCommunityRecordsStyles(
  pal: Pick<CommunityPalette, "card">,
) {
  return {
    overlay: sharedStyles.sheetOverlay,
    sheet: { background: pal.card, maxHeight: "82%" } satisfies CSSProperties,
  }
}
