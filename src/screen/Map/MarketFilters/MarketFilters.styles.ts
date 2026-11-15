import type { dmPalette } from "@/theme"

export function createMarketFiltersStyles(p: ReturnType<typeof dmPalette>) {
  return {
    card: { background: p.card, borderColor: p.border },
    search: {
      background: p.inputBg,
      borderColor: p.border,
      color: p.textSecondary,
    },
    accent: { background: p.greenMuted, color: p.green },
    text: { color: p.textPrimary },
    secondary: { color: p.textSecondary },
    surface: { background: p.cardAlt },
    divider: { borderColor: p.divider },
    option: (active: boolean) => ({
      background: active ? p.greenMuted : p.card,
      borderColor: active ? p.green : p.border,
      color: p.textPrimary,
    }),
    checkbox: (active: boolean) => ({
      borderColor: active ? p.green : p.border,
      background: active ? p.green : "transparent",
      color: "#fff",
    }),
    price: (active: boolean) => ({
      background: active ? p.green : "transparent",
      color: active ? "#fff" : p.textSecondary,
    }),
  }
}
