import { ICONS } from "@/constants/icons"
import {
  stockItemCardClasses,
  createStockItemCardStyles,
} from "./StockItemCard.styles"
import { dmPalette, useDark } from "@/theme"
import type { StockItem } from "@/interfaces/StockItem"
import { CATEGORY_ICONS, daysUntil, expiryStatus, fmtDate } from "../stockUtils"

type StockItemCardProps = {
  item: StockItem
  onDelete: (item: StockItem) => void
}

export default function StockItemCard({ item, onDelete }: StockItemCardProps) {
  const dark = useDark()
  const styles = createStockItemCardStyles(dmPalette(dark), dark)
  const st = expiryStatus(item.expiry)
  const days = daysUntil(item.expiry)
  return (
    <div className={stockItemCardClasses.card} style={styles.card(st)}>
      <div className={stockItemCardClasses.row}>
        <div className={stockItemCardClasses.icon} style={styles.icon}>
          {CATEGORY_ICONS[item.category] ?? ICONS.package}
        </div>
        <div className={stockItemCardClasses.details}>
          <div className={stockItemCardClasses.heading}>
            <div className={stockItemCardClasses.nameContainer}>
              <p
                className={stockItemCardClasses.name}
                style={styles.primaryText}
              >
                {item.name}
              </p>
              <p
                className={stockItemCardClasses.metadata}
                style={styles.secondaryText}
              >
                {item.qty} {item.unit} · {item.market}
              </p>
            </div>
            <span
              className={stockItemCardClasses.badge}
              style={styles.badge(st)}
            >
              {st === "expired"
                ? `Venceu há ${Math.abs(days)}d`
                : st === "warning"
                  ? `Vence em ${days}d`
                  : "Em dia"}
            </span>
          </div>
          <div className={stockItemCardClasses.footer}>
            <p
              className={stockItemCardClasses.expiry}
              style={styles.secondaryText}
            >
              {ICONS.calendar} {fmtDate(item.expiry)}
            </p>
            <div className={stockItemCardClasses.actions}>
              <p
                className={stockItemCardClasses.price}
                style={styles.primaryText}
              >
                R$ {item.purchasePrice.toFixed(2)}
              </p>
              <button
                onClick={() => onDelete(item)}
                className={stockItemCardClasses.deleteButton}
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
}
