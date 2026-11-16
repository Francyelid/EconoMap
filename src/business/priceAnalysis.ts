import type { PriceHistory } from "@/models/PriceHistory"
import { normalizeSearchText } from "@/utils/search"

/** Os mocks são mensais: inclui os meses abrangidos pelas datas, sem interpolar preços. */
export function filterPriceMonths(
  data: PriceHistory,
  months: readonly string[],
  from = "",
  to = "",
) {
  const invalid = !!from && !!to && from > to
  const indices = months.flatMap((month, index) =>
    !invalid &&
    (!from || month >= from.slice(0, 7)) &&
    (!to || month <= to.slice(0, 7))
      ? [index]
      : [],
  )
  return {
    months: indices.map((index) => months[index]),
    data: Object.fromEntries(
      Object.entries(data).map(([product, markets]) => [
        product,
        Object.fromEntries(
          Object.entries(markets).map(([market, series]) => [
            market,
            indices.map((index) => series[index]),
          ]),
        ),
      ]),
    ) as PriceHistory,
  }
}

export function priceMarkets(data: PriceHistory): string[] {
  return [
    ...new Set(Object.values(data).flatMap((markets) => Object.keys(markets))),
  ]
}

/** Mercados com preço registrado; não representa disponibilidade em estoque. */
export function productPriceMarkets(
  data: PriceHistory,
  product: string,
): string[] {
  return Object.entries(data[product] ?? {})
    .filter(([, series]) => {
      const latest = series.at(-1)
      return latest != null && Number.isFinite(latest) && latest >= 0
    })
    .map(([market]) => market)
}

export function searchPriceProducts(
  data: PriceHistory,
  search: string,
): string[] {
  const query = normalizeSearchText(search)
  return query
    ? Object.keys(data).filter(
        (product) =>
          normalizeSearchText(product).includes(query) &&
          productPriceMarkets(data, product).length > 0,
      )
    : []
}

export function commonPriceProducts(
  data: PriceHistory,
  markets: readonly string[],
  search = "",
  maxPrice = "",
): string[] {
  if (markets.length < 2) return []
  const query = normalizeSearchText(search)
  const limit = Number(maxPrice.replace(",", "."))
  return Object.keys(data).filter((product) => {
    if (!markets.every((market) => (data[product][market]?.length ?? 0) > 0))
      return false
    if (!normalizeSearchText(product).includes(query)) return false
    return (
      !maxPrice.trim() ||
      !Number.isFinite(limit) ||
      markets.some(
        (market) => (data[product][market].at(-1) ?? Infinity) <= limit,
      )
    )
  })
}

export function hasCompleteHistory(
  series: readonly number[] | undefined,
  periods: number,
): boolean {
  return (
    !!series &&
    periods > 0 &&
    Array.from({ length: periods }, (_, index) => series[index]).every(
      (value) => Number.isFinite(value) && value >= 0,
    )
  )
}

/** Não transforma preços ausentes em zero nem soma cestas parciais. */
export function basketHistory(
  data: PriceHistory,
  products: readonly string[],
  market: string,
  periods: number,
): number[] | null {
  if (
    !products.length ||
    !products.every((product) =>
      hasCompleteHistory(data[product]?.[market], periods),
    )
  )
    return null
  return Array.from({ length: periods }, (_, index) =>
    products.reduce((sum, product) => sum + data[product][market][index], 0),
  )
}
