import {
  productFieldClasses,
  createProductFieldStyles,
} from "./ProductField.styles"
import { dmPalette, useDark } from "@/theme"

type ProductFieldProps = {
  addName: string
  setAddName: (value: string) => void
  addItem?: () => void
  placeholder?: string
}

export default function ProductField({
  addName,
  setAddName,
  addItem,
  placeholder = "Ex: Arroz, Tomate, Pão...",
}: ProductFieldProps) {
  const styles = createProductFieldStyles(dmPalette(useDark()))
  return (
    <div>
      <label className={productFieldClasses.label} style={styles.secondaryText}>
        Produto
      </label>
      <input
        autoFocus
        className={productFieldClasses.input}
        style={styles.input}
        placeholder={placeholder}
        value={addName}
        onChange={(e) => setAddName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addItem?.()}
      />
    </div>
  )
}
