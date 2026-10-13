import {
  listQuantityFieldsClasses,
  createListQuantityFieldsStyles,
} from "./ListQuantityFields.styles"
import { dmPalette, useDark } from "@/theme"

type ListQuantityFieldsProps = {
  addQty: string
  setAddQty: (value: string) => void
  addUnit: string
  setAddUnit: (value: string) => void
}

export default function ListQuantityFields({
  addQty,
  setAddQty,
  addUnit,
  setAddUnit,
}: ListQuantityFieldsProps) {
  const styles = createListQuantityFieldsStyles(dmPalette(useDark()))
  return (
    <div className={listQuantityFieldsClasses.quantityRow}>
      <div className={listQuantityFieldsClasses.field}>
        <label
          className={listQuantityFieldsClasses.label}
          style={styles.secondaryText}
        >
          Qtd
        </label>
        <input
          type="number"
          min="1"
          className={listQuantityFieldsClasses.input}
          style={styles.input}
          value={addQty}
          onChange={(e) => setAddQty(e.target.value)}
        />
      </div>
      <div className={listQuantityFieldsClasses.field}>
        <label
          className={listQuantityFieldsClasses.label}
          style={styles.secondaryText}
        >
          Unidade
        </label>
        <select
          className={listQuantityFieldsClasses.input}
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
