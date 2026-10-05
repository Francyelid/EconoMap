import { createPurchaseHistoryStyles, historyClasses } from "./PurchaseHistorySheet.styles"
import type { PurchaseHistoryPalette } from "./PurchaseHistorySheet.styles"
import { useState } from "react"
import { TODAY_ITEMS } from "@/mocks/TODAY_ITEMS"

const ALL_PURCHASES = [
  {
    date: "23/08/2026", label: "Hoje",
    market: "Feira Livre Central",
    total: 87.40, items: 6,
    records: TODAY_ITEMS,
  },
  {
    date: "18/08/2026", label: "18 de agosto",
    market: "Supermercado Bom Preço",
    total: 42.10, items: 4,
    records: [
      { time: "14:20", product: "Macarrão espaguete", market: "Bom Preço", price: 4.50,  unit: "un" },
      { time: "14:20", product: "Molho de tomate",    market: "Bom Preço", price: 3.80,  unit: "un" },
      { time: "14:20", product: "Azeite extra virgem",market: "Bom Preço", price: 32.50, unit: "un" },
      { time: "14:20", product: "Pão de forma",       market: "Bom Preço", price: 8.50,  unit: "un" },
    ],
  },
  {
    date: "15/08/2026", label: "15 de agosto",
    market: "Atacadão Sul",
    total: 215.60, items: 8,
    records: [
      { time: "10:05", product: "Arroz 5kg",          market: "Atacadão", price: 25.80, unit: "un" },
      { time: "10:05", product: "Feijão 1kg",         market: "Atacadão", price: 7.50,  unit: "un" },
      { time: "10:05", product: "Frango inteiro",     market: "Atacadão", price: 38.90, unit: "kg" },
      { time: "10:05", product: "Café torrado 500g",  market: "Atacadão", price: 18.90, unit: "un" },
      { time: "10:05", product: "Leite em pó 400g",   market: "Atacadão", price: 29.80, unit: "un" },
      { time: "10:05", product: "Açúcar refinado 2kg",market: "Atacadão", price: 11.90, unit: "un" },
      { time: "10:05", product: "Óleo de soja 900ml", market: "Atacadão", price: 8.70,  unit: "un" },
      { time: "10:05", product: "Sal refinado 1kg",   market: "Atacadão", price: 2.90,  unit: "un" },
    ],
  },
  {
    date: "10/08/2026", label: "10 de agosto",
    market: "Hortifruti Verde Vida",
    total: 31.20, items: 5,
    records: [
      { time: "08:45", product: "Maçã fuji",    market: "Hortifruti", price: 7.90,  unit: "kg" },
      { time: "08:45", product: "Laranja-pera", market: "Hortifruti", price: 4.50,  unit: "kg" },
      { time: "08:45", product: "Alface",       market: "Hortifruti", price: 2.50,  unit: "un" },
      { time: "08:45", product: "Beterraba",    market: "Hortifruti", price: 5.80,  unit: "kg" },
      { time: "08:45", product: "Cenoura",      market: "Hortifruti", price: 3.90,  unit: "kg" },
    ],
  },
]

