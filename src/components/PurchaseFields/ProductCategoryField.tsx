import { useId } from "react"
import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/models/ProductCategory"
import { CATEGORY_ICONS } from "@/constants/icons"
import { PRODUCT_EXAMPLES } from "@/services/demo/products"
import type { PurchaseFieldPalette } from "./styles"
import {
  createPurchaseFieldStyles,
  purchaseFieldClasses as classes,
} from "./styles"

type Props = {
  category: ProductCategory | ""
  registered: boolean
  palette: PurchaseFieldPalette
  invalid: boolean
  onChange: (category: ProductCategory | "") => void
}

export default function ProductCategoryField({
  category,
  registered,
  palette,
  invalid,
  onChange,
}: Props) {
  const id = useId()
  const styles = createPurchaseFieldStyles(palette)
  if (registered && category)
    return (
      <p
        className="flex items-center gap-2 text-xs"
        style={styles.secondaryText}
      >
        {CATEGORY_ICONS[category]} {category} · Produto cadastrado
      </p>
    )
  return (
    <div className={classes.field}>
      <label htmlFor={id} className={classes.label} style={styles.label}>
        Categoria do produto <span aria-hidden="true">*</span>
      </label>
      <p className="text-xs" style={styles.secondaryText}>
        Produto novo. Selecione a categoria.
      </p>
      <select
        id={id}
        value={category}
        required
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={classes.itemInput}
        style={styles.input}
        onChange={(event) =>
          onChange(
            PRODUCT_CATEGORIES.find((item) => item === event.target.value) ??
              "",
          )
        }
      >
        <option value="">Selecione a categoria</option>
        {PRODUCT_CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {category && (
        <p
          className="flex items-start gap-2 text-xs"
          style={styles.secondaryText}
        >
          <span>{CATEGORY_ICONS[category]}</span>
          <span>Exemplos: {PRODUCT_EXAMPLES[category].join(", ")}.</span>
        </p>
      )}
      {invalid && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          Selecione a categoria do produto para continuar.
        </p>
      )}
    </div>
  )
}
