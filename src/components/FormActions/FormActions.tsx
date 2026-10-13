import {
  formActionsClasses,
  createFormActionsStyles,
} from "./FormActions.styles"
import { dmPalette, useDark } from "@/theme"

type FormActionsProps = {
  addName: string
  addItem: () => void
  onClose: () => void
}

export default function FormActions({
  addName,
  addItem,
  onClose,
}: FormActionsProps) {
  const styles = createFormActionsStyles(dmPalette(useDark()))
  return (
    <div className={formActionsClasses.actions}>
      <button
        onClick={onClose}
        className={formActionsClasses.cancelButton}
        style={styles.cancelButton}
      >
        Cancelar
      </button>
      <button
        onClick={addItem}
        className={formActionsClasses.addButton}
        style={styles.addButton(Boolean(addName.trim()))}
      >
        Adicionar
      </button>
    </div>
  )
}
