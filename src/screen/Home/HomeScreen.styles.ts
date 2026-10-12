import { sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const homeClasses = {
  taglineRow: "px-5 mt-8 mb-1 flex items-center gap-2",
  divider: "h-px flex-1",
  tagline: "text-[10px] font-bold tracking-widest uppercase",
} as const

export function createHomeStyles(p: ReturnType<typeof dmPalette>) {
  return {
    screen: { background: p.bg, minHeight: "100%" },
    tealDivider: { background: "var(--color-teal)" },
    tagline: sharedStyles.mutedBrandText,
    amberDivider: { background: "var(--color-amber)" },
  } satisfies Record<string, CSSProperties>
}
