import { sharedChartAppearance } from "@/screen/shared/styles"
import {
  pricesScreenClasses,
  createPricesScreenStyles,
} from "./PricesScreen.styles"
import PurchaseCalculator from "./PurchaseCalculator/PurchaseCalculator"

import CheapestMarket from "./CheapestMarket/CheapestMarket"

import PriciestMarket from "./PriciestMarket/PriciestMarket"

import PriceChart from "./PriceChart/PriceChart"

import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import { PRICE_DATA } from "@/mocks/PRICE_DATA"
import SeasonalInsight from "./SeasonalInsight/SeasonalInsight"

export default function PricesScreen() {
  const dark = useDark()
  const pal = dmPalette(dark)

  const products = Object.keys(PRICE_DATA)

  const allMktNames = [
    "Todos",
    ...Array.from(
      new Set(Object.values(PRICE_DATA).flatMap((d) => Object.keys(d))),
    ),
  ]

  const [selProduct, setSelProduct] = useState(products[0])

  const productData = PRICE_DATA[selProduct]

  const allMarkets = Object.keys(productData)

  const [selMarkets, setSelMarkets] = useState(allMarkets.slice(0, 3))

  const [search, setSearch] = useState("")

  const [mktFilter, setMktFilter] = useState("Todos")

  const [maxPriceFilter, setMaxPriceFilter] = useState("")

  const [periodFilter, setPeriodFilter] =
    useState<"7d" | "30d" | "90d" | "all" | "custom">("all")

  const [dateFrom, setDateFrom] = useState("")

  const [dateTo, setDateTo] = useState("")

  const [showCalc, setShowCalc] = useState(false)

  const [calcMkt, setCalcMkt] = useState(allMktNames[1] ?? allMktNames[0])

  const toggle = (m: string) => {
    setSelMarkets((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    )
  }

  const periodSlice = (arr: number[]) => {
    if (periodFilter === "all" || periodFilter === "custom") return arr

    const n = periodFilter === "7d" ? 7 : periodFilter === "30d" ? 30 : 90

    return arr.slice(-n)
  }

  const latest = selMarkets

    .filter((m) => productData[m])

    .map((m) => ({ market: m, price: periodSlice(productData[m]).at(-1) ?? 0 }))

  const cheapest =
    latest.length > 0
      ? latest.reduce((a, b) => (a.price < b.price ? a : b))
      : null

  const priciest =
    latest.length > 0
      ? latest.reduce((a, b) => (a.price > b.price ? a : b))
      : null

  const filteredProducts = products.filter((p) => {
    if (search && !p.toLowerCase().includes(search.toLowerCase())) return false

    if (
      mktFilter !== "Todos" &&
      !Object.keys(PRICE_DATA[p]).includes(mktFilter)
    )
      return false

    if (maxPriceFilter) {
      const last = Object.values(PRICE_DATA[p]).map((v) => v.at(-1) ?? 0)

      if (last.every((v) => v > parseFloat(maxPriceFilter))) return false
    }

    return true
  })

  const styles = createPricesScreenStyles(pal)

  return (
    <div className={pricesScreenClasses.screen} style={styles.screen}>
      <div>
        <h1 className={pricesScreenClasses.title} style={styles.primaryText}>
          Histórico de Preços
        </h1>
        <p
          className={pricesScreenClasses.subtitle}
          style={styles.secondaryText}
        >
          Evolução por produto e mercado
        </p>
      </div>

      {/* Search + filters */}
      <div className={pricesScreenClasses.filters}>
        <div className={pricesScreenClasses.search} style={styles.search}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={styles.secondaryText.color}
            strokeWidth="2.5"
            strokeLinecap={sharedChartAppearance.lineCap}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className={pricesScreenClasses.searchInput}
            style={styles.primaryText}
            placeholder="Buscar produto…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={pricesScreenClasses.clearButton}
              style={styles.mutedText}
            >
              ✕
            </button>
          )}
        </div>
        <div className={pricesScreenClasses.filterRow}>
          <select
            className={pricesScreenClasses.marketSelect}
            style={styles.input}
            value={mktFilter}
            onChange={(e) => setMktFilter(e.target.value)}
          >
            {allMktNames.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <div className={pricesScreenClasses.maxPrice} style={styles.search}>
            <span
              className={pricesScreenClasses.maxPriceLabel}
              style={styles.secondaryText}
            >
              Até R$
            </span>
            <input
              type="number"
              className={pricesScreenClasses.maxPriceInput}
              style={styles.primaryText}
              placeholder="—"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
            />
          </div>
        </div>
        {/* Period filter */}
        <div className={pricesScreenClasses.periodGroup} style={styles.border}>
          {([
            { k: "all", l: "Tudo" },

            { k: "custom", l: "📅 Data específica" },
          ] as const).map(({ k, l }) => (
            <button
              key={k}
              onClick={() => setPeriodFilter(k)}
              className={pricesScreenClasses.periodButton}
              style={styles.periodButton(periodFilter === k)}
            >
              {l}
            </button>
          ))}
        </div>
        {/* Custom date range */}
        {periodFilter === "custom" && (
          <div className={pricesScreenClasses.dateRow}>
            <div className={pricesScreenClasses.dateField}>
              <label
                className={pricesScreenClasses.dateLabel}
                style={styles.secondaryText}
              >
                De
              </label>
              <input
                type="date"
                className={pricesScreenClasses.dateInput}
                style={styles.input}
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className={pricesScreenClasses.dateField}>
              <label
                className={pricesScreenClasses.dateLabel}
                style={styles.secondaryText}
              >
                Até
              </label>
              <input
                type="date"
                className={pricesScreenClasses.dateInput}
                style={styles.input}
                value={dateTo}
                min={dateFrom}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Calcular compras button */}
      <button
        onClick={() => setShowCalc(true)}
        className={pricesScreenClasses.calculatorButton}
        style={styles.calculatorButton}
      >
        🧮 Calcular Compras
      </button>

      {/* Product pills */}
      <div>
        <p className={pricesScreenClasses.sectionLabel}>Produto</p>
        <div className={pricesScreenClasses.productList}>
          {filteredProducts.map((p) => (
            <button
              key={p}
              onClick={() => {
                setSelProduct(p)

                setSelMarkets(Object.keys(PRICE_DATA[p]).slice(0, 3))
              }}
              className={pricesScreenClasses.productButton(selProduct === p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Market toggles */}
      <div>
        <p className={pricesScreenClasses.sectionLabel}>Mercados</p>
        <div className={pricesScreenClasses.markets}>
          {allMarkets.map((m, i) => {
            const active = selMarkets.includes(m)

            return (
              <button
                key={m}
                onClick={() => toggle(m)}
                className={pricesScreenClasses.marketButton}
                style={styles.marketButton(active, i)}
              >
                {m}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chart card */}
      <div className={pricesScreenClasses.chartCard} style={styles.card}>
        <div className={pricesScreenClasses.chartHeader}>
          <p
            className={pricesScreenClasses.chartTitle}
            style={styles.primaryText}
          >
            {selProduct}
          </p>
          <p
            className={pricesScreenClasses.chartPeriod}
            style={styles.secondaryText}
          >
            Jan – Ago 2026
          </p>
        </div>
        {selMarkets.length > 0 ? (
          <PriceChart
            product={selProduct}
            markets={selMarkets}
            period={periodFilter === "custom" ? "all" : periodFilter}
          />
        ) : (
          <div
            className={pricesScreenClasses.emptyChart}
            style={styles.secondaryText}
          >
            Selecione ao menos um mercado
          </div>
        )}
        <div className={pricesScreenClasses.legend}>
          {selMarkets.map((m, i) => (
            <div key={m} className={pricesScreenClasses.legendItem}>
              <div
                className={pricesScreenClasses.legendDot}
                style={styles.legendDot(i)}
              />
              <span
                className={pricesScreenClasses.legendLabel}
                style={styles.secondaryText}
              >
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      {cheapest && priciest && cheapest.market !== priciest.market && (
        <div className={pricesScreenClasses.stats}>
          <CheapestMarket market={cheapest.market} price={cheapest.price} />
          <PriciestMarket market={priciest.market} price={priciest.price} />
        </div>
      )}

      {/* Seasonal insight */}
      <SeasonalInsight product={selProduct} />

      {/* ── Calcular Compras modal ── */}
      {showCalc && (
        <PurchaseCalculator
          products={products}
          markets={allMktNames}
          market={calcMkt}
          onMarketChange={setCalcMkt}
          onClose={() => setShowCalc(false)}
        />
      )}
    </div>
  )
}
