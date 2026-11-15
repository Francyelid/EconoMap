import type { Product } from "@/models/Product"
import { STOCK_INIT } from "@/mocks/STOCK_INIT"
import { SHOPPING_INIT } from "@/mocks/SHOPPING_INIT"
import { uniqueProducts } from "@/business/product"

/** Catálogo de demonstração derivado dos produtos já presentes no projeto. */
export const PRODUCTS: Product[] = uniqueProducts([
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
])
