import { allItemsClasses, createAllItemsStyles } from "./AllItems.styles"
import { Fragment } from "react"
import type { ReactNode } from "react"
import type { ShoppingItem } from "@/interfaces/ShoppingItem"
import { dmPalette, useDark } from "@/theme"

type AllItemsProps = {
  unchecked: ShoppingItem[]

  checked: ShoppingItem[]

  renderItem: (item: ShoppingItem) => ReactNode
}

export default function AllItems({
  unchecked,
  checked,
  renderItem,
}: AllItemsProps) {
  const pal = dmPalette(useDark())

  const styles = createAllItemsStyles(pal)

  return (
    <div className={allItemsClasses.list}>
      {unchecked.map((item) => (
        <Fragment key={item.id}>{renderItem(item)}</Fragment>
      ))}
      {checked.length > 0 && (
        <>
          <p className={allItemsClasses.completed} style={styles.secondaryText}>
            Concluídos
          </p>
          {checked.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))}
        </>
      )}
      {unchecked.length === 0 && checked.length === 0 && (
        <div className={allItemsClasses.empty} style={styles.secondaryText}>
          <p className={allItemsClasses.emptyIcon}>🛒</p>
          <p className={allItemsClasses.emptyTitle}>Lista vazia</p>
          <p className={allItemsClasses.emptyHint}>
            Toque em + para adicionar itens
          </p>
        </div>
      )}
    </div>
  )
}
