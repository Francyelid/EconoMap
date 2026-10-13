import {
  stockExpiryFieldClasses,
  createStockExpiryFieldStyles,
} from "./StockExpiryField.styles"
import { dmPalette, useDark } from "@/theme"

type StockExpiryFieldProps = {
  addExpiry: string
  setAddExpiry: (value: string) => void
}

export default function StockExpiryField({
  addExpiry,
  setAddExpiry,
}: StockExpiryFieldProps) {
  const dark = useDark()
  const styles = createStockExpiryFieldStyles(dmPalette(dark), dark)

  return (
    <div>
      <label
        className={stockExpiryFieldClasses.label}
        style={styles.secondaryText}
      >
        Data de Validade
      </label>
      <input
        type="date"
        className={stockExpiryFieldClasses.input}
        style={styles.input}
        value={addExpiry}
        onChange={(e) => setAddExpiry(e.target.value)}
      />
    </div>
  )
}
