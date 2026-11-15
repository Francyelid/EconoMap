import type { MarketType } from "./MarketType"

export interface Market {
  id: string
  name: string
  address: string
  distance: number
  priceIndex: number
  type: MarketType
  x: number
  y: number
  rating: number
  registros: number
}
