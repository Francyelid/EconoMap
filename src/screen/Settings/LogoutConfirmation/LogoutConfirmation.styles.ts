import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"
export const logoutConfirmationClasses = {
  logoutOverlay: "absolute inset-0 flex items-end justify-center",
  logoutActions: "flex flex-col gap-3",
} as const
export const logoutConfirmationStyles = {
  confirmLogoutButton: {
    background: "#c04830",
    color: "#fff",
    boxShadow: "0 4px 16px #c0483033",
  } satisfies CSSProperties,
}
