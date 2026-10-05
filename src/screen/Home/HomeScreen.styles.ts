import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

// Reusable Tailwind patterns. Complete class names keep Tailwind detection intact.
export const homeClasses = {
  hero: "relative overflow-hidden px-5 pt-6 pb-8",
  decorationTop: "absolute top-4 right-4 w-28 h-28 rounded-full opacity-10",
  decorationBottom: "absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10",
  greetingRow: "relative flex items-center justify-between mb-5",
  greeting: "text-green-200 text-xs font-medium tracking-wide",
  title: "text-white font-bold text-xl mt-0.5",
  avatarButton: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white/30 active:scale-95 transition-transform",
  summaryCard: "relative rounded-2xl p-4",
  summaryLabel: "text-green-100 text-[10px] font-semibold uppercase tracking-widest",
  summaryRow: "flex items-end justify-between mt-1",
  summaryValue: "text-white font-bold text-3xl",
  summaryDecimals: "text-lg",
  badge: "text-[10px] font-bold px-2 py-1 rounded-full",
  statsRow: "flex gap-4 mt-3 pt-3",
  statLabel: "text-green-200 text-[10px]",
  statValue: "text-white font-bold text-base mt-0.5",
  actionSection: sharedClasses.sectionSpacing,
  primaryButton: "w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform",
  taglineRow: "px-5 mt-8 mb-1 flex items-center gap-2",
  divider: "h-px flex-1",
  tagline: "text-[10px] font-bold tracking-widest uppercase",
} as const

// Brand colors use the shared tokens in src/index.css; the palette follows dark mode.
export function createHomeStyles(p: ReturnType<typeof dmPalette>) {
  return {
    screen: { background: p.bg, minHeight: "100%" },
    hero: { background: "linear-gradient(150deg, var(--color-brand-green) 0%, var(--color-brand-green-light) 55%, #5a9468 100%)" },
    decoration: { background: "var(--color-cream)" },
    heading: sharedStyles.serifHeading,
    avatar: { background: "var(--color-amber)", color: "var(--color-bark)" },
    summaryCard: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" },
    badge: { background: "var(--color-teal)", color: "#fff" },
    statsRow: { borderTop: "1px solid rgba(255,255,255,0.15)" },
    statDivider: { width: 1, background: "rgba(255,255,255,0.15)" },
    primaryButton: { background: "var(--color-terracotta)", color: "#fff", boxShadow: "0 4px 16px #c0483044" },
    tealDivider: { background: "var(--color-teal)" },
    tagline: sharedStyles.mutedBrandText,
    amberDivider: { background: "var(--color-amber)" },
  } satisfies Record<string, CSSProperties>
}
