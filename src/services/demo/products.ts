import type { Product } from "@/models/Product"
import type { ProductCategory } from "@/models/ProductCategory"
import { STOCK_INIT } from "@/mocks/STOCK_INIT"
import { SHOPPING_INIT } from "@/mocks/SHOPPING_INIT"
import { EXAMPLE_PRODUCTS } from "@/mocks/PRODUCT_EXAMPLES"
import { uniqueProducts } from "@/business/product"
import { normalizeSearchText } from "@/utils/search"
export { PRODUCT_EXAMPLES } from "@/mocks/PRODUCT_EXAMPLES"

const LEGACY_CATEGORIES: Record<string, ProductCategory> = {
  Grãos: "Mercearia básica",
  Condimentos: "Temperos e condimentos",
  Massas: "Massas e molhos",
  Laticínios: "Leites e derivados",
  Enlatados: "Enlatados e conservas",
  Bebidas: "Cafés e chás",
  Hortifruti: "Hortifrúti",
  Carnes: "Carnes e aves",
  Padaria: "Padaria e confeitaria",
}

const existingProducts: Product[] = [
  ...STOCK_INIT.map((item) => ({ ...item, id: `stock-${item.id}` })),
  ...SHOPPING_INIT.map((item) => ({ ...item, id: `shopping-${item.id}` })),
].flatMap(({ id, name, unit, category }) => {
  const example = EXAMPLE_PRODUCTS.find(
    (product) =>
      normalizeSearchText(product.name) === normalizeSearchText(name),
  )
  const mappedCategory = example?.category ?? LEGACY_CATEGORIES[category]
  return mappedCategory ? [{ id, name, unit, category: mappedCategory }] : []
})

/** Catálogo mockado com os exemplos por categoria e os produtos anteriores. */
export const PRODUCTS: Product[] = uniqueProducts([
  ...existingProducts,
  ...EXAMPLE_PRODUCTS,
])
