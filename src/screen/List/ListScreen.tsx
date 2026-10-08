import { listScreenClasses, createListScreenStyles } from "./ListScreen.styles"
import TotalEstimate from "./TotalEstimate/TotalEstimate"

import AddToList from "./AddToList/AddToList"

import AllItems from "./AllItems/AllItems"

import ItemsByMarket from "./ItemsByMarket/ItemsByMarket"

import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import { SHOPPING_INIT } from "@/mocks/SHOPPING_INIT"
import type { ShoppingItem } from "@/interfaces/ShoppingItem"

const LIST_MARKETS = [
  "Atacadão Sul",
  "Feira Livre Central",
  "Supermercado Bom Preço",
  "Mercadinho do Bairro",
  "Hortifruti Verde Vida",
]

export default function ListScreen() {
  const dark = useDark()
  const pal = dmPalette(dark)

  const styles = createListScreenStyles(pal)
  const [items, setItems] = useState<ShoppingItem[]>(SHOPPING_INIT)

  const [showAddModal, setShowAddModal] = useState(false)

  const [listView, setListView] = useState<"all" | "byMarket">("all")

  const [mktPicker, setMktPicker] = useState<string | null>(null)

  const toggle = (id: string) =>
    setItems((p) =>
      p.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    )

  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id))

  const setMarket = (id: string, mkt: string | undefined) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, market: mkt } : i)))

  const unchecked = items.filter((i) => !i.checked)

  const checked = items.filter((i) => i.checked)

  const total = unchecked.reduce(
    (s, i) => s + (i.price ?? 0) * parseFloat(i.qty),
    0,
  )

  function ItemRow({ item }: { item: ShoppingItem }) {
    return (
      <div className={listScreenClasses.item} style={styles.card}>
        <button
          onClick={() => toggle(item.id)}
          className={listScreenClasses.checkbox}
          style={styles.checkbox(item.checked)}
        >
          {item.checked && (
            <svg
              width="9"
              height="9"
              viewBox="0 0 10 10"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <polyline points="1.5,5.5 4,8 8.5,2" />
            </svg>
          )}
        </button>
        <div
          className={listScreenClasses.category}
          style={styles.category(item.category)}
        />
        <div className={listScreenClasses.details}>
          <p
            className={listScreenClasses.itemName}
            style={styles.itemName(item.checked)}
          >
            {item.name}
          </p>
          <div className={listScreenClasses.metadata}>
            <span
              className={listScreenClasses.quantity}
              style={styles.secondaryText}
            >
              {item.qty} {item.unit}
            </span>
            {item.price && (
              <span
                className={listScreenClasses.quantity}
                style={styles.secondaryText}
              >
                · R$ {item.price.toFixed(2)}
              </span>
            )}
            {/* Market badge */}
            <button
              onClick={() =>
                setMktPicker(mktPicker === item.id ? null : item.id)
              }
              className={listScreenClasses.marketBadge}
              style={styles.marketBadge(Boolean(item.market))}
            >
              {item.market ? `🏪 ${item.market.split(" ")[0]}…` : "+ mercado"}
            </button>
          </div>
          {/* Inline market picker */}
          {mktPicker === item.id && (
            <div className={listScreenClasses.marketPicker}>
              <button
                onClick={() => {
                  setMarket(item.id, undefined)
                  setMktPicker(null)
                }}
                className={listScreenClasses.removeMarket}
                style={styles.removeMarket}
              >
                Remover
              </button>
              {LIST_MARKETS.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMarket(item.id, m)
                    setMktPicker(null)
                  }}
                  className={listScreenClasses.marketOption}
                  style={styles.marketOption(item.market === m)}
                >
                  {m.split(" ")[0]}
                </button>
              ))}
            </div>
          )}
        </div>
        {item.price != null && !item.checked && (
          <p className={listScreenClasses.itemTotal}>
            R$ {(item.price * parseFloat(item.qty)).toFixed(2)}
          </p>
        )}
        <button
          onClick={() => remove(item.id)}
          className={listScreenClasses.removeItem}
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div className={listScreenClasses.screen}>
      {/* Header */}
      <div className={listScreenClasses.header} style={styles.header}>
        <div className={listScreenClasses.headerRow}>
          <div>
            <h1 className={listScreenClasses.title} style={styles.title}>
              Lista de Compras
            </h1>
            <p
              className={listScreenClasses.subtitle}
              style={styles.secondaryText}
            >
              {unchecked.length} itens restantes
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className={listScreenClasses.addButton}
            style={styles.addButton}
          >
            +
          </button>
        </div>

        {/* Budget bar */}
        <TotalEstimate
          total={total}
          completedCount={checked.length}
          itemCount={items.length}
        />

        {/* View toggle + Add input */}
        <div className={listScreenClasses.viewRow}>
          <div className={listScreenClasses.viewGroup} style={styles.viewGroup}>
            {(["all", "byMarket"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setListView(v)}
                className={listScreenClasses.viewButton}
                style={styles.viewButton(listView === v)}
              >
                {v === "all" ? "📋 Todos" : "🏪 Por Mercado"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={listScreenClasses.content} style={styles.background}>
        {listView === "all" && (
          <AllItems
            unchecked={unchecked}
            checked={checked}
            renderItem={(item) => <ItemRow item={item} />}
          />
        )}

        {listView === "byMarket" && (
          <ItemsByMarket
            unchecked={unchecked}
            checked={checked}
            renderItem={(item) => <ItemRow item={item} />}
          />
        )}
      </div>

      {/* ── Add item modal ── */}
      <AddToList
        isOpen={showAddModal}
        markets={LIST_MARKETS}
        onAdd={(item) => setItems((previous) => [...previous, item])}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  )
}
