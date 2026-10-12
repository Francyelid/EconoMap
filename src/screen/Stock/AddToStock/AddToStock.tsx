import { addToStockClasses, createAddToStockStyles } from "./AddToStock.styles"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import type { StockItem } from "@/interfaces/StockItem"

type AddToStockProps = {
  isOpen: boolean
  markets: string[]
  onAdd: (item: StockItem) => void
  onClose: () => void
}

export default function AddToStock({
  isOpen,
  markets,
  onAdd,
  onClose,
}: AddToStockProps) {
  const pal = dmPalette(useDark())

  const [addName, setAddName] = useState("")

  const [addMarket, setAddMarket] = useState("")

  const [addMarketCustom, setAddMarketCustom] = useState("")

  const [addQty, setAddQty] = useState("1")

  const [addUnit, setAddUnit] = useState("un")

  const [addExpiry, setAddExpiry] = useState("")

  function handleAddItem() {
    const name = addName.trim()

    if (!name) return

    const market =
      addMarket === "__custom__"
        ? addMarketCustom.trim() || "Mercado não registrado"
        : addMarket || "Mercado não registrado"

    onAdd({
      id: Date.now().toString(),
      name,
      qty: addQty,
      unit: addUnit,

      expiry: addExpiry || "2099-12-31",
      category: "Outros",

      purchasePrice: 0,
      market,
    })

    setAddName("")
    setAddMarket("")
    setAddMarketCustom("")
    setAddQty("1")
    setAddUnit("un")
    setAddExpiry("")

    onClose()
  }

  if (!isOpen) return null

  const styles = createAddToStockStyles(pal)

  return (
    <div
      className={addToStockClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={addToStockClasses.sheet}
        style={styles.sheet}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={addToStockClasses.handle} style={styles.handle} />
        <h2 className={addToStockClasses.title} style={styles.title}>
          Adicionar ao Estoque
        </h2>

        {/* Produto */}
        <div>
          <label
            className={addToStockClasses.label}
            style={styles.secondaryText}
          >
            Produto
          </label>
          <input
            autoFocus
            className={addToStockClasses.input}
            style={styles.input}
            placeholder="Ex: Arroz, Feijão, Leite..."
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />
        </div>

        {/* Quantidade + Unidade */}
        <div className={addToStockClasses.quantityRow}>
          <div className={addToStockClasses.field}>
            <label
              className={addToStockClasses.label}
              style={styles.secondaryText}
            >
              Quantidade
            </label>
            <input
              type="number"
              min="1"
              className={addToStockClasses.input}
              style={styles.input}
              value={addQty}
              onChange={(e) => setAddQty(e.target.value)}
            />
          </div>
          <div className={addToStockClasses.field}>
            <label
              className={addToStockClasses.label}
              style={styles.secondaryText}
            >
              Unidade
            </label>
            <select
              className={addToStockClasses.input}
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

        {/* Validade */}
        <div>
          <label
            className={addToStockClasses.label}
            style={styles.secondaryText}
          >
            Data de Validade
          </label>
          <input
            type="date"
            className={addToStockClasses.input}
            style={styles.input}
            value={addExpiry}
            onChange={(e) => setAddExpiry(e.target.value)}
          />
        </div>

        {/* Mercado */}
        <div>
          <label
            className={addToStockClasses.label}
            style={styles.secondaryText}
          >
            Mercado
          </label>
          <select
            className={addToStockClasses.input}
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
              className={addToStockClasses.customMarketInput}
              style={styles.customMarketInput}
              placeholder="Nome do mercado..."
              value={addMarketCustom}
              onChange={(e) => setAddMarketCustom(e.target.value)}
            />
          )}
        </div>

        <div className={addToStockClasses.actions}>
          <button
            onClick={onClose}
            className={addToStockClasses.cancelButton}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
          <button
            onClick={handleAddItem}
            className={addToStockClasses.addButton}
            style={styles.addButton(Boolean(addName.trim()))}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
