export interface ShoppingItem {
  id: string
  name: string
  qty: string
  unit: string
  price: number | null
  checked: boolean
  category: string
  market?: string
}