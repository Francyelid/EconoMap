import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const settingsScreenClasses = {
  toggle:
    "relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200",
  toggleThumb:
    "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200",
  row: "w-full flex items-center gap-3 px-4 py-3.5",
  interactiveRow:
    "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all active:opacity-70",
  sectionLabel: "text-[10px] font-bold tracking-widest uppercase px-4 mb-1",
  section: "rounded-2xl overflow-hidden",
  divider: "mx-4",
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
  sections: "px-4 py-5 space-y-4",
  logoutButton:
    "w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95",
  footer: "text-center text-[10px] pb-2",
  logoutOverlay: "absolute inset-0 flex items-end justify-center",
  logoutActions: "flex flex-col gap-3",
} as const

export const settingsScreenStyles = {
  toggle: (on: boolean): CSSProperties => ({
    background: on ? "#3d6648" : "#e0d9cd",
  }),
  toggleThumb: (on: boolean): CSSProperties => ({
    left: on ? "calc(100% - 1.375rem)" : "0.125rem",
  }),
  rowIcon: (
    danger: boolean,
    dark: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: danger ? (dark ? "#4a1a14" : "#f5ebe8") : pal.cardAlt,
  }),
  rowLabel: (
    danger: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({ color: danger ? "#c04830" : pal.textPrimary }),
  row: { background: "transparent" } satisfies CSSProperties,

  divider: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    height: 1,
    background: pal.divider,
  }),
  screen: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    background: pal.bg,
    minHeight: "100%",
  }),
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
  logoutButton: {
    background: "#f5ebe8",
    color: "#c04830",
    border: "1.5px solid #e8c4bc",
  } satisfies CSSProperties,

  confirmLogoutButton: {
    background: "#c04830",
    color: "#fff",
    boxShadow: "0 4px 16px #c0483033",
  } satisfies CSSProperties,
}
