import { sharedChartAppearance } from "@/screen/shared/styles"
import {
  purchaseCalculatorClasses,
  createPurchaseCalculatorStyles,
} from "./PurchaseCalculator.styles"
import BasketChart from "./BasketChart/BasketChart"

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

        {/* Header */}
        <div className={purchaseCalculatorClasses.header} style={styles.header}>
          <div className={purchaseCalculatorClasses.headerRow}>
            <h2
              className={purchaseCalculatorClasses.title}
              style={styles.title}
            >
              Calcular Compras
            </h2>
            <button
              onClick={onClose}
              className={purchaseCalculatorClasses.closeButton}
              style={styles.closeButton}
            >
              ✕
            </button>
          </div>
          <p
            className={purchaseCalculatorClasses.caption}
            style={styles.caption}
          >
            Selecione produtos e um mercado para ver a variação da cesta ao
            longo do tempo
          </p>
          {/* Market selector */}
          <select
            className={purchaseCalculatorClasses.marketSelect}
            style={styles.marketSelect}
            value={calcMkt}
            onChange={(e) => setCalcMkt(e.target.value)}
          >
            {allMktNames
              .filter((m) => m !== "Todos")
              .map((m) => (
                <option key={m} style={styles.marketOption}>
                  {m}
                </option>
              ))}
          </select>
        </div>

        <div className={purchaseCalculatorClasses.content}>
          {/* Basket chart — shown when ≥1 product selected */}
          {calcSelected.length > 0 && (
            <div
              className={purchaseCalculatorClasses.chartCard}
              style={styles.card}
            >
              <div className={purchaseCalculatorClasses.chartHeader}>
                <div>
                  <p
                    className={purchaseCalculatorClasses.chartTitle}
                    style={styles.primaryText}
                  >
                    Cesta de {calcSelected.length} produto
                    {calcSelected.length !== 1 ? "s" : ""}
                  </p>
                  <p
                    className={purchaseCalculatorClasses.caption}
                    style={styles.secondaryText}
                  >
                    {calcMkt}
                  </p>
                </div>
                <div className={purchaseCalculatorClasses.summary}>
                  <p
                    className={purchaseCalculatorClasses.total}
                    style={styles.primaryText}
                  >
                    R$ {lastVal.toFixed(2)}
                  </p>
                  <p
                    className={purchaseCalculatorClasses.variation}
                    style={styles.variation(variation)}
                  >
                    {variation >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(variation).toFixed(1)}% vs Jan
                  </p>
                </div>
              </div>
              <BasketChart series={basketSeries} />
            </div>
          )}

          {/* Product list */}
          <div className={purchaseCalculatorClasses.products}>
            <p
              className={purchaseCalculatorClasses.productsTitle}
              style={styles.secondaryText}
            >
              Produtos da cesta
            </p>
            {products.map((p) => {
              const checked = calcSelected.includes(p)

              const price = PRICE_DATA[p]?.[calcMkt]?.at(-1)

              const first = PRICE_DATA[p]?.[calcMkt]?.[0]

              const varP =
                first && price ? ((price - first) / first) * 100 : null

              return (
                <button
                  key={p}
                  onClick={() =>
                    setCalcSelected((prev) =>
                      checked ? prev.filter((x) => x !== p) : [...prev, p],
                    )
                  }
                  className={purchaseCalculatorClasses.productButton}
                  style={styles.productButton(checked)}
                >
                  <div
                    className={purchaseCalculatorClasses.checkbox}
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
                  <div className={purchaseCalculatorClasses.details}>
                    <p
                      className={purchaseCalculatorClasses.productName}
                      style={styles.primaryText}
                    >
                      {p}
                    </p>
                    {price != null ? (
                      <p
                        className={purchaseCalculatorClasses.metadata}
                        style={styles.secondaryText}
                      >
                        Atual:{" "}
                        <span
                          className={purchaseCalculatorClasses.price}
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
                        className={purchaseCalculatorClasses.metadata}
                        style={styles.mutedText}
                      >
                        Sem dados para este mercado
                      </p>
                    )}
                  </div>
                  {price != null && checked && (
                    <p
                      className={purchaseCalculatorClasses.selectedPrice}
                      style={styles.selectedPrice}
                    >
                      R$ {price.toFixed(2)}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Total bar */}
        <div className={purchaseCalculatorClasses.footer} style={styles.footer}>
          <div>
            <p
              className={purchaseCalculatorClasses.footerLabel}
              style={styles.footerLabel}
            >
              {calcSelected.length > 0
                ? `${calcSelected.length} produto${
                    calcSelected.length !== 1 ? "s" : ""
                  } · ${calcMkt.split(" ")[0]}`
                : "Selecione produtos"}
            </p>
            <p className={purchaseCalculatorClasses.footerTotal}>
              {calcSelected.length > 0 ? `R$ ${lastVal.toFixed(2)}` : "—"}
            </p>
          </div>
          {calcSelected.length > 0 && (
            <div className={purchaseCalculatorClasses.summary}>
              <p
                className={purchaseCalculatorClasses.caption}
                style={styles.footerLabel}
              >
                Variação (Jan→Ago)
              </p>
              <p
                className={purchaseCalculatorClasses.footerVariation}
                style={styles.footerVariation(variation)}
              >
                {variation >= 0 ? "▲" : "▼"} {Math.abs(variation).toFixed(1)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
