import StockHeader from "./StockHeader/StockHeader"
import StockSummary from "./StockSummary/StockSummary"
import StockFilters from "./StockFilters/StockFilters"
import type { StockFilter } from "./types"
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

  const [filter, setFilter] = useState<StockFilter>("all")

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
        <StockHeader
          itemCount={items.length}
          onAdd={() => setShowAddModal(true)}
        />
        <StockSummary
          expiredCount={expired.length}
          warningCount={warning.length}
          okCount={ok.length}
        />
        <StockFilters filter={filter} setFilter={setFilter} />
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
