import type { Product } from "@/models/Product"
import { normalizeSearchText } from "@/utils/search"

/** O mesmo nome com unidades diferentes representa opções distintas. */
export function uniqueProducts(products: readonly Product[]): Product[] {
  const seen = new Set<string>()
  return products.filter((product) => {
    const key = `${normalizeSearchText(product.name)}|${product.unit}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function suggestProducts(
  products: readonly Product[],
  name: string,
): Product[] {
  const query = normalizeSearchText(name)
  if (!query) return []
  return uniqueProducts(products).filter((product) =>
    normalizeSearchText(product.name).includes(query),
  )
}
