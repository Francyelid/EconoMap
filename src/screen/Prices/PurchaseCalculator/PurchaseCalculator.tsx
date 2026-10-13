import CalculatorHeader from "./CalculatorHeader/CalculatorHeader"
import BasketSummary from "./BasketSummary/BasketSummary"
import BasketProductList from "./BasketProductList/BasketProductList"
import BasketTotal from "./BasketTotal/BasketTotal"
import {
  purchaseCalculatorClasses,
  createPurchaseCalculatorStyles,
} from "./PurchaseCalculator.styles"

import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import { MONTHS } from "@/mocks/MONTHS"
import { PRICE_DATA } from "@/mocks/PRICE_DATA"

type PurchaseCalculatorProps = {
  products: string[]
  markets: string[]
  market: string
  onMarketChange: (market: string) => void
  onClose: () => void
}

export default function PurchaseCalculator({
  products,
  markets: allMktNames,
  market: calcMkt,
  onMarketChange: setCalcMkt,
  onClose,
}: PurchaseCalculatorProps) {
  const pal = dmPalette(useDark())
  const [calcSelected, setCalcSelected] = useState<string[]>([])

  // Basket time series: sum selected products' prices for calcMkt at each month

  const basketSeries: number[] = MONTHS.map((_, mi) =>
    calcSelected.reduce(
      (sum, p) => sum + (PRICE_DATA[p]?.[calcMkt]?.[mi] ?? 0),
      0,
    ),
  )

  const firstVal = basketSeries[0] || 0

  const lastVal = basketSeries.at(-1) || 0

  const variation = firstVal > 0 ? ((lastVal - firstVal) / firstVal) * 100 : 0

  function toggleProduct(product: string) {
    setCalcSelected((previous) =>
      previous.includes(product)
        ? previous.filter((item) => item !== product)
        : [...previous, product],
    )
  }

  const styles = createPurchaseCalculatorStyles(pal)

  return (
    <div
      className={purchaseCalculatorClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={purchaseCalculatorClasses.sheet}
        style={styles.sheet}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={purchaseCalculatorClasses.handleContainer}>
          <div
            className={purchaseCalculatorClasses.handle}
            style={styles.handle}
          />
        </div>

        <CalculatorHeader
          markets={allMktNames}
          market={calcMkt}
          onMarketChange={setCalcMkt}
          onClose={onClose}
        />
        <div className={purchaseCalculatorClasses.content}>
          {/* Basket chart — shown when ≥1 product selected */}
          {calcSelected.length > 0 && (
            <BasketSummary
              palette={pal}
              productCount={calcSelected.length}
              market={calcMkt}
              total={lastVal}
              variation={variation}
              series={basketSeries}
            />
          )}

          <BasketProductList
            palette={pal}
            products={products}
            selectedProducts={calcSelected}
            market={calcMkt}
            onToggleProduct={toggleProduct}
          />
        </div>

        <BasketTotal
          productCount={calcSelected.length}
          market={calcMkt}
          total={lastVal}
          variation={variation}
        />
      </div>
    </div>
  )
}
