import ProductField from "@/components/ProductField/ProductField"
import QuantityFields from "@/components/QuantityFields/QuantityFields"
import MarketField from "@/components/MarketField/MarketField"
import FormActions from "@/components/FormActions/FormActions"
import StockExpiryField from "../StockExpiryField/StockExpiryField"
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

        <ProductField
          addName={addName}
          setAddName={setAddName}
          placeholder="Ex: Arroz, Feijão, Leite..."
        />
        <QuantityFields
          quantityLabel="Quantidade"
          addQty={addQty}
          setAddQty={setAddQty}
          addUnit={addUnit}
          setAddUnit={setAddUnit}
        />
        <StockExpiryField addExpiry={addExpiry} setAddExpiry={setAddExpiry} />
        <MarketField
          markets={markets}
          addMarket={addMarket}
          setAddMarket={setAddMarket}
          addMarketCustom={addMarketCustom}
          setAddMarketCustom={setAddMarketCustom}
        />
        <FormActions
          addName={addName}
          addItem={handleAddItem}
          onClose={onClose}
        />
      </div>
    </div>
  )
}
