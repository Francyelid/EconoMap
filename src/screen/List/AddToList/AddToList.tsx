import QuantityFields from "@/components/QuantityFields/QuantityFields"
import FormActions from "@/components/FormActions/FormActions"
import ItemRegistrationFields from "@/components/PurchaseFields/ItemRegistrationFields"
import useItemRegistration from "@/hooks/useItemRegistration"
import { isPositiveReceiptValue } from "@/business/receipt"
import { dmPalette, useDark } from "@/theme"
import type { ShoppingItem } from "@/models/ShoppingItem"

import { addToListClasses, createAddToListStyles } from "./AddToList.styles"

type Props = {
  isOpen: boolean
  onAdd: (item: ShoppingItem) => void
  onClose: () => void
}

export default function AddToList({ isOpen, onAdd, onClose }: Props) {
  const pal = dmPalette(useDark())
  const form = useItemRegistration({ allowUnassignedMarket: true })

  const styles = createAddToListStyles(pal)
  function addItem() {
    if (!form.validate() || !form.category) return
    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      qty: form.qty,
      unit: form.unit,
      category: form.category,
      market: form.market.trim() || undefined,
      marketType: form.market.trim() ? form.marketType || undefined : undefined,
      price: null,
      checked: false,
    })
    form.reset()

    onClose()
  }
  if (!isOpen) return null
  return (
    <div
      className={addToListClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={`${addToListClasses.sheet} max-h-[90dvh] overflow-y-auto`}
        style={styles.sheet}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={addToListClasses.handle} style={styles.handle} />
        <h2 className={addToListClasses.title} style={styles.title}>
          Adicionar à Lista
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

        <ItemRegistrationFields
          form={form}
          palette={pal}
          section="market"
          allowUnassignedMarket
        />
        <FormActions addName={form.name} addItem={addItem} onClose={onClose} />
      </div>
    </div>
  )
}
