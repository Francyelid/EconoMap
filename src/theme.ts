import { createContext, useContext } from "react"

export const DarkCtx = createContext(false)
export const useDark = () => useContext(DarkCtx)

// Dark-mode palette helper — call inside any component
export function dmPalette(dark: boolean) {
  return {
    bg:           dark ? "#111827" : "#ede8df",
    card:         dark ? "#1f2937" : "#fff",
    cardAlt:      dark ? "#111827" : "#f8f5f1",
    border:       dark ? "#374151" : "#e0d9cd",
    divider:      dark ? "#374151" : "#f0ebe4",
    headerBg:     dark ? "#0f172a" : "#fff",
    textPrimary:  dark ? "#f3f4f6" : "#2c2416",
    textSecondary:dark ? "#9ca3af" : "#9c8e7e",
    textMuted:    dark ? "#4b5563" : "#c8bfb2",
    inputBg:      dark ? "#1f2937" : "#f8f5f1",
    green:        "#3d6648",
    greenMuted:   dark ? "#1a3329" : "#d4e6d9",
  }
}
