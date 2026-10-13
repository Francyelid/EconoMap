import { sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"

export const homeHeaderClasses = {
  hero: "relative overflow-hidden px-5 pt-6 pb-8",
  decorationTop: "absolute top-4 right-4 w-28 h-28 rounded-full opacity-10",
  decorationBottom:
    "absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10",
  greetingRow: "relative flex items-center justify-between mb-5",
  greeting: "text-green-200 text-xs font-medium tracking-wide",
  title: "text-white font-bold text-xl mt-0.5",
  avatarButton:
    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white/30 active:scale-95 transition-transform",
} as const

export const homeHeaderStyles = {
  hero: {
    background:
      "linear-gradient(150deg, var(--color-brand-green) 0%, var(--color-brand-green-light) 55%, #5a9468 100%)",
  },
  decoration: { background: "var(--color-cream)" },
  heading: sharedStyles.serifHeading,
  avatar: { background: "var(--color-amber)", color: "var(--color-bark)" },
} satisfies Record<string, CSSProperties>
