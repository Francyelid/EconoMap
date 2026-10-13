import { productSelectorClasses } from "./ProductSelector.styles"

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
  return (
    <div>
      <p className={productSelectorClasses.sectionLabel}>Produto</p>
      <div className={productSelectorClasses.productList}>
        {filteredProducts.map((p) => (
          <button
            key={p}
            onClick={() => onSelectProduct(p)}
            className={productSelectorClasses.productButton(selProduct === p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
