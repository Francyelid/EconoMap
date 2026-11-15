import type { ProductCategory } from "./ProductCategory"

export interface Product {
  id: string

  name: string

  unit: string

  category: ProductCategory
}
