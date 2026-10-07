export function priceColor(idx: number) {
  if (idx <= 45) return "#16a34a"

  if (idx <= 65) return "#f97316"

  return "#ef4444"
}

export function priceLabel(idx: number) {
  if (idx <= 45) return "Barato"

  if (idx <= 65) return "Médio"

  return "Caro"
}

export const TYPE_EMOJI: Record<string, string> = {
  Supermercado: "🏪",

  Feira: "🥬",

  Atacado: "📦",

  Mercado: "🛒",

  Hortifruti: "🍎",
}
