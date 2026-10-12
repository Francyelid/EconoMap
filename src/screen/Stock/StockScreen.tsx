import {
  stockScreenClasses,
  createStockScreenStyles,
} from "./StockScreen.styles"
import DeleteStockModal from "./DeleteStockModal/DeleteStockModal"

import AllStock from "./AllStock/AllStock"
import WarningStock from "./WarningStock/WarningStock"
import ExpiredStock from "./ExpiredStock/ExpiredStock"
import { expiryStatus } from "./stockUtils"

import AddToStock from "./AddToStock/AddToStock"

import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import { STOCK_INIT } from "@/mocks/STOCK_INIT"
import type { StockItem } from "@/interfaces/StockItem"

const STOCK_MARKETS = [
  "Atacadão Sul",
  "Feira Livre Central",
  "Supermercado Bom Preço",
  "Mercadinho do Bairro",
  "Hortifruti Verde Vida",
]

export default function StockScreen() {
  const dark = useDark()
  const pal = dmPalette(dark)

  const [items, setItems] = useState<StockItem[]>(STOCK_INIT)

  const [filter, setFilter] = useState<"all" | "warning" | "expired">("all")

  const [deleteTarget, setDeleteTarget] = useState<StockItem | null>(null)

  const [addedToList, setAddedToList] = useState<string[]>([])

  const [showAddModal, setShowAddModal] = useState(false)

  const expired = items.filter((i) => expiryStatus(i.expiry) === "expired")

  const warning = items.filter((i) => expiryStatus(i.expiry) === "warning")

  const ok = items.filter((i) => expiryStatus(i.expiry) === "ok")

  const styles = createStockScreenStyles(pal, dark)

  return (
    <div className={stockScreenClasses.screen}>
      <div className={stockScreenClasses.header} style={styles.header}>
        <div className={stockScreenClasses.headerRow}>
          <div>
            <h1 className={stockScreenClasses.title} style={styles.primaryText}>
              Meu Estoque
            </h1>
            <p
              className={stockScreenClasses.subtitle}
              style={styles.secondaryText}
            >
              {items.length} produtos em casa
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className={stockScreenClasses.addButton}
            style={styles.addButton}
          >
            +
          </button>
        </div>

        {/* Summary pills */}
        <div className={stockScreenClasses.summary}>
          <div
            className={stockScreenClasses.summaryCard}
            style={styles.expiredCard}
          >
            <p
              className={stockScreenClasses.summaryLabel}
              style={styles.expiredLabel}
            >
              Vencidos
            </p>
            <p className={stockScreenClasses.title} style={styles.expiredValue}>
              {expired.length}
            </p>
          </div>
          <div
            className={stockScreenClasses.summaryCard}
            style={styles.warningCard}
          >
            <p
              className={stockScreenClasses.summaryLabel}
              style={styles.warningLabel}
            >
              Em breve
            </p>
            <p className={stockScreenClasses.title} style={styles.warningValue}>
              {warning.length}
            </p>
          </div>
          <div className={stockScreenClasses.summaryCard} style={styles.okCard}>
            <p
              className={stockScreenClasses.summaryLabel}
              style={styles.okLabel}
            >
              Em dia
            </p>
            <p className={stockScreenClasses.title} style={styles.okValue}>
              {ok.length}
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={stockScreenClasses.tabs} style={styles.tabs}>
          {([
            { k: "all", l: "Todos" },

            { k: "warning", l: "⚠️ Atenção" },

            { k: "expired", l: "🔴 Vencidos" },
          ] as const).map(({ k, l }) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={stockScreenClasses.tab}
              style={styles.tab(filter === k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {filter === "all" && (
        <AllStock items={items} onDelete={setDeleteTarget} />
      )}
      {filter === "warning" && (
        <WarningStock items={warning} onDelete={setDeleteTarget} />
      )}
      {filter === "expired" && (
        <ExpiredStock items={expired} onDelete={setDeleteTarget} />
      )}

      {/* ── Add item modal ──────────────────── */}
      <AddToStock
        isOpen={showAddModal}
        markets={STOCK_MARKETS}
        onAdd={(item) => setItems((previous) => [...previous, item])}
        onClose={() => setShowAddModal(false)}
      />

      {/* ── Delete confirmation modal ──────────────────── */}
      {deleteTarget && (
        <DeleteStockModal
          item={deleteTarget}
          isAddedToList={addedToList.includes(deleteTarget.id)}
          onAddToListAndDelete={() => {
            setAddedToList((previous) => [...previous, deleteTarget.id])
            setItems((previous) =>
              previous.filter((item) => item.id !== deleteTarget.id),
            )
            setDeleteTarget(null)
          }}
          onDelete={() => {
            setItems((previous) =>
              previous.filter((item) => item.id !== deleteTarget.id),
            )
            setDeleteTarget(null)
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
