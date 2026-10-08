import { addToListClasses, createAddToListStyles } from "./AddToList.styles"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import type { ShoppingItem } from "@/interfaces/ShoppingItem"

type AddToListProps = {
  isOpen: boolean
  markets: string[]
  onAdd: (item: ShoppingItem) => void
  onClose: () => void
}

export default function AddToList({
  isOpen,
  markets,
  onAdd,
  onClose,
}: AddToListProps) {
  const pal = dmPalette(useDark())

  const [addName, setAddName] = useState("")

  const [addMarket, setAddMarket] = useState("")

  const [addMarketCustom, setAddMarketCustom] = useState("")

  const [addQty, setAddQty] = useState("1")

  const [addUnit, setAddUnit] = useState("un")

  const addItem = () => {
    const name = addName.trim()

    if (!name) return

    const market =
      addMarket === "__custom__"
        ? addMarketCustom.trim() || undefined
        : addMarket || undefined

    onAdd({
      id: Date.now().toString(),
      name,
      qty: addQty,
      unit: addUnit,
      price: null,
      checked: false,
      category: "Outros",
      market,
    })

    setAddName("")
    setAddMarket("")
    setAddMarketCustom("")
    setAddQty("1")
    setAddUnit("un")

    onClose()
  }

  if (!isOpen) return null

  const styles = createAddToListStyles(pal)

  return (
    <div
      className={addToListClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={addToListClasses.sheet}
        style={styles.sheet}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={addToListClasses.handle} style={styles.handle} />
        <h2 className={addToListClasses.title} style={styles.title}>
          Adicionar à Lista
        </h2>

        <div>
          <label
            className={addToListClasses.label}
            style={styles.secondaryText}
          >
            Produto
          </label>
          <input
            autoFocus
            className={addToListClasses.input}
            style={styles.input}
            placeholder="Ex: Arroz, Tomate, Pão..."
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
        </div>

        <div className={addToListClasses.quantityRow}>
          <div className={addToListClasses.field}>
            <label
              className={addToListClasses.label}
              style={styles.secondaryText}
            >
              Qtd
            </label>
            <input
              type="number"
              min="1"
              className={addToListClasses.input}
              style={styles.input}
              value={addQty}
              onChange={(e) => setAddQty(e.target.value)}
            />
          </div>
          <div className={addToListClasses.field}>
            <label
              className={addToListClasses.label}
              style={styles.secondaryText}
            >
              Unidade
            </label>
            <select
              className={addToListClasses.input}
              style={styles.input}
              value={addUnit}
              onChange={(e) => setAddUnit(e.target.value)}
            >
              {["un", "kg", "g", "L", "ml", "cx", "pct"].map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            className={addToListClasses.label}
            style={styles.secondaryText}
          >
            Mercado
          </label>
          <select
            className={addToListClasses.input}
            style={styles.input}
            value={addMarket}
            onChange={(e) => setAddMarket(e.target.value)}
          >
            <option value="">Selecione um mercado...</option>
            {markets.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
            <option value="__custom__">+ Mercado não registrado ainda</option>
          </select>
          {addMarket === "__custom__" && (
            <input
              className={addToListClasses.customMarketInput}
              style={styles.customMarketInput}
              placeholder="Nome do mercado..."
              value={addMarketCustom}
              onChange={(e) => setAddMarketCustom(e.target.value)}
            />
          )}
        </div>

        <div className={addToListClasses.actions}>
          <button
            onClick={onClose}
            className={addToListClasses.cancelButton}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
          <button
            onClick={addItem}
            className={addToListClasses.addButton}
            style={styles.addButton(Boolean(addName.trim()))}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
