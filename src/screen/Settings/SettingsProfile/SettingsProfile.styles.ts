import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const settingsProfileClasses = {
  hero: "px-5 pt-6 pb-8 relative overflow-hidden",
  topDecoration: "absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10",
  bottomDecoration:
    "absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-10",
  backButton:
    "relative flex items-center gap-1.5 mb-4 opacity-80 hover:opacity-100 transition-opacity",
  backLabel: "text-xs font-semibold text-white",
  profileRow: "relative flex items-center gap-4",
  avatarContainer: "relative flex-shrink-0",
  avatar:
    "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-white/30",
  editAvatar:
    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px]",
  profileName: "text-white font-bold text-lg leading-tight",
  profileEmail: "text-[11px] mt-0.5",
  badgeContainer: "flex items-center gap-1.5 mt-2",
  badge: "text-[9px] font-bold px-2 py-0.5 rounded-full",
  stats: "relative flex gap-0 mt-5 rounded-xl overflow-hidden",
  stat: "flex-1 py-3 text-center",
  statValue: "text-white font-bold text-base leading-none",
  statLabel: "text-[9px] mt-1",
} as const
export const settingsProfileStyles = {
  hero: {
    background:
      "linear-gradient(150deg, #2c4e37 0%, #3d6648 60%, #4e7f5a 100%)",
  } satisfies CSSProperties,
  decoration: { background: "#ede8df" } satisfies CSSProperties,
  avatar: {
    background: "#e8a530",
    color: "#2c2416",
    fontFamily: "Lora, serif",
  } satisfies CSSProperties,
  editAvatar: {
    background: "#4cb5b0",
    border: "2px solid #3d6648",
  } satisfies CSSProperties,
  profileMetadata: { color: "#a8c9b0" } satisfies CSSProperties,
  badge: {
    background: "#e8a530",
    color: "#2c2416",
  } satisfies CSSProperties,
  stats: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
  } satisfies CSSProperties,
  stat: (i: number): CSSProperties => ({
    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none",
  }),
}
