import type { Product } from "@/models/Product"
import { STOCK_INIT } from "@/mocks/STOCK_INIT"
import { SHOPPING_INIT } from "@/mocks/SHOPPING_INIT"
import { EXAMPLE_PRODUCTS } from "@/mocks/PRODUCT_EXAMPLES"
import { uniqueProducts } from "@/business/product"
export { PRODUCT_EXAMPLES } from "@/mocks/PRODUCT_EXAMPLES"

const existingProducts: Product[] = [
  ...STOCK_INIT.map(({ id, name, unit, category }) => ({
    id: `stock-${id}`,
    name,
    unit,
    category,
  })),
  ...SHOPPING_INIT.map(({ id, name, unit, category }) => ({
    id: `shopping-${id}`,
    name,
    unit,
    category,
  })),
]

/** Catálogo mockado com categorias padronizadas em todas as fontes. */
export const PRODUCTS: Product[] = uniqueProducts([
  ...existingProducts,
  ...EXAMPLE_PRODUCTS,
])
