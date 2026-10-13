import ListProductField from "../ListProductField/ListProductField"
import ListQuantityFields from "../ListQuantityFields/ListQuantityFields"
import ListMarketField from "../ListMarketField/ListMarketField"
import ListFormActions from "../ListFormActions/ListFormActions"
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

        <ListProductField
          addName={addName}
          setAddName={setAddName}
          addItem={addItem}
        />

        <ListQuantityFields
          addQty={addQty}
          setAddQty={setAddQty}
          addUnit={addUnit}
          setAddUnit={setAddUnit}
        />

        <ListMarketField
          markets={markets}
          addMarket={addMarket}
          setAddMarket={setAddMarket}
          addMarketCustom={addMarketCustom}
          setAddMarketCustom={setAddMarketCustom}
        />

        <ListFormActions
          addName={addName}
          addItem={addItem}
          onClose={onClose}
        />
      </div>
    </div>
  )
}