export default function PurchaseHistorySheet({ onClose, expandedDay, setExpandedDay, palette: pal }: {
  palette: PurchaseHistoryPalette
  onClose: () => void
  expandedDay: string | null
  setExpandedDay: (d: string | null) => void
}) {
  const styles = createPurchaseHistoryStyles(pal)
  const [histSearch, setHistSearch] = useState("")
  const [histMkt, setHistMkt] = useState("Todos")
  const [histMonth, setHistMonth] = useState("Todos")
  const [compareMode, setCompareMode] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const allMkts = ["Todos", ...Array.from(new Set(ALL_PURCHASES.map(d => d.market)))]
  const allMonths = ["Todos", "Agosto", "Julho", "Junho"]

  const filtered = ALL_PURCHASES.filter(day => {
    if (histMkt !== "Todos" && day.market !== histMkt) return false
    if (histMonth !== "Todos" && !day.date.includes(histMonth === "Agosto" ? "/08/" : histMonth === "Julho" ? "/07/" : "/06/")) return false
    if (histSearch) {
      const q = histSearch.toLowerCase()
      const matchDay = day.market.toLowerCase().includes(q) || day.label.toLowerCase().includes(q)
      const matchRec = day.records.some(r => r.product.toLowerCase().includes(q))
      if (!matchDay && !matchRec) return false
    }
    return true
  })

  const toggleSelect = (key: string) =>
    setSelected(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key])

  const compareTotal = selected.reduce((sum, key) => {
    const [di, ri] = key.split("-").map(Number)
    return sum + (ALL_PURCHASES[di]?.records[ri]?.price ?? 0)
  }, 0)

  return (
    <div
      className={historyClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={historyClasses.sheet}
        style={styles.sheet}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className={historyClasses.handleContainer}>
          <div className={historyClasses.handle} style={styles.handle}/>
        </div>

        {/* Header */}
        <div
          className={historyClasses.header}
          style={styles.header}
        >
          <button onClick={onClose} className={historyClasses.closeButton} style={styles.closeButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
          </button>
          <div className={historyClasses.headerContent}>
            <h2 className={historyClasses.title} style={styles.title}>Histórico de Compras</h2>
            <p className={historyClasses.caption} style={styles.headerCaption}>{ALL_PURCHASES.reduce((s, d) => s + d.items, 0)} itens · {ALL_PURCHASES.length} dias</p>
          </div>
          <button
            onClick={() => { setCompareMode(m => !m); setSelected([]) }}
            className={historyClasses.compareButton}
            style={styles.compareButton(compareMode)}
          >
            🧮 Comparar
          </button>
        </div>

        {/* Filters */}
        <div className={historyClasses.filters} style={styles.filters}>
          <div className={historyClasses.searchContainer} style={styles.searchContainer}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={pal.textSecondary} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className={historyClasses.searchInput}
              style={styles.primaryText}
              placeholder="Buscar produto ou mercado…"
              value={histSearch}
              onChange={e => setHistSearch(e.target.value)}
            />
            {histSearch && <button onClick={() => setHistSearch("")} className={historyClasses.clearButton} style={styles.mutedText}>✕</button>}
          </div>
          <div className={historyClasses.filterRow}>
            <select className={historyClasses.select} style={styles.select}
              value={histMkt} onChange={e => setHistMkt(e.target.value)}>
              {allMkts.map(m => <option key={m}>{m}</option>)}
            </select>
            <select className={historyClasses.select} style={styles.select}
              value={histMonth} onChange={e => setHistMonth(e.target.value)}>
              {allMonths.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Days accordion */}
        <div className={historyClasses.daysList}>
          {filtered.length === 0 && (
            <div className={historyClasses.emptyState} style={styles.secondaryText}>
              <p className={historyClasses.emptyIcon}>🔍</p>
              <p className={historyClasses.emptyMessage}>Nenhum registro encontrado</p>
            </div>
          )}
          {filtered.map((day, di) => {
            const globalDi = ALL_PURCHASES.indexOf(day)
            const isOpen = expandedDay === day.date
            return (
              <div key={day.date} className={historyClasses.dayCard} style={styles.dayCard}>
                <button
                  onClick={() => setExpandedDay(isOpen ? null : day.date)}
                  className={historyClasses.dayButton}
                >
                  <div className={historyClasses.dayIcon} style={styles.dayIcon}>🛒</div>
                  <div className={historyClasses.details}>
                    <p className={historyClasses.dayTitle} style={styles.primaryText}>{day.label}</p>
                    <p className={historyClasses.dayMetadata} style={styles.secondaryText}>{day.market} · {day.items} itens</p>
                  </div>
                  <div className={historyClasses.daySummary}>
                    <p className={historyClasses.dayTotal} style={styles.accentText}>R$&nbsp;{day.total.toFixed(2)}</p>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={pal.textMuted} strokeWidth="2.5" strokeLinecap="round"
                      style={styles.chevron(isOpen)}>
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div style={styles.records}>
                    {/* Compact product chips grid */}
                    <div className={historyClasses.recordsList}>
                      {day.records.map((rec, ri) => {
                        const key = `${globalDi}-${ri}`
                        const isSel = selected.includes(key)
                        return (
                          <button
                            key={ri}
                            onClick={() => compareMode && toggleSelect(key)}
                            className={historyClasses.recordButton}
                            style={styles.recordButton(isSel, compareMode)}
                          >
                            {compareMode && (
                              <div className={historyClasses.checkbox} style={styles.checkbox(isSel)}>
                                {isSel && <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,5.5 4,8 8.5,2"/></svg>}
                              </div>
                            )}
                            <div className={historyClasses.details}>
                              <p className={historyClasses.product} style={styles.primaryText}>{rec.product}</p>
                              <p className={historyClasses.caption} style={styles.secondaryText}>{rec.time} · {rec.market}</p>
                            </div>
                            <p className={historyClasses.recordPrice} style={styles.recordPrice(isSel)}>
                              R$&nbsp;{rec.price.toFixed(2)}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

