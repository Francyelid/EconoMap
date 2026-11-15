import { createMarketFiltersStyles } from "./MarketFilters.styles"
import { useId, useState } from "react"
import { MARKET_ICONS, ICONS } from "@/constants/icons"
import { MARKET_TYPE_DESCRIPTIONS } from "@/constants/marketTypes"
import type { dmPalette } from "@/theme"
import type { MarketFiltersProps as FilterProps } from "../types"

type MarketFiltersProps = FilterProps & {
  palette: ReturnType<typeof dmPalette>
}

export default function MarketFilters({
  palette: p,
  allTypes,
  searchFilter,
  onSearchFilterChange,
  typeFilter,
  onTypeFilterChange,
  priceFilter,
  onPriceFilterChange,
}: MarketFiltersProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const selected = allTypes.filter((type) => typeFilter.includes(type))
  const styles = createMarketFiltersStyles(p)
  const { accent, text, secondary } = styles

  return (
    <div
      className="space-y-3 rounded-2xl border p-3 shadow-sm"
      style={styles.card}
    >
      <div
        className="flex items-center gap-3 rounded-xl border px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-600/20"
        style={styles.search}
      >
        {ICONS.search}
        <input
          aria-label="Buscar mercado"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          style={text}
          placeholder="Buscar mercado ou endereço"
          value={searchFilter}
          onChange={(event) => onSearchFilterChange(event.target.value)}
        />
        {searchFilter && (
          <button
            type="button"
            aria-label="Limpar busca"
            className="h-6 w-6"
            onClick={() => onSearchFilterChange("")}
          >
            ×
          </button>
        )}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center gap-3 rounded-xl p-3 text-left focus-visible:outline-2 focus-visible:outline-green-600"
        style={styles.surface}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base"
          style={accent}
        >
          {ICONS.store}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold" style={text}>
            Tipos de mercado
          </span>
          <span className="mt-0.5 block truncate text-xs" style={secondary}>
            {selected.length ? selected.join(", ") : "Todos os tipos"}
          </span>
        </span>
        {selected.length > 0 && (
          <span
            className="rounded-full px-2 py-0.5 text-xs font-bold"
            style={accent}
          >
            {selected.length}
          </span>
        )}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 transition-transform"
          style={{
            ...secondary,
            transform: open ? "rotate(180deg)" : undefined,
          }}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div id={panelId} hidden={!open}>
        <fieldset className="space-y-3 border-t pt-3" style={styles.divider}>
          <legend className="sr-only">Escolha os tipos de mercado</legend>
          <div className="flex items-center justify-between gap-2 text-xs">
            <p style={secondary}>Selecione um ou mais tipos</p>
            <button
              type="button"
              className="shrink-0 rounded-lg px-2 py-1 font-semibold"
              style={accent}
              onClick={() => onTypeFilterChange([])}
            >
              Todos os tipos
            </button>
          </div>
          <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto p-0.5">
            {allTypes.map((type) => (
              <label
                key={type}
                title={MARKET_TYPE_DESCRIPTIONS[type]}
                className="flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 transition-colors focus-within:ring-2 focus-within:ring-green-600/40"
                style={styles.option(typeFilter.includes(type))}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={typeFilter.includes(type)}
                  onChange={(event) =>
                    onTypeFilterChange(
                      event.target.checked
                        ? [...typeFilter, type]
                        : typeFilter.filter((item) => item !== type),
                    )
                  }
                />
                <span className="shrink-0 text-base" style={{ color: p.green }}>
                  {MARKET_ICONS[type]}
                </span>
                <span className="min-w-0 flex-1 text-[11px] font-semibold leading-snug">
                  {type}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] peer-focus-visible:ring-2 peer-focus-visible:ring-green-600"
                  style={styles.checkbox(typeFilter.includes(type))}
                >
                  {typeFilter.includes(type) ? "✓" : ""}
                </span>
                <span className="sr-only">
                  {MARKET_TYPE_DESCRIPTIONS[type]}
                </span>
              </label>
            ))}
          </div>
          <p className="text-[11px]" style={secondary}>
            Sem seleção, todos os tipos são exibidos.
          </p>
        </fieldset>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Tipos selecionados">
          {selected.map((type) => (
            <button
              key={type}
              type="button"
              aria-label={`Remover filtro ${type}`}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold"
              style={accent}
              onClick={() =>
                onTypeFilterChange(typeFilter.filter((item) => item !== type))
              }
            >
              {MARKET_ICONS[type]} {type} <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2 border-t pt-3" style={styles.divider}>
        <p
          className="text-[10px] font-bold uppercase tracking-wider"
          style={secondary}
        >
          Faixa de preço
        </p>
        <div
          role="group"
          aria-label="Faixa de preço"
          className="grid grid-cols-4 gap-1 rounded-xl p-1"
          style={styles.surface}
        >
          {([
            ["all", "Todos"],
            ["cheap", "Barato"],
            ["mid", "Médio"],
            ["expensive", "Caro"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={priceFilter === value}
              className="min-w-0 rounded-lg px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-green-600"
              style={styles.price(priceFilter === value)}
              onClick={() => onPriceFilterChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
