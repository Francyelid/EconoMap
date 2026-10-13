import {
  listFormActionsClasses,
  createListFormActionsStyles,
} from "./ListFormActions.styles"
import { dmPalette, useDark } from "@/theme"

type ListFormActionsProps = {
  addName: string
  addItem: () => void
  onClose: () => void
}

export default function ListFormActions({
  addName,
  addItem,
  onClose,
}: ListFormActionsProps) {
  const styles = createListFormActionsStyles(dmPalette(useDark()))
  return (
    <div className={listFormActionsClasses.actions}>
      <button
        onClick={onClose}
        className={listFormActionsClasses.cancelButton}
        style={styles.cancelButton}
      >
        Cancelar
      </button>
      <button
        onClick={addItem}
        className={listFormActionsClasses.addButton}
        style={styles.addButton(Boolean(addName.trim()))}
      >
        Adicionar
      </button>
    </div>
  )
}
