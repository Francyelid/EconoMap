import {
  quantityFieldsClasses,
  createQuantityFieldsStyles,
} from "./QuantityFields.styles"
import { dmPalette, useDark } from "@/theme"

type QuantityFieldsProps = {
  quantityLabel?: string
  addQty: string
  setAddQty: (value: string) => void
  addUnit: string
  setAddUnit: (value: string) => void
}

export default function QuantityFields({
  quantityLabel = "Qtd",
  addQty,
  setAddQty,
  addUnit,
  setAddUnit,
}: QuantityFieldsProps) {
  const styles = createQuantityFieldsStyles(dmPalette(useDark()))
  return (
    <div className={quantityFieldsClasses.quantityRow}>
      <div className={quantityFieldsClasses.field}>
        <label
          className={quantityFieldsClasses.label}
          style={styles.secondaryText}
        >
          {quantityLabel}
        </label>
        <input
          type="number"
          min="1"
          className={quantityFieldsClasses.input}
          style={styles.input}
          value={addQty}
          onChange={(e) => setAddQty(e.target.value)}
        />
      </div>
      <div className={quantityFieldsClasses.field}>
        <label
          className={quantityFieldsClasses.label}
          style={styles.secondaryText}
        >
          Unidade
        </label>
        <select
          className={quantityFieldsClasses.input}
          style={styles.input}
          value={addUnit}
          onChange={(e) => setAddUnit(e.target.value)}
        >
          {["un", "kg", "g", "L", "ml", "cx", "pct"].map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
