import StockItemCard from "../StockItemCard/StockItemCard"
import {
  stockItemsListClasses,
  createStockItemsListStyles,
} from "./StockItemsList.styles"
import type { StockItem } from "@/interfaces/StockItem"
import { dmPalette, useDark } from "@/theme"

export type StockItemsListProps = {
  items: StockItem[]
  onDelete: (item: StockItem) => void
}

export default function StockItemsList({
  items,
  onDelete,
}: StockItemsListProps) {
  const dark = useDark()
  const pal = dmPalette(dark)

  const styles = createStockItemsListStyles(pal, dark)

  return (
    <div className={stockItemsListClasses.content} style={styles.background}>
      {items.map((item) => (
        <StockItemCard key={item.id} item={item} onDelete={onDelete} />
      ))}

      {items.length === 0 && (
        <div className={stockItemsListClasses.empty} style={styles.mutedText}>
          <p className={stockItemsListClasses.emptyIcon}>✅</p>
          <p className={stockItemsListClasses.emptyTitle}>Nenhum item aqui</p>
        </div>
      )}
    </div>
  )
}
