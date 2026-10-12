import {
  stockItemsListClasses,
  createStockItemsListStyles,
} from "./StockItemsList.styles"
import type { StockItem } from "@/interfaces/StockItem"
import { dmPalette, useDark } from "@/theme"
import { CAT_EMOJI, daysUntil, expiryStatus, fmtDate } from "../stockUtils"

export type StockItemsListProps = {
  items: StockItem[]
  onDelete: (item: StockItem) => void
}

export default function StockItemsList({
  items,
  onDelete,
}: StockItemsListProps) {
  const dark = useDark()
  const pal = dmPalette(dark)

  const styles = createStockItemsListStyles(pal, dark)

  return (
    <div className={stockItemsListClasses.content} style={styles.background}>
      {items.map((item) => {
        const st = expiryStatus(item.expiry)

        const days = daysUntil(item.expiry)

        return (
          <div
            key={item.id}
            className={stockItemsListClasses.card}
            style={styles.card(st)}
          >
            <div className={stockItemsListClasses.row}>
              <div className={stockItemsListClasses.icon} style={styles.icon}>
                {CAT_EMOJI[item.category] ?? "📦"}
              </div>
              <div className={stockItemsListClasses.details}>
                <div className={stockItemsListClasses.heading}>
                  <div className={stockItemsListClasses.nameContainer}>
                    <p
                      className={stockItemsListClasses.name}
                      style={styles.primaryText}
                    >
                      {item.name}
                    </p>
                    <p
                      className={stockItemsListClasses.metadata}
                      style={styles.secondaryText}
                    >
                      {item.qty} {item.unit} · {item.market}
                    </p>
                  </div>
                  <span
                    className={stockItemsListClasses.badge}
                    style={styles.badge(st)}
                  >
                    {st === "expired"
                      ? `Venceu há ${Math.abs(days)}d`
                      : st === "warning"
                        ? `Vence em ${days}d`
                        : "Em dia"}
                  </span>
                </div>
                <div className={stockItemsListClasses.footer}>
                  <p
                    className={stockItemsListClasses.expiry}
                    style={styles.secondaryText}
                  >
                    📅 {fmtDate(item.expiry)}
                  </p>
                  <div className={stockItemsListClasses.actions}>
                    <p
                      className={stockItemsListClasses.price}
                      style={styles.primaryText}
                    >
                      R$ {item.purchasePrice.toFixed(2)}
                    </p>
                    <button
                      onClick={() => onDelete(item)}
                      className={stockItemsListClasses.deleteButton}
                      style={styles.deleteButton}
                      title="Excluir item"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={styles.deleteIcon.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6" />
                        <path d="M10,11v6" />
                        <path d="M14,11v6" />
                        <path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {items.length === 0 && (
        <div className={stockItemsListClasses.empty} style={styles.mutedText}>
          <p className={stockItemsListClasses.emptyIcon}>✅</p>
          <p className={stockItemsListClasses.emptyTitle}>Nenhum item aqui</p>
        </div>
      )}
    </div>
  )
}
