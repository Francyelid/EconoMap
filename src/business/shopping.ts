import type { ShoppingItem } from "@/models/ShoppingItem"

export function shoppingTotal(items: readonly ShoppingItem[]): number {
  return items.reduce(
    (sum, item) => sum + (item.price ?? 0) * parseFloat(item.qty),
    0,
  )
}
