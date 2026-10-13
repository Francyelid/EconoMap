import ShoppingItemRow from "./ShoppingItemRow/ShoppingItemRow"
import ShoppingListHeader from "./ShoppingListHeader/ShoppingListHeader"
import type { ListView } from "./types"
import { listScreenClasses, createListScreenStyles } from "./ListScreen.styles"

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

  const [listView, setListView] = useState<ListView>("all")

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

  return (
    <div className={listScreenClasses.screen}>
      <ShoppingListHeader
        remainingCount={unchecked.length}
        completedCount={checked.length}
        itemCount={items.length}
        total={total}
        listView={listView}
        setListView={setListView}
        onAdd={() => setShowAddModal(true)}
      />

      <div className={listScreenClasses.content} style={styles.background}>
        {listView === "all" && (
          <AllItems
            unchecked={unchecked}
            checked={checked}
            renderItem={(item) => (
              <ShoppingItemRow
                item={item}
                markets={LIST_MARKETS}
                toggle={toggle}
                remove={remove}
                setMarket={setMarket}
                mktPicker={mktPicker}
                setMktPicker={setMktPicker}
              />
            )}
          />
        )}

        {listView === "byMarket" && (
          <ItemsByMarket
            unchecked={unchecked}
            checked={checked}
            renderItem={(item) => (
              <ShoppingItemRow
                item={item}
                markets={LIST_MARKETS}
                toggle={toggle}
                remove={remove}
                setMarket={setMarket}
                mktPicker={mktPicker}
                setMktPicker={setMktPicker}
              />
            )}
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
