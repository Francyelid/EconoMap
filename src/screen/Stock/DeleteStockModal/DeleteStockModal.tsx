import { ICONS } from "@/constants/icons"
import {
  deleteStockModalClasses,
  createDeleteStockModalStyles,
} from "./DeleteStockModal.styles"

import type { StockItem } from "@/interfaces/StockItem"

import { dmPalette, useDark } from "@/theme"

import { CATEGORY_ICONS } from "../stockUtils"

type DeleteStockModalProps = {
  item: StockItem

  isAddedToList: boolean

  onAddToListAndDelete: () => void

  onDelete: () => void

  onClose: () => void
}

export default function DeleteStockModal({
  item,

  isAddedToList,

  onAddToListAndDelete,

  onDelete,

  onClose,
}: DeleteStockModalProps) {
  const dark = useDark()

  const pal = dmPalette(dark)

  const styles = createDeleteStockModalStyles(pal, dark)

  return (
    <div
      className={deleteStockModalClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={deleteStockModalClasses.sheet}
        style={styles.sheet}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={deleteStockModalClasses.handle} style={styles.handle} />

        <div className={deleteStockModalClasses.identity}>
          <div className={deleteStockModalClasses.icon} style={styles.icon}>
            {CATEGORY_ICONS[item.category] ?? ICONS.package}
          </div>
          <div>
            <p className={deleteStockModalClasses.name} style={styles.title}>
              {item.name}
            </p>
            <p
              className={deleteStockModalClasses.metadata}
              style={styles.secondaryText}
            >
              {item.qty} {item.unit} · {item.market}
            </p>
          </div>
        </div>

        <p
          className={deleteStockModalClasses.message}
          style={styles.primaryText}
        >
          Deseja adicionar <strong>{item.name}</strong> à sua lista de compras
          antes de excluir do estoque?
        </p>

        {isAddedToList && (
          <div
            className={deleteStockModalClasses.confirmation}
            style={styles.confirmation}
          >
            <span className={deleteStockModalClasses.confirmationIcon}>{ICONS.check}</span>
            <p
              className={deleteStockModalClasses.confirmationText}
              style={styles.accent}
            >
              Adicionado à lista de compras!
            </p>
          </div>
        )}

        <div className={deleteStockModalClasses.actions}>
          {!isAddedToList && (
            <button
              onClick={onAddToListAndDelete}
              className={deleteStockModalClasses.addAndDeleteButton}
              style={styles.addAndDeleteButton}
            >
              <span>{ICONS.cart}</span> Sim, adicionar à lista e excluir
            </button>
          )}
          <button
            onClick={onDelete}
            className={deleteStockModalClasses.deleteButton}
            style={styles.deleteButton}
          >
            {isAddedToList ? "Excluir do estoque" : "Não, apenas excluir"}
          </button>
          <button
            onClick={onClose}
            className={deleteStockModalClasses.cancelButton}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
