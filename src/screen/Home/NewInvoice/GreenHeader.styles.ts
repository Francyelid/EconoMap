import { sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"

export const greenHeaderClasses = {
  header: "flex-shrink-0 px-5 pt-5 pb-4 flex items-center gap-3",
  backButton: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
  title: "text-base font-bold text-white flex-1",
  closeButton: "w-8 h-8 rounded-full flex items-center justify-center",
} as const

export function createGreenHeaderStyles() {
  return {
    header: { background: "linear-gradient(135deg, #2c4e37 0%, var(--color-brand-green) 100%)", borderRadius: "24px 24px 0 0" } satisfies CSSProperties,
    iconButton: sharedStyles.translucentButton,
    title: sharedStyles.serifHeading,
  }
}
