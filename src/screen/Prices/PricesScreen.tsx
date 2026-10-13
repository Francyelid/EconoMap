import PricesHeader from "./PricesHeader/PricesHeader"
import PriceFilters from "./PriceFilters/PriceFilters"
import CalculatorAction from "./CalculatorAction/CalculatorAction"
import ProductSelector from "./ProductSelector/ProductSelector"
import MarketSelector from "./MarketSelector/MarketSelector"
import PriceChartCard from "./PriceChartCard/PriceChartCard"
import type { PricePeriod } from "./types"
import {
  pricesScreenClasses,
  createPricesScreenStyles,
} from "./PricesScreen.styles"
import PurchaseCalculator from "./PurchaseCalculator/PurchaseCalculator"

import CheapestMarket from "./CheapestMarket/CheapestMarket"

import PriciestMarket from "./PriciestMarket/PriciestMarket"

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

  const [periodFilter, setPeriodFilter] = useState<PricePeriod>("all")

  const [dateFrom, setDateFrom] = useState("")

  const [dateTo, setDateTo] = useState("")

  const [showCalc, setShowCalc] = useState(false)

  const [calcMkt, setCalcMkt] = useState(allMktNames[1] ?? allMktNames[0])

  function handleSelectProduct(product: string) {
    setSelProduct(product)
    setSelMarkets(Object.keys(PRICE_DATA[product]).slice(0, 3))
  }

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
      <PricesHeader palette={pal} />

      <PriceFilters
        palette={pal}
        search={search}
        setSearch={setSearch}
        mktFilter={mktFilter}
        setMktFilter={setMktFilter}
        maxPriceFilter={maxPriceFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        allMktNames={allMktNames}
      />

      <CalculatorAction onOpen={() => setShowCalc(true)} />

      <ProductSelector
        products={filteredProducts}
        selectedProduct={selProduct}
        onSelectProduct={handleSelectProduct}
      />

      <MarketSelector
        markets={allMarkets}
        selectedMarkets={selMarkets}
        onToggleMarket={toggle}
      />

      <PriceChartCard
        palette={pal}
        product={selProduct}
        markets={selMarkets}
        period={periodFilter}
      />

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
