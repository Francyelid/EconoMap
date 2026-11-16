import { useId } from "react"
import { ICONS } from "@/constants/icons"
import {
  productPriceMarkets,
  searchPriceProducts,
} from "@/business/priceAnalysis"
import type { PriceHistory } from "@/models/PriceHistory"
import type { dmPalette } from "@/theme"

type Props = {
  data: PriceHistory
  palette: ReturnType<typeof dmPalette>
  query: string
  selectedProduct: string
  onQueryChange: (query: string) => void
  onSelect: (product: string) => void
  onClear: () => void
}

export default function ProductMarketSearch({
  data,
  palette: pal,
  query,
  selectedProduct,
  onQueryChange,
  onSelect,
  onClear,
}: Props) {
  const id = useId()
  const results = searchPriceProducts(data, query)
  const searching = query.trim().length > 0 && query !== selectedProduct
  return (
    <div className="space-y-2">
      <div>
        <label
          htmlFor={id}
          className="text-xs font-bold"
          style={{ color: pal.textPrimary }}
        >
          Produto
        </label>
      </div>
      <div
        className="flex min-h-11 items-center gap-2 rounded-xl border px-3"
        style={{
          background: pal.inputBg,
          borderColor: pal.border,
          color: pal.textSecondary,
        }}
      >
        {ICONS.search}
        <input
          id={id}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar produto em todos os mercados…"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none"
          style={{ color: pal.textPrimary }}
        />
      </div>
      {searching && (
        <div
          className="max-h-52 space-y-1 overflow-y-auto"
          aria-label="Produtos encontrados"
        >
          {results.map((product) => (
            <button
              key={product}
              type="button"
              onClick={() => onSelect(product)}
              className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-green-600"
              style={{ background: pal.cardAlt, color: pal.textPrimary }}
            >
              <span className="text-xs font-semibold">{product}</span>
              <span
                className="shrink-0 text-[10px]"
                style={{ color: pal.textSecondary }}
              >
                {productPriceMarkets(data, product).length} mercados com dados
              </span>
            </button>
          ))}
          {!results.length && (
            <p
              role="status"
              className="text-xs"
              style={{ color: pal.textSecondary }}
            >
              Nenhum produto com dados de preço foi encontrado.
            </p>
          )}
        </div>
      )}
      {selectedProduct && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={onClear}
            className="min-h-9 text-xs font-semibold"
            style={{ color: pal.green }}
          >
            Limpar seleção de produto
          </button>
        </div>
      )}
    </div>
  )
}
