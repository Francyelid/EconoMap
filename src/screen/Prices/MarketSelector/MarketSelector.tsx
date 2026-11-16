import { useId, useRef, useState } from "react"
import { normalizeSearchText } from "@/utils/search"
import { dmPalette, useDark } from "@/theme"
import { ICONS } from "@/constants/icons"
import {
  marketSelectorClasses as classes,
  createMarketSelectorStyles,
} from "./MarketSelector.styles"

const PAGE_SIZE = 10

type MarketSelectorProps = {
  markets: string[]
  selectedMarkets: string[]
  onToggleMarket: (market: string) => void
}

export default function MarketSelector({
  markets,
  selectedMarkets,
  onToggleMarket,
}: MarketSelectorProps) {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState(false)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const id = useId()
  const container = useRef<HTMLDetailsElement>(null)
  const pal = dmPalette(useDark())
  const styles = createMarketSelectorStyles(pal)
  const matches = markets.filter((market) =>
    normalizeSearchText(market).includes(normalizeSearchText(search)),
  )
  const visible = matches.slice(0, limit)
  return (
    <details ref={container}>
      <summary
        className="cursor-pointer py-2 text-xs font-semibold"
        style={{ color: pal.textPrimary }}
      >
        Mercados{" "}
        <span className="font-normal" style={{ color: pal.textSecondary }}>
          · {selectedMarkets.length} selecionados
        </span>
      </summary>
      <div className="mt-2 space-y-3">
        <div
          className="flex min-h-11 items-center gap-2 rounded-xl border px-3 focus-within:ring-2 focus-within:ring-green-600/20"
          style={{
            background: pal.inputBg,
            borderColor: pal.border,
            color: pal.textSecondary,
          }}
        >
          {ICONS.search}
          <input
            id={id}
            aria-label="Buscar mercados"
            type="search"
            aria-controls={`${id}-results`}
            aria-expanded={expanded}
            placeholder="Buscar pelo nome do mercado…"
            value={search}
            onFocus={() => setExpanded(true)}
            onChange={(event) => {
              setSearch(event.target.value)
              setLimit(PAGE_SIZE)
              setExpanded(true)
            }}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none"
            style={{ color: pal.textPrimary }}
          />
        </div>
        {selectedMarkets.length > 0 && (
          <div
            className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto"
            aria-label="Mercados selecionados"
          >
            {selectedMarkets.map((market) => (
              <button
                key={market}
                type="button"
                aria-label={`Remover ${market} da comparação`}
                onClick={() => onToggleMarket(market)}
                className={classes.marketButton}
                style={styles.marketButton(true)}
              >
                {market} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-results`}
          onClick={() => {
            if (expanded) {
              setExpanded(false)
              if (container.current) container.current.open = false
            } else setExpanded(true)
          }}
          className="min-h-9 text-xs font-semibold"
          style={{ color: pal.green }}
        >
          {expanded
            ? "Concluir seleção"
            : `Ver mercados disponíveis (${markets.length})`}
        </button>
        <div id={`${id}-results`} hidden={!expanded} className="space-y-2">
          <p
            role="status"
            className="text-[11px]"
            style={{ color: pal.textSecondary }}
          >
            {matches.length
              ? `${Math.min(limit, matches.length)} de ${matches.length} mercados${
                  search.trim() ? " encontrados" : " disponíveis"
                }`
              : "Nenhum mercado corresponde à busca."}
          </p>
          <div
            className="max-h-56 overflow-y-auto overscroll-contain rounded-xl border"
            style={{ borderColor: pal.border }}
          >
            {expanded &&
              visible.map((market) => (
                <label
                  key={market}
                  className="flex min-h-12 cursor-pointer items-center gap-3 border-b px-3 py-2.5 last:border-b-0"
                  style={{
                    background: selectedMarkets.includes(market)
                      ? pal.greenMuted
                      : pal.card,
                    borderColor: pal.divider,
                    color: pal.textPrimary,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedMarkets.includes(market)}
                    onChange={() => onToggleMarket(market)}
                    className="h-4 w-4 shrink-0 accent-[#3d6648]"
                  />
                  <span className="min-w-0 break-words text-xs font-medium">
                    {market}
                  </span>
                </label>
              ))}
          </div>
          {matches.length > limit && (
            <button
              type="button"
              onClick={() => setLimit((previous) => previous + PAGE_SIZE)}
              className="min-h-11 w-full rounded-xl border text-xs font-semibold"
              style={{ borderColor: pal.border, color: pal.green }}
            >
              Mostrar mais {Math.min(PAGE_SIZE, matches.length - limit)}
            </button>
          )}
        </div>
      </div>
    </details>
  )
}
