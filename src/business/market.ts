import type { Market } from "@/models/Market"

import type { MarketTypeFilter } from "@/models/MarketType"

export type PriceFilter = "all" | "cheap" | "mid" | "expensive"

export function normalizeMarketName(name: string): string {
  return name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR")
}

export function findRegisteredMarket(
  markets: readonly Market[],
  name: string,
): Market | undefined {
  const normalized = normalizeMarketName(name)

  return normalized
    ? markets.find((market) => normalizeMarketName(market.name) === normalized)
    : undefined
}

export function suggestMarkets(
  markets: readonly Market[],
  name: string,
): Market[] {
  const normalized = normalizeMarketName(name)

  return normalized
    ? markets.filter((market) =>
        normalizeMarketName(market.name).includes(normalized),
      )
    : []
}

export function filterMarkets(
  markets: readonly Market[],
  typeFilter: MarketTypeFilter,
  searchFilter: string,
  priceFilter: PriceFilter,
): Market[] {
  return [...markets]

    .filter((m) => {
      if (typeFilter.length > 0 && !typeFilter.includes(m.type)) return false

      if (
        searchFilter &&
        !m.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
        !m.address.toLowerCase().includes(searchFilter.toLowerCase())
      )
        return false

      if (priceFilter === "cheap" && m.priceIndex > 45) return false

      if (priceFilter === "mid" && (m.priceIndex <= 45 || m.priceIndex > 65))
        return false

      if (priceFilter === "expensive" && m.priceIndex <= 65) return false

      return true
    })

    .sort((a, b) => a.priceIndex - b.priceIndex)
}
