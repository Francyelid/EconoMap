const TODAY = new Date("2026-08-23")

export function daysUntil(dateStr: string) {
  return Math.floor((new Date(dateStr).getTime() - TODAY.getTime()) / 86400000)
}

export function expiryStatus(dateStr: string): "expired" | "warning" | "ok" {
  const d = daysUntil(dateStr)

  if (d < 0) return "expired"

  if (d <= 7) return "warning"

  return "ok"
}

export function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-")

  return `${d}/${m}/${y}`
}

export { CATEGORY_ICONS } from "@/constants/icons"
