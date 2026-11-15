import { useId, useState } from "react"
import type { Product } from "@/models/Product"
import { suggestProducts } from "@/business/product"
import { CATEGORY_ICONS, ICONS } from "@/constants/icons"
import type { ReceiptModalProps } from "../types"
import {
  createNewReceiptManualStyles,
  newReceiptManualClasses as classes,
} from "./NewReceiptManual.styles"

type Props = {
  products: readonly Product[]
  name: string
  itemNumber: number
  palette: ReceiptModalProps["palette"]
  onNameChange: (name: string) => void
  onSelect: (product: Product) => void
}

export default function ProductNameField({
  products,
  name,
  itemNumber,
  palette,
  onNameChange,
  onSelect,
}: Props) {
  const id = useId()
  const styles = createNewReceiptManualStyles(palette)
  const [focused, setFocused] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [active, setActive] = useState(-1)
  const suggestions = suggestProducts(products, name)
  const open = focused && !dismissed && suggestions.length > 0

  function select(product: Product) {
    onSelect(product)
    setDismissed(true)
    setActive(-1)
  }

  return (
    <div
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false)
      }}
    >
      <input
        role="combobox"
        aria-label={`Nome do produto do item ${itemNumber}`}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? `${id}-suggestions` : undefined}
        aria-activedescendant={
          open && active >= 0 ? `${id}-option-${active}` : undefined
        }
        autoComplete="off"
        type="text"
        placeholder="Nome do produto"
        value={name}
        className={classes.itemInput}
        style={styles.input}
        onFocus={() => setFocused(true)}
        onChange={(event) => {
          onNameChange(event.target.value)
          setDismissed(false)
          setActive(-1)
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setDismissed(true)
            setActive(-1)
          }
          if (
            (event.key === "ArrowDown" || event.key === "ArrowUp") &&
            suggestions.length
          ) {
            event.preventDefault()
            setDismissed(false)
            setActive((previous) =>
              event.key === "ArrowDown"
                ? (previous + 1) % suggestions.length
                : previous <= 0
                  ? suggestions.length - 1
                  : previous - 1,
            )
          }
          if (event.key === "Enter" && open && active >= 0) {
            event.preventDefault()
            select(suggestions[active])
          }
        }}
      />
      {open && (
        <ul
          id={`${id}-suggestions`}
          role="listbox"
          aria-label="Produtos cadastrados"
          className="mt-1 max-h-48 overflow-y-auto rounded-xl border p-1 shadow-sm"
          style={{ background: palette.card, borderColor: palette.border }}
        >
          {suggestions.map((product, index) => (
            <li
              key={product.id}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={active === index}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5"
              style={{
                background: active === index ? palette.cardAlt : undefined,
                color: palette.textPrimary,
              }}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActive(index)}
              onClick={() => select(product)}
            >
              <span className="text-lg">
                {CATEGORY_ICONS[product.category] ?? ICONS.package}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">
                  {product.name}
                </span>
                <span className="block text-xs" style={styles.secondaryText}>
                  {product.category} · {product.unit}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
