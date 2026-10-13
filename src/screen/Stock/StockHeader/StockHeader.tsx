import {
  stockHeaderClasses,
  createStockHeaderStyles,
} from "./StockHeader.styles"
import { dmPalette, useDark } from "@/theme"

type StockHeaderProps = {
  itemCount: number
  onAdd: () => void
}

export default function StockHeader({ itemCount, onAdd }: StockHeaderProps) {
  const dark = useDark()
  const styles = createStockHeaderStyles(dmPalette(dark), dark)

  return (
    <div className={stockHeaderClasses.headerRow}>
      <div>
        <h1 className={stockHeaderClasses.title} style={styles.primaryText}>
          Meu Estoque
        </h1>
        <p className={stockHeaderClasses.subtitle} style={styles.secondaryText}>
          {itemCount} produtos em casa
        </p>
      </div>
      <button
        onClick={onAdd}
        className={stockHeaderClasses.addButton}
        style={styles.addButton}
      >
        +
      </button>
    </div>
  )
}
