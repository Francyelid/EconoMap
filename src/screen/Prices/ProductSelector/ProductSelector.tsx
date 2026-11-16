import { productSelectorClasses } from "./ProductSelector.styles"

import { dmPalette, useDark } from "@/theme"

type ProductSelectorProps = {
  products: string[]

  selectedProduct: string

  onSelectProduct: (product: string) => void
}

export default function ProductSelector({
  products: filteredProducts,

  selectedProduct: selProduct,

  onSelectProduct,
}: ProductSelectorProps) {
  const pal = dmPalette(useDark())

  return (
    <div>
      <p
        className="mb-2 text-xs font-semibold"
        style={{ color: pal.textPrimary }}
      >
        Produtos em comum
      </p>
      <div className={productSelectorClasses.productList}>
        {filteredProducts.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={selProduct === p}
            onClick={() => onSelectProduct(p)}
            className="min-h-10 shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-green-600"
            style={{
              background: selProduct === p ? pal.green : pal.cardAlt,
              borderColor: selProduct === p ? pal.green : pal.border,
              color: selProduct === p ? "#fff" : pal.textSecondary,
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
