import {
  listProductFieldClasses,
  createListProductFieldStyles,
} from "./ListProductField.styles"
import { dmPalette, useDark } from "@/theme"

type ListProductFieldProps = {
  addName: string
  setAddName: (value: string) => void
  addItem: () => void
}

export default function ListProductField({
  addName,
  setAddName,
  addItem,
}: ListProductFieldProps) {
  const styles = createListProductFieldStyles(dmPalette(useDark()))
  return (
    <div>
      <label
        className={listProductFieldClasses.label}
        style={styles.secondaryText}
      >
        Produto
      </label>
      <input
        autoFocus
        className={listProductFieldClasses.input}
        style={styles.input}
        placeholder="Ex: Arroz, Tomate, Pão..."
        value={addName}
        onChange={(e) => setAddName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addItem()}
      />
    </div>
  )
}
