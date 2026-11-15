import type { MarketType } from "./MarketType"
import type { ProductCategory } from "./ProductCategory"

export interface ShoppingItem {
  id: string

  name: string

  qty: string

  unit: string

  price: number | null

  checked: boolean

  category: ProductCategory

  market?: string

  marketType?: MarketType
}
