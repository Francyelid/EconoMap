import {
  basketProductListClasses,
  createBasketProductListStyles,
} from "./BasketProductList.styles"

import type { dmPalette } from "@/theme"

import { PRICE_DATA } from "@/services/demo/data"

import { sharedChartAppearance } from "@/screen/shared/styles"

import { hasCompleteHistory } from "@/business/priceAnalysis"

import { MONTHS } from "@/constants/months"
import { useId, useState } from "react"
import { normalizeSearchText } from "@/utils/search"
import { ICONS } from "@/constants/icons"

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
  const id = useId()
  const [query, setQuery] = useState("")
  const [onlySelected, setOnlySelected] = useState(false)
  const [limit, setLimit] = useState(10)
  const matches = products.filter(
    (product) =>
      (!onlySelected || calcSelected.includes(product)) &&
      normalizeSearchText(product).includes(normalizeSearchText(query)),
  )
  const visible = matches.slice(0, limit)

  return (
    <details
      open
      className="rounded-2xl border p-3"
      style={{ background: pal.card, borderColor: pal.border }}
    >
      <summary
        className="cursor-pointer py-1 text-xs font-semibold"
        style={styles.primaryText}
      >
        Produtos da cesta{" "}
        <span className="font-normal" style={styles.secondaryText}>
          · {calcSelected.length} selecionados
        </span>
      </summary>
      <div className="mt-3 space-y-3">
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
            aria-label="Buscar produtos da cesta"
            placeholder="Buscar produtos…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setLimit(10)
            }}
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
            style={styles.primaryText}
          />
        </div>
        <div
          role="group"
          aria-label="Exibição de produtos da cesta"
          className="grid grid-cols-2 gap-1 rounded-xl p-1"
          style={{ background: pal.cardAlt }}
        >
          {[false, true].map((selected) => (
            <button
              key={String(selected)}
              type="button"
              aria-pressed={onlySelected === selected}
              onClick={() => {
                setOnlySelected(selected)
                setLimit(10)
              }}
              className="min-h-10 rounded-lg px-2 py-2 text-xs font-semibold"
              style={{
                background:
                  onlySelected === selected ? pal.green : "transparent",
                color: onlySelected === selected ? "#fff" : pal.textSecondary,
              }}
            >
              {selected ? `Selecionados (${calcSelected.length})` : "Todos"}
            </button>
          ))}
        </div>
        <p role="status" className="text-[11px]" style={styles.secondaryText}>
          {matches.length
            ? `${Math.min(limit, matches.length)} de ${matches.length} produtos`
            : onlySelected && !calcSelected.length
              ? "Nenhum produto selecionado ainda."
              : "Nenhum produto corresponde à busca."}
        </p>
        <div
          className={`${basketProductListClasses.products} max-h-80 overflow-y-auto overscroll-contain p-0.5`}
        >
          {visible.map((p) => {
            const checked = calcSelected.includes(p)

            const available = hasCompleteHistory(
              PRICE_DATA[p]?.[calcMkt],
              MONTHS.length,
            )

            const price = PRICE_DATA[p]?.[calcMkt]?.at(-1)

            const first = PRICE_DATA[p]?.[calcMkt]?.[0]

            const varP =
              first != null && first > 0 && price != null
                ? ((price - first) / first) * 100
                : null

            return (
              <button
                key={p}
                type="button"
                aria-pressed={checked}
                disabled={!available}
                onClick={() => onToggleProduct(p)}
                className={basketProductListClasses.productButton}
                style={{
                  ...styles.productButton(checked),
                  opacity: available ? 1 : 0.6,
                }}
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
                {!available && price != null && (
                  <span className="text-[10px]" style={styles.secondaryText}>
                    Histórico incompleto
                  </span>
                )}
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
        {matches.length > limit && (
          <button
            type="button"
            onClick={() => setLimit((previous) => previous + 10)}
            className="min-h-11 w-full rounded-xl border px-3 text-xs font-semibold"
            style={{ borderColor: pal.border, color: pal.green }}
          >
            Mostrar mais {Math.min(10, matches.length - limit)}
          </button>
        )}
      </div>
    </details>
  )
}
