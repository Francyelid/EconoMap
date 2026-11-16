import { useState } from "react"
import PriceFilters from "./PriceFilters/PriceFilters"
import ProductSelector from "./ProductSelector/ProductSelector"
import MarketSelector from "./MarketSelector/MarketSelector"
import PriceChartCard from "./PriceChartCard/PriceChartCard"
import CheapestMarket from "./CheapestMarket/CheapestMarket"
import PriciestMarket from "./PriciestMarket/PriciestMarket"
import SeasonalInsight from "./SeasonalInsight/SeasonalInsight"
import type { PricePeriod } from "./types"
import { dmPalette, useDark } from "@/theme"
import { PRICE_DATA, PRICE_MONTHS } from "@/services/demo/data"
import {
  priceMarkets,
  commonPriceProducts,
  productPriceMarkets,
  filterPriceMonths,
} from "@/business/priceAnalysis"
import ProductMarketSearch from "./ProductMarketSearch"

export default function ProductPricesPanel() {
  const pal = dmPalette(useDark())
  const [discoveryQuery, setDiscoveryQuery] = useState("")
  const [discoveryProduct, setDiscoveryProduct] = useState("")
  const markets = discoveryProduct
    ? productPriceMarkets(PRICE_DATA, discoveryProduct)
    : priceMarkets(PRICE_DATA)
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([])
  const [requestedProduct, setRequestedProduct] = useState("")

  const [maxPrice, setMaxPrice] = useState("")
  const [period, setPeriod] = useState<PricePeriod>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const history = filterPriceMonths(
    PRICE_DATA,
    PRICE_MONTHS,
    period === "custom" ? dateFrom : "",
    period === "custom" ? dateTo : "",
  )
  const monthLabels = history.months.map((month) =>
    new Date(`${month}-01T12:00:00`)
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", ""),
  )
  const products = commonPriceProducts(
    history.data,
    selectedMarkets,
    discoveryProduct ? "" : discoveryQuery,
    maxPrice,
  ).filter((product) => !discoveryProduct || product === discoveryProduct)
  const selectedProduct = products.includes(requestedProduct)
    ? requestedProduct
    : (products[0] ?? "")
  const latest = selectedProduct
    ? selectedMarkets.map((market) => ({
        market,
        price: history.data[selectedProduct][market].at(-1) ?? 0,
      }))
    : []
  const cheapest = latest.length
    ? latest.reduce((a, b) => (a.price < b.price ? a : b))
    : null
  const priciest = latest.length
    ? latest.reduce((a, b) => (a.price > b.price ? a : b))
    : null
  return (
    <div className="space-y-4">
      <div
        className="space-y-4 rounded-2xl border p-4"
        style={{ background: pal.card, borderColor: pal.border }}
      >
        <ProductMarketSearch
          data={PRICE_DATA}
          palette={pal}
          query={discoveryQuery}
          selectedProduct={discoveryProduct}
          onQueryChange={(query) => {
            setDiscoveryQuery(query)
            setDiscoveryProduct("")
          }}
          onSelect={(product) => {
            setDiscoveryProduct(product)
            setDiscoveryQuery(product)
            setRequestedProduct(product)

            setMaxPrice("")
            const available = productPriceMarkets(PRICE_DATA, product)
            setSelectedMarkets((previous) =>
              previous.filter((market) => available.includes(market)),
            )
          }}
          onClear={() => {
            setDiscoveryProduct("")
            setDiscoveryQuery("")
          }}
        />
        <MarketSelector
          markets={markets}
          selectedMarkets={selectedMarkets}
          onToggleMarket={(market) =>
            setSelectedMarkets((previous) =>
              previous.includes(market)
                ? previous.filter((value) => value !== market)
                : [...previous, market],
            )
          }
        />
        {products.length > 1 && !discoveryProduct && !discoveryQuery.trim() && (
          <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onSelectProduct={setRequestedProduct}
          />
        )}
        {selectedMarkets.length >= 2 && (
          <details
            className="border-t pt-3"
            style={{ borderColor: pal.divider }}
          >
            <summary
              className="cursor-pointer text-xs font-semibold"
              style={{ color: pal.textSecondary }}
            >
              Preço e datas{" "}
              {period === "custom" && (dateFrom || dateTo)
                ? "· filtro ativo"
                : ""}
            </summary>
            <PriceFilters
              palette={pal}
              maxPriceFilter={maxPrice}
              setMaxPriceFilter={setMaxPrice}
              periodFilter={period}
              setPeriodFilter={setPeriod}
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              dateTo={dateTo}
              setDateTo={setDateTo}
            />
          </details>
        )}
      </div>
      {selectedMarkets.length < 2 ? (
        <p
          role="status"
          className="rounded-2xl border p-4 text-sm"
          style={{
            background: pal.card,
            borderColor: pal.border,
            color: pal.textSecondary,
          }}
        >
          {discoveryProduct && markets.length < 2
            ? "Este produto tem dados em apenas um mercado. A comparação ficará disponível quando houver preços em pelo menos dois estabelecimentos."
            : "Selecione pelo menos dois mercados para encontrar produtos em comum e comparar os preços."}
        </p>
      ) : (
        <>
          {products.length ? (
            <>
              <PriceChartCard
                palette={pal}
                product={selectedProduct}
                markets={selectedMarkets}
                period={period}
                history={history.data}
                months={monthLabels}
                periodLabel={
                  history.months.length
                    ? `${history.months[0].split("-").reverse().join("/")} – ${history.months.at(-1)?.split("-").reverse().join("/")}`
                    : "Sem dados"
                }
              />
              {cheapest && priciest && cheapest.market !== priciest.market && (
                <div className="grid grid-cols-2 gap-3">
                  <CheapestMarket
                    market={cheapest.market}
                    price={cheapest.price}
                  />
                  <PriciestMarket
                    market={priciest.market}
                    price={priciest.price}
                  />
                </div>
              )}
              <SeasonalInsight product={selectedProduct} />
            </>
          ) : (
            <p
              role="status"
              className="text-sm"
              style={{ color: pal.textSecondary }}
            >
              {dateFrom && dateTo && dateFrom > dateTo
                ? "A data inicial deve ser anterior ou igual à data final."
                : history.months.length === 0
                  ? "Não há dados de preço no período escolhido."
                  : "Nenhum produto em comum corresponde à seleção. Ajuste os mercados ou os filtros."}
            </p>
          )}
        </>
      )}
    </div>
  )
}
