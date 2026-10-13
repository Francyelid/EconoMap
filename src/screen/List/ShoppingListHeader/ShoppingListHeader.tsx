import {
  shoppingListHeaderClasses,
  createShoppingListHeaderStyles,
} from "./ShoppingListHeader.styles"
import { dmPalette, useDark } from "@/theme"
import TotalEstimate from "../TotalEstimate/TotalEstimate"
import type { ListView } from "../types"

type ShoppingListHeaderProps = {
  remainingCount: number
  completedCount: number
  itemCount: number
  total: number
  listView: ListView
  setListView: (view: ListView) => void
  onAdd: () => void
}

export default function ShoppingListHeader({
  remainingCount,
  completedCount,
  itemCount,
  total,
  listView,
  setListView,
  onAdd,
}: ShoppingListHeaderProps) {
  const styles = createShoppingListHeaderStyles(dmPalette(useDark()))
  return (
    <div className={shoppingListHeaderClasses.header} style={styles.header}>
      <div className={shoppingListHeaderClasses.headerRow}>
        <div>
          <h1 className={shoppingListHeaderClasses.title} style={styles.title}>
            Lista de Compras
          </h1>
          <p
            className={shoppingListHeaderClasses.subtitle}
            style={styles.secondaryText}
          >
            {remainingCount} itens restantes
          </p>
        </div>
        <button
          onClick={onAdd}
          className={shoppingListHeaderClasses.addButton}
          style={styles.addButton}
        >
          +
        </button>
      </div>

      {/* Budget bar */}
      <TotalEstimate
        total={total}
        completedCount={completedCount}
        itemCount={itemCount}
      />

      {/* View toggle + Add input */}
      <div className={shoppingListHeaderClasses.viewRow}>
        <div
          className={shoppingListHeaderClasses.viewGroup}
          style={styles.viewGroup}
        >
          {(["all", "byMarket"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setListView(v)}
              className={shoppingListHeaderClasses.viewButton}
              style={styles.viewButton(listView === v)}
            >
              {v === "all" ? "📋 Todos" : "🏪 Por Mercado"}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
