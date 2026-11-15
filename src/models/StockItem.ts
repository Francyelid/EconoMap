import type { MarketType } from "./MarketType"
import type { ProductCategory } from "./ProductCategory"

export interface StockItem {
  id: string

  name: string

  qty: string

  unit: string

  expiry: string

  category: ProductCategory

  purchasePrice: number

  market: string

  marketType?: MarketType
}
