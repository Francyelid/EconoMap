import QuantityFields from "@/components/QuantityFields/QuantityFields"
import FormActions from "@/components/FormActions/FormActions"
import ItemRegistrationFields from "@/components/PurchaseFields/ItemRegistrationFields"
import useItemRegistration from "@/hooks/useItemRegistration"
import { isPositiveReceiptValue } from "@/business/receipt"
import { dmPalette, useDark } from "@/theme"
import type { StockItem } from "@/models/StockItem"
import { useState } from "react"
import StockExpiryField from "../StockExpiryField/StockExpiryField"
import { addToStockClasses, createAddToStockStyles } from "./AddToStock.styles"

type Props = {
  isOpen: boolean
  onAdd: (item: StockItem) => void
  onClose: () => void
}

export default function AddToStock({ isOpen, onAdd, onClose }: Props) {
  const pal = dmPalette(useDark())
  const form = useItemRegistration()
  const [expiry, setExpiry] = useState("")
  const styles = createAddToStockStyles(pal)
  function addItem() {
    if (!form.validate() || !form.category) return
    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      qty: form.qty,
      unit: form.unit,
      category: form.category,
      market: form.market.trim() || "Mercado não registrado",
      marketType: form.market.trim() ? form.marketType || undefined : undefined,
      purchasePrice: 0,
      expiry: expiry || "2099-12-31",
    })
    form.reset()
    setExpiry("")
    onClose()
  }
  if (!isOpen) return null
  return (
    <div
      className={addToStockClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={`${addToStockClasses.sheet} max-h-[90dvh] overflow-y-auto`}
        style={styles.sheet}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={addToStockClasses.handle} style={styles.handle} />
        <h2 className={addToStockClasses.title} style={styles.title}>
          Adicionar ao Estoque
        </h2>
        <ItemRegistrationFields form={form} palette={pal} section="product" />
        <QuantityFields
          addQty={form.qty}
          setAddQty={form.setQty}
          addUnit={form.unit}
          setAddUnit={form.setUnit}
        />
        {form.attempted && !isPositiveReceiptValue(form.qty) && (
          <p role="alert" className="text-xs text-red-600">
            A quantidade deve ser maior que zero.
          </p>
        )}
        <StockExpiryField addExpiry={expiry} setAddExpiry={setExpiry} />
        <ItemRegistrationFields form={form} palette={pal} section="market" />
        <FormActions addName={form.name} addItem={addItem} onClose={onClose} />
      </div>
    </div>
  )
}
