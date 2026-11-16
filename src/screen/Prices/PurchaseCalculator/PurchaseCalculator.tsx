import { useState } from "react"
import CalculatorHeader from "./CalculatorHeader/CalculatorHeader"
import BasketSummary from "./BasketSummary/BasketSummary"
import BasketProductList from "./BasketProductList/BasketProductList"
import BasketTotal from "./BasketTotal/BasketTotal"
import { dmPalette, useDark } from "@/theme"
import { MONTHS } from "@/constants/months"
import { PRICE_DATA } from "@/services/demo/data"
import {
  priceMarkets,
  hasCompleteHistory,
  basketHistory,
} from "@/business/priceAnalysis"

export default function PurchaseCalculator() {
  const pal = dmPalette(useDark())
  const markets = priceMarkets(PRICE_DATA)
  const [market, setMarket] = useState(markets[0] ?? "")
  const [selected, setSelected] = useState<string[]>([])
  const [notice, setNotice] = useState("")
  const products = Object.keys(PRICE_DATA)
  const series = basketHistory(PRICE_DATA, selected, market, MONTHS.length)
  const first = series?.[0] ?? 0
  const total = series?.at(-1) ?? 0
  const variation = first > 0 ? ((total - first) / first) * 100 : 0
  function changeMarket(value: string) {
    const remaining = selected.filter((product) =>
      hasCompleteHistory(PRICE_DATA[product]?.[value], MONTHS.length),
    )
    setNotice(
      remaining.length !== selected.length
        ? "Produtos sem histórico completo neste mercado foram retirados da seleção."
        : "",
    )
    setSelected(remaining)
    setMarket(value)
  }
  return (
    <div className="space-y-5">
      <CalculatorHeader
        markets={markets}
        market={market}
        onMarketChange={changeMarket}
      />
      {notice && (
        <p
          role="status"
          className="text-xs"
          style={{ color: pal.textSecondary }}
        >
          {notice}
        </p>
      )}
      {!selected.length ? (
        <p
          role="status"
          className="rounded-2xl border p-4 text-sm"
          style={{
            background: pal.card,
            borderColor: pal.border,
            color: pal.textSecondary,
          }}
        >
          Selecione produtos abaixo para acompanhar a evolução do valor da sua
          cesta neste mercado.
        </p>
      ) : series ? (
        <BasketSummary
          palette={pal}
          productCount={selected.length}
          market={market}
          total={total}
          variation={variation}
          series={series}
        />
      ) : (
        <p
          role="status"
          className="text-sm"
          style={{ color: pal.textSecondary }}
        >
          Histórico insuficiente para calcular esta cesta.
        </p>
      )}
      <BasketProductList
        palette={pal}
        products={products}
        selectedProducts={selected}
        market={market}
        onToggleProduct={(product) => {
          if (!hasCompleteHistory(PRICE_DATA[product]?.[market], MONTHS.length))
            return
          setSelected((previous) =>
            previous.includes(product)
              ? previous.filter((value) => value !== product)
              : [...previous, product],
          )
        }}
      />
      {series && (
        <div className="overflow-hidden rounded-2xl">
          <BasketTotal
            productCount={selected.length}
            market={market}
            total={total}
            variation={variation}
          />
        </div>
      )}
    </div>
  )
}
