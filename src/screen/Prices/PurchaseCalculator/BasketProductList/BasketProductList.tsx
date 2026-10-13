import {
  basketProductListClasses,
  createBasketProductListStyles,
} from "./BasketProductList.styles"
import type { dmPalette } from "@/theme"
import { PRICE_DATA } from "@/mocks/PRICE_DATA"
import { sharedChartAppearance } from "@/screen/shared/styles"

type BasketProductListProps = {
  palette: ReturnType<typeof dmPalette>
  products: string[]
  selectedProducts: string[]
  market: string
  onToggleProduct: (product: string) => void
}

export default function BasketProductList({
  palette: pal,
  products,
  selectedProducts: calcSelected,
  market: calcMkt,
  onToggleProduct,
}: BasketProductListProps) {
  const styles = createBasketProductListStyles(pal)
  return (
    <div className={basketProductListClasses.products}>
      <p
        className={basketProductListClasses.productsTitle}
        style={styles.secondaryText}
      >
        Produtos da cesta
      </p>
      {products.map((p) => {
        const checked = calcSelected.includes(p)

        const price = PRICE_DATA[p]?.[calcMkt]?.at(-1)

        const first = PRICE_DATA[p]?.[calcMkt]?.[0]

        const varP = first && price ? ((price - first) / first) * 100 : null

        return (
          <button
            key={p}
            onClick={() => onToggleProduct(p)}
            className={basketProductListClasses.productButton}
            style={styles.productButton(checked)}
          >
            <div
              className={basketProductListClasses.checkbox}
              style={styles.checkbox(checked)}
            >
              {checked && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke={sharedChartAppearance.pointBorder}
                  strokeWidth="2.5"
                >
                  <polyline points="1.5,5.5 4,8 8.5,2" />
                </svg>
              )}
            </div>
            <div className={basketProductListClasses.details}>
              <p
                className={basketProductListClasses.productName}
                style={styles.primaryText}
              >
                {p}
              </p>
              {price != null ? (
                <p
                  className={basketProductListClasses.metadata}
                  style={styles.secondaryText}
                >
                  Atual:{" "}
                  <span
                    className={basketProductListClasses.price}
                    style={styles.primaryText}
                  >
                    R$ {price.toFixed(2)}
                  </span>
                  {varP != null && (
                    <span style={styles.variation(varP)}>
                      {" "}
                      · {varP >= 0 ? "▲" : "▼"}
                      {Math.abs(varP).toFixed(1)}%
                    </span>
                  )}
                </p>
              ) : (
                <p
                  className={basketProductListClasses.metadata}
                  style={styles.mutedText}
                >
                  Sem dados para este mercado
                </p>
              )}
            </div>
            {price != null && checked && (
              <p
                className={basketProductListClasses.selectedPrice}
                style={styles.selectedPrice}
              >
                R$ {price.toFixed(2)}
              </p>
            )}
          </button>
        )
      })}
    </div>
  )
}
