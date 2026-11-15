import type { Market } from "@/models/Market"

export type PriceFilter = "all" | "cheap" | "mid" | "expensive"

export function filterMarkets(markets: readonly Market[], typeFilter: string, searchFilter: string, priceFilter: PriceFilter): Market[] {
  return [...markets]

    .filter((m) => {
      if (typeFilter !== "Todos" && m.type !== typeFilter) return false

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
