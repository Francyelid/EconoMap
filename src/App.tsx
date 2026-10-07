import MapScreen from "@/screen/Map/MapScreen"
import HomeScreen from "@/screen/Home/HomeScreen"
import { DarkCtx, dmPalette, useDark } from "@/theme"
import { useState } from "react"
import type { ReactNode } from "react"
import { MONTHS } from "@/mocks/MONTHS"
import { PRICE_DATA } from "@/mocks/PRICE_DATA"
import { SEASONAL_HINTS } from "@/mocks/SEASONAL_HINTS"
import { SHOPPING_INIT } from "@/mocks/SHOPPING_INIT"
import { STOCK_INIT } from "@/mocks/STOCK_INIT"
import type { StockItem } from "@/interfaces/StockItem"
import type { ShoppingItem } from "@/interfaces/ShoppingItem"

import logoImg from "@/imports/Logo.png"
import logoCompleto from "@/imports/Logo_Completo.png"

// ─── TYPES ────────────────────────────────────────────────────────────────────

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────

// ─── UTILS ─────────────────────────────────────────────────────────────────────

const TODAY = new Date("2026-08-23")

function daysUntil(dateStr: string) {
  return Math.floor((new Date(dateStr).getTime() - TODAY.getTime()) / 86400000)
}

function expiryStatus(dateStr: string): "expired" | "warning" | "ok" {
  const d = daysUntil(dateStr)
  if (d < 0) return "expired"
  if (d <= 7) return "warning"
  return "ok"
}

function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

const CAT_COLOR: Record<string, string> = {
  Grãos: "#f59e0b",
  Hortifruti: "#22c55e",
  Carnes: "#ef4444",
  Laticínios: "#3b82f6",
  Padaria: "#f97316",
  Outros: "#8b5cf6",
}

const CAT_EMOJI: Record<string, string> = {
  Grãos: "🌾",
  Condimentos: "🧴",
  Massas: "🍝",
  Laticínios: "🥛",
  Enlatados: "🥫",
  Bebidas: "☕",
  Outros: "📦",
}

// ─── SVG ICONS ─────────────────────────────────────────────────────────────────

function IcoHome({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill={on ? "#d4e6d9" : "none"}/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )
}

function IcoMap({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" fill={on ? "#d4e6d9" : "none"}/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  )
}

function IcoChart({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={on ? "#d4e6d9" : "none"}/>
      <line x1="7" y1="17" x2="7" y2="11"/>
      <line x1="12" y1="17" x2="12" y2="5"/>
      <line x1="17" y1="17" x2="17" y2="8"/>
    </svg>
  )
}

function IcoList({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={on ? "#d4e6d9" : "none"}/>
      <line x1="8" y1="8" x2="17" y2="8"/>
      <line x1="8" y1="12" x2="17" y2="12"/>
      <line x1="8" y1="16" x2="13" y2="16"/>
      <circle cx="5.5" cy="8" r="1" fill={c} stroke="none"/>
      <circle cx="5.5" cy="12" r="1" fill={c} stroke="none"/>
      <circle cx="5.5" cy="16" r="1" fill={c} stroke="none"/>
    </svg>
  )
}

function IcoBox({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill={on ? "#d4e6d9" : "none"}/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function IcoSettings({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill={on ? "#d4e6d9" : "none"}/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )
}

// ─── PRICE LINE CHART ──────────────────────────────────────────────────────────

const CHART_COLORS = ["#16a34a", "#f97316", "#0ea5e9", "#8b5cf6"]

function PriceChart({ product, markets, period = "all" }: { product: string; markets: string[]; period?: "7d" | "30d" | "90d" | "all" }) {
  const data = PRICE_DATA[product]
  if (!data || markets.length === 0) return null

  const slice = (arr: number[]) => {
    if (period === "all") return arr
    const n = period === "7d" ? 7 : period === "30d" ? 30 : 90
    return arr.slice(-n)
  }

  const slicedMonths = period === "all" ? MONTHS : MONTHS.slice(-( period === "7d" ? 7 : period === "30d" ? 30 : 90))
  const vals = markets.flatMap(m => slice(data[m] ?? []))
  const lo = Math.min(...vals) * 0.92
  const hi = Math.max(...vals) * 1.06
  const W = 300, H = 130, PL = 38, PR = 8, PT = 8, PB = 22

  const pts_len = slicedMonths.length
  const sx = (i: number) => PL + (i / Math.max(pts_len - 1, 1)) * (W - PL - PR)
  const sy = (v: number) => PT + (1 - (v - lo) / (hi - lo || 1)) * (H - PT - PB)

  const gridVals = [lo, lo + (hi - lo) * 0.33, lo + (hi - lo) * 0.67, hi]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      {gridVals.map((v, i) => {
        const y = sy(v)
        return (
          <g key={i}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#f1f5f9" strokeWidth="1"/>
            <text x={PL - 4} y={y + 3.5} textAnchor="end" fontSize="8.5" fill="#94a3b8" fontFamily="DM Mono, monospace">
              {v.toFixed(0)}
            </text>
          </g>
        )
      })}
      {slicedMonths.map((m, i) => (
        <text key={m} x={sx(i)} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#94a3b8">
          {m}
        </text>
      ))}
      {markets.map((mkt, mi) => {
        const raw = data[mkt]
        if (!raw) return null
        const series = slice(raw)
        const pts = series.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")
        const col = CHART_COLORS[mi % CHART_COLORS.length]
        return (
          <g key={mkt}>
            <polyline points={pts} fill="none" stroke={col} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
            {series.map((v, i) => (
              <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill={col} stroke="white" strokeWidth="1.5"/>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

// ─── SCREEN: HOME ──────────────────────────────────────────────────────────────

// ─── SCREEN: PRICES ────────────────────────────────────────────────────────────

function PricesScreen() {
  const dark = useDark(); const pal = dmPalette(dark)
  const products = Object.keys(PRICE_DATA)
  const allMktNames = ["Todos", ...Array.from(new Set(Object.values(PRICE_DATA).flatMap(d => Object.keys(d))))]
  const [selProduct, setSelProduct] = useState(products[0])
  const productData = PRICE_DATA[selProduct]
  const allMarkets = Object.keys(productData)
  const [selMarkets, setSelMarkets] = useState(allMarkets.slice(0, 3))
  const [search, setSearch] = useState("")
  const [mktFilter, setMktFilter] = useState("Todos")
  const [maxPriceFilter, setMaxPriceFilter] = useState("")
  const [periodFilter, setPeriodFilter] = useState<"7d" | "30d" | "90d" | "all" | "custom">("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showCalc, setShowCalc] = useState(false)
  const [calcSelected, setCalcSelected] = useState<string[]>([])
  const [calcMkt, setCalcMkt] = useState(allMktNames[1] ?? allMktNames[0])

  const toggle = (m: string) => {
    setSelMarkets(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const periodSlice = (arr: number[]) => {
    if (periodFilter === "all" || periodFilter === "custom") return arr
    const n = periodFilter === "7d" ? 7 : periodFilter === "30d" ? 30 : 90
    return arr.slice(-n)
  }

  const latest = selMarkets
    .filter(m => productData[m])
    .map(m => ({ market: m, price: periodSlice(productData[m]).at(-1) ?? 0 }))

  const cheapest = latest.length > 0 ? latest.reduce((a, b) => a.price < b.price ? a : b) : null
  const priciest = latest.length > 0 ? latest.reduce((a, b) => a.price > b.price ? a : b) : null

  const filteredProducts = products.filter(p => {
    if (search && !p.toLowerCase().includes(search.toLowerCase())) return false
    if (mktFilter !== "Todos" && !Object.keys(PRICE_DATA[p]).includes(mktFilter)) return false
    if (maxPriceFilter) {
      const last = Object.values(PRICE_DATA[p]).map(v => v.at(-1) ?? 0)
      if (last.every(v => v > parseFloat(maxPriceFilter))) return false
    }
    return true
  })

  return (
    <div className="px-4 py-6 space-y-5" style={{ background: pal.bg, minHeight: "100%" }}>
      <div>
        <h1 className="text-xl font-bold" style={{ color: pal.textPrimary }}>Histórico de Preços</h1>
        <p className="text-xs mt-0.5" style={{ color: pal.textSecondary }}>Evolução por produto e mercado</p>
      </div>

      {/* Search + filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: pal.inputBg, border: `1px solid ${pal.border}` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pal.textSecondary} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: pal.textPrimary }}
            placeholder="Buscar produto…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch("")} className="text-xs" style={{ color: pal.textMuted }}>✕</button>}
        </div>
        <div className="flex gap-2">
          <select
            className="flex-1 text-xs font-semibold rounded-xl px-2 py-2 outline-none"
            style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
            value={mktFilter}
            onChange={e => setMktFilter(e.target.value)}
          >
            {allMktNames.map(m => <option key={m}>{m}</option>)}
          </select>
          <div className="flex items-center gap-1 rounded-xl px-3 py-2" style={{ background: pal.inputBg, border: `1px solid ${pal.border}` }}>
            <span className="text-[10px] font-bold" style={{ color: pal.textSecondary }}>Até R$</span>
            <input
              type="number"
              className="w-14 bg-transparent text-xs font-mono font-bold outline-none"
              style={{ color: pal.textPrimary }}
              placeholder="—"
              value={maxPriceFilter}
              onChange={e => setMaxPriceFilter(e.target.value)}
            />
          </div>
        </div>
        {/* Period filter */}
        <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${pal.border}` }}>
          {([
            { k: "all",    l: "Tudo"  },
            { k: "custom", l: "📅 Data específica" },
          ] as const).map(({ k, l }) => (
            <button
              key={k}
              onClick={() => setPeriodFilter(k)}
              className="flex-1 py-2 text-[11px] font-bold transition-all"
              style={{
                background: periodFilter === k ? "#3d6648" : pal.inputBg,
                color: periodFilter === k ? "#fff" : pal.textSecondary,
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {/* Custom date range */}
        {periodFilter === "custom" && (
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>De</label>
              <input
                type="date"
                className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Até</label>
              <input
                type="date"
                className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                value={dateTo}
                min={dateFrom}
                onChange={e => setDateTo(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Calcular compras button */}
      <button
        onClick={() => { setCalcSelected([]); setShowCalc(true) }}
        className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        style={{ background: "linear-gradient(135deg, #3d6648, #4e7f5a)", color: "#fff", boxShadow: "0 4px 14px #3d664840" }}
      >
        🧮 Calcular Compras
      </button>

      {/* Product pills */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Produto</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filteredProducts.map(p => (
            <button
              key={p}
              onClick={() => {
                setSelProduct(p)
                setSelMarkets(Object.keys(PRICE_DATA[p]).slice(0, 3))
              }}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${selProduct === p ? "bg-green-600 text-white border-green-600" : "bg-white text-slate-600 border-slate-200"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Market toggles */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mercados</p>
        <div className="flex gap-2 flex-wrap">
          {allMarkets.map((m, i) => {
            const active = selMarkets.includes(m)
            const col = CHART_COLORS[i % CHART_COLORS.length]
            return (
              <button
                key={m}
                onClick={() => toggle(m)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all"
                style={{
                  borderColor: active ? col : "#e2e8f0",
                  background: active ? col + "22" : "white",
                  color: active ? col : "#94a3b8",
                }}
              >
                {m}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chart card */}
      <div className="rounded-2xl p-4 shadow-sm" style={{ background: pal.card, border: `1px solid ${pal.border}` }}>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-sm" style={{ color: pal.textPrimary }}>{selProduct}</p>
          <p className="text-[10px] font-mono" style={{ color: pal.textSecondary }}>Jan – Ago 2026</p>
        </div>
        {selMarkets.length > 0
          ? <PriceChart product={selProduct} markets={selMarkets} period={periodFilter === "custom" ? "all" : periodFilter}/>
          : <div className="h-28 flex items-center justify-center text-xs" style={{ color: pal.textSecondary }}>Selecione ao menos um mercado</div>
        }
        <div className="flex gap-4 mt-3 flex-wrap">
          {selMarkets.map((m, i) => (
            <div key={m} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}/>
              <span className="text-[10px]" style={{ color: pal.textSecondary }}>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      {cheapest && priciest && cheapest.market !== priciest.market && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-2xl p-3 border border-green-100">
            <p className="text-[10px] text-green-700 font-semibold">Mais barato agora</p>
            <p className="font-bold text-green-900 text-sm mt-1 truncate">{cheapest.market}</p>
            <p className="font-mono text-lg font-bold text-green-700">R$ {cheapest.price.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
            <p className="text-[10px] text-orange-700 font-semibold">Mais caro agora</p>
            <p className="font-bold text-orange-900 text-sm mt-1 truncate">{priciest.market}</p>
            <p className="font-mono text-lg font-bold text-orange-600">R$ {priciest.price.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Seasonal insight */}
      <div className="rounded-2xl p-4" style={{ background: pal.cardAlt, border: `1px solid ${pal.border}` }}>
        <p className="text-xs font-bold mb-1.5" style={{ color: pal.textPrimary }}>💡 Insight Sazonal</p>
        <p className="text-xs leading-relaxed" style={{ color: pal.textSecondary }}>{SEASONAL_HINTS[selProduct]}</p>
      </div>

      {/* ── Calcular Compras modal ── */}
      {showCalc && (() => {
        // Basket time series: sum selected products' prices for calcMkt at each month
        const basketSeries: number[] = MONTHS.map((_, mi) =>
          calcSelected.reduce((sum, p) => sum + (PRICE_DATA[p]?.[calcMkt]?.[mi] ?? 0), 0)
        )
        const firstVal = basketSeries[0] || 0
        const lastVal = basketSeries.at(-1) || 0
        const variation = firstVal > 0 ? ((lastVal - firstVal) / firstVal) * 100 : 0
        const maxVal = Math.max(...basketSeries) * 1.06 || 1
        const minVal = Math.min(...basketSeries) * 0.92 || 0

        // SVG basket chart
        const W = 300, H = 110, PL = 38, PR = 8, PT = 8, PB = 22
        const sx = (i: number) => PL + (i / (MONTHS.length - 1)) * (W - PL - PR)
        const sy = (v: number) => PT + (1 - (v - minVal) / (maxVal - minVal || 1)) * (H - PT - PB)
        const pts = basketSeries.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")
        const areaPath = `M${sx(0)},${sy(basketSeries[0])} ` +
          basketSeries.slice(1).map((v, i) => `L${sx(i + 1)},${sy(v)}`).join(" ") +
          ` L${sx(MONTHS.length - 1)},${H - PB} L${sx(0)},${H - PB} Z`

        return (
          <div
            className="absolute inset-0 flex items-end"
            style={{ background: "rgba(44,36,22,0.45)", backdropFilter: "blur(3px)", zIndex: 50 }}
            onClick={() => setShowCalc(false)}
          >
            <div
              className="w-full rounded-t-3xl flex flex-col"
              style={{ background: pal.bg, height: "88%" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ background: pal.border }}/>
              </div>

              {/* Header */}
              <div
                className="px-5 pt-2 pb-3 flex-shrink-0"
                style={{ background: "linear-gradient(150deg,#2c4e37,#3d6648)", borderRadius: "20px 20px 0 0" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-bold text-base text-white" style={{ fontFamily: "Lora, serif" }}>Calcular Compras</h2>
                  <button onClick={() => setShowCalc(false)} className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>✕</button>
                </div>
                <p className="text-[10px]" style={{ color: "#a8c9b0" }}>Selecione produtos e um mercado para ver a variação da cesta ao longo do tempo</p>
                {/* Market selector */}
                <select
                  className="w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none mt-3"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
                  value={calcMkt}
                  onChange={e => setCalcMkt(e.target.value)}
                >
                  {allMktNames.filter(m => m !== "Todos").map(m => <option key={m} style={{ color: "#2c2416", background: "#fff" }}>{m}</option>)}
                </select>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Basket chart — shown when ≥1 product selected */}
                {calcSelected.length > 0 && (
                  <div className="mx-4 mt-4 rounded-2xl p-4" style={{ background: pal.card, border: `1px solid ${pal.border}` }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold" style={{ color: pal.textPrimary }}>Cesta de {calcSelected.length} produto{calcSelected.length !== 1 ? "s" : ""}</p>
                        <p className="text-[10px]" style={{ color: pal.textSecondary }}>{calcMkt}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-lg leading-tight" style={{ color: pal.textPrimary }}>R$ {lastVal.toFixed(2)}</p>
                        <p className="text-[10px] font-bold" style={{ color: variation >= 0 ? "#c04830" : "#3d6648" }}>
                          {variation >= 0 ? "▲" : "▼"} {Math.abs(variation).toFixed(1)}% vs Jan
                        </p>
                      </div>
                    </div>
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
                      <defs>
                        <linearGradient id="basketGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3d6648" stopOpacity="0.18"/>
                          <stop offset="100%" stopColor="#3d6648" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {[minVal, minVal + (maxVal - minVal) * 0.5, maxVal].map((v, i) => (
                        <g key={i}>
                          <line x1={PL} y1={sy(v)} x2={W - PR} y2={sy(v)} stroke="#f1f5f9" strokeWidth="1"/>
                          <text x={PL - 4} y={sy(v) + 3.5} textAnchor="end" fontSize="8" fill="#94a3b8" fontFamily="DM Mono, monospace">{v.toFixed(0)}</text>
                        </g>
                      ))}
                      {MONTHS.map((m, i) => (
                        <text key={m} x={sx(i)} y={H - 4} textAnchor="middle" fontSize="8" fill="#94a3b8">{m}</text>
                      ))}
                      <path d={areaPath} fill="url(#basketGrad)"/>
                      <polyline points={pts} fill="none" stroke="#3d6648" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
                      {basketSeries.map((v, i) => (
                        <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill="#3d6648" stroke="white" strokeWidth="1.5"/>
                      ))}
                    </svg>
                  </div>
                )}

                {/* Product list */}
                <div className="px-4 pt-3 pb-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: pal.textSecondary }}>Produtos da cesta</p>
                  {products.map(p => {
                    const checked = calcSelected.includes(p)
                    const price = PRICE_DATA[p]?.[calcMkt]?.at(-1)
                    const first = PRICE_DATA[p]?.[calcMkt]?.[0]
                    const varP = first && price ? ((price - first) / first) * 100 : null
                    return (
                      <button
                        key={p}
                        onClick={() => setCalcSelected(prev => checked ? prev.filter(x => x !== p) : [...prev, p])}
                        className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all"
                        style={{ background: checked ? pal.greenMuted : pal.card, border: `1px solid ${checked ? "#3d6648" : pal.border}` }}
                      >
                        <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all" style={{ background: checked ? "#3d6648" : pal.border }}>
                          {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,5.5 4,8 8.5,2"/></svg>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm" style={{ color: pal.textPrimary }}>{p}</p>
                          {price != null
                            ? <p className="text-[10px] mt-0.5" style={{ color: pal.textSecondary }}>
                                Atual: <span className="font-mono font-bold" style={{ color: pal.textPrimary }}>R$ {price.toFixed(2)}</span>
                                {varP != null && <span style={{ color: varP >= 0 ? "#c04830" : "#3d6648" }}> · {varP >= 0 ? "▲" : "▼"}{Math.abs(varP).toFixed(1)}%</span>}
                              </p>
                            : <p className="text-[10px] mt-0.5" style={{ color: pal.textMuted }}>Sem dados para este mercado</p>
                          }
                        </div>
                        {price != null && checked && (
                          <p className="font-mono font-bold text-sm flex-shrink-0" style={{ color: "#3d6648" }}>R$ {price.toFixed(2)}</p>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Total bar */}
              <div className="px-5 py-3.5 flex-shrink-0 flex items-center justify-between" style={{ background: "#2c2416" }}>
                <div>
                  <p className="text-[10px] font-semibold" style={{ color: "#9c8e7e" }}>
                    {calcSelected.length > 0 ? `${calcSelected.length} produto${calcSelected.length !== 1 ? "s" : ""} · ${calcMkt.split(" ")[0]}` : "Selecione produtos"}
                  </p>
                  <p className="text-white font-bold text-xl font-mono leading-tight">
                    {calcSelected.length > 0 ? `R$ ${lastVal.toFixed(2)}` : "—"}
                  </p>
                </div>
                {calcSelected.length > 0 && (
                  <div className="text-right">
                    <p className="text-[10px]" style={{ color: "#9c8e7e" }}>Variação (Jan→Ago)</p>
                    <p className="font-bold text-sm" style={{ color: variation >= 0 ? "#e8a530" : "#4cb5b0" }}>
                      {variation >= 0 ? "▲" : "▼"} {Math.abs(variation).toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

// ─── SCREEN: SHOPPING LIST ─────────────────────────────────────────────────────

const LIST_MARKETS = ["Atacadão Sul", "Feira Livre Central", "Supermercado Bom Preço", "Mercadinho do Bairro", "Hortifruti Verde Vida"]

function ListScreen() {
  const dark = useDark(); const pal = dmPalette(dark)
  const [items, setItems] = useState<ShoppingItem[]>(SHOPPING_INIT)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addName, setAddName] = useState("")
  const [addMarket, setAddMarket] = useState("")
  const [addMarketCustom, setAddMarketCustom] = useState("")
  const [addQty, setAddQty] = useState("1")
  const [addUnit, setAddUnit] = useState("un")
  const [listView, setListView] = useState<"all" | "byMarket">("all")
  const [mktPicker, setMktPicker] = useState<string | null>(null)

  const toggle = (id: string) => setItems(p => p.map(i => i.id === id ? { ...i, checked: !i.checked } : i))
  const remove = (id: string) => setItems(p => p.filter(i => i.id !== id))
  const setMarket = (id: string, mkt: string | undefined) =>
    setItems(p => p.map(i => i.id === id ? { ...i, market: mkt } : i))

  const addItem = () => {
    const name = addName.trim()
    if (!name) return
    const market = addMarket === "__custom__" ? (addMarketCustom.trim() || undefined) : (addMarket || undefined)
    setItems(p => [...p, { id: Date.now().toString(), name, qty: addQty, unit: addUnit, price: null, checked: false, category: "Outros", market }])
    setAddName(""); setAddMarket(""); setAddMarketCustom(""); setAddQty("1"); setAddUnit("un")
    setShowAddModal(false)
  }

  const unchecked = items.filter(i => !i.checked)
  const checked = items.filter(i => i.checked)
  const total = unchecked.reduce((s, i) => s + (i.price ?? 0) * parseFloat(i.qty), 0)
  const progress = items.length > 0 ? (checked.length / items.length) * 100 : 0

  // Group unchecked by market
  const byMarket: Record<string, ShoppingItem[]> = {}
  const noMarket: ShoppingItem[] = []
  unchecked.forEach(item => {
    if (item.market) {
      if (!byMarket[item.market]) byMarket[item.market] = []
      byMarket[item.market].push(item)
    } else {
      noMarket.push(item)
    }
  })

  function ItemRow({ item }: { item: ShoppingItem }) {
    return (
      <div className="rounded-xl px-3 py-2.5 shadow-sm flex items-center gap-2" style={{ background: pal.card, border: `1px solid ${pal.border}` }}>
        <button
          onClick={() => toggle(item.id)}
          className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
          style={{ background: item.checked ? "#3d6648" : "transparent", borderColor: item.checked ? "#3d6648" : pal.border }}
        >
          {item.checked && <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,5.5 4,8 8.5,2"/></svg>}
        </button>
        <div className="w-1.5 h-7 rounded-full flex-shrink-0" style={{ background: CAT_COLOR[item.category] ?? "#8b5cf6" }}/>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ color: item.checked ? pal.textSecondary : pal.textPrimary, textDecoration: item.checked ? "line-through" : "none" }}>{item.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px]" style={{ color: pal.textSecondary }}>{item.qty} {item.unit}</span>
            {item.price && <span className="text-[10px]" style={{ color: pal.textSecondary }}>· R$ {item.price.toFixed(2)}</span>}
            {/* Market badge */}
            <button
              onClick={() => setMktPicker(mktPicker === item.id ? null : item.id)}
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md transition-all"
              style={{ background: item.market ? "#d4e6d9" : "#f0ebe4", color: item.market ? "#3d6648" : "#9c8e7e" }}
            >
              {item.market ? `🏪 ${item.market.split(" ")[0]}…` : "+ mercado"}
            </button>
          </div>
          {/* Inline market picker */}
          {mktPicker === item.id && (
            <div className="mt-2 flex flex-wrap gap-1">
              <button onClick={() => { setMarket(item.id, undefined); setMktPicker(null) }}
                className="text-[10px] px-2 py-1 rounded-lg font-semibold" style={{ background: "#f5ebe8", color: "#c04830" }}>
                Remover
              </button>
              {LIST_MARKETS.map(m => (
                <button key={m} onClick={() => { setMarket(item.id, m); setMktPicker(null) }}
                  className="text-[10px] px-2 py-1 rounded-lg font-semibold transition-all"
                  style={{ background: item.market === m ? "#3d6648" : "#ede8df", color: item.market === m ? "#fff" : "#5a4e3e" }}>
                  {m.split(" ")[0]}
                </button>
              ))}
            </div>
          )}
        </div>
        {item.price != null && !item.checked && (
          <p className="text-xs font-mono font-bold text-slate-700 flex-shrink-0">R$ {(item.price * parseFloat(item.qty)).toFixed(2)}</p>
        )}
        <button onClick={() => remove(item.id)} className="text-slate-200 hover:text-red-400 text-xs transition-colors flex-shrink-0">✕</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 flex-shrink-0" style={{ background: pal.headerBg, borderBottom: `1px solid ${pal.border}` }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Lista de Compras</h1>
            <p className="text-xs mt-0.5" style={{ color: pal.textSecondary }}>{unchecked.length} itens restantes</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="w-9 h-9 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm" style={{ background: "#3d6648" }}>
            +
          </button>
        </div>

        {/* Budget bar */}
        <div className="rounded-2xl p-3.5 text-white" style={{ background: "linear-gradient(135deg, #3d6648, #4e7f5a)" }}>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-75">Estimativa total</p>
              <p className="text-xl font-bold font-mono mt-0.5">R$ {total.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-75">Concluídos</p>
              <p className="text-sm font-bold">{checked.length}/{items.length}</p>
            </div>
          </div>
          <div className="mt-2.5 rounded-full overflow-hidden h-1.5" style={{ background: "rgba(255,255,255,0.2)" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "#a8c9b0" }}/>
          </div>
        </div>

        {/* View toggle + Add input */}
        <div className="flex gap-2 mt-3">
          <div className="flex flex-1 rounded-xl overflow-hidden" style={{ border: "1px solid #e0d9cd" }}>
            {(["all", "byMarket"] as const).map(v => (
              <button key={v} onClick={() => setListView(v)}
                className="flex-1 py-2 text-xs font-bold transition-all"
                style={{ background: listView === v ? "#3d6648" : "#f8f5f1", color: listView === v ? "#fff" : "#9c8e7e" }}>
                {v === "all" ? "📋 Todos" : "🏪 Por Mercado"}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ background: pal.bg }}>
        {listView === "all" && (
          <div className="space-y-2">
            {unchecked.map(item => <ItemRow key={item.id} item={item}/>)}
            {checked.length > 0 && (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest pt-2" style={{ color: pal.textSecondary }}>Concluídos</p>
                {checked.map(item => <ItemRow key={item.id} item={item}/>)}
              </>
            )}
            {items.length === 0 && (
              <div className="text-center py-16" style={{ color: pal.textSecondary }}>
                <p className="text-5xl mb-3">🛒</p>
                <p className="font-semibold text-sm">Lista vazia</p>
                <p className="text-xs mt-1">Toque em + para adicionar itens</p>
              </div>
            )}
          </div>
        )}

        {listView === "byMarket" && (
          <div className="space-y-3">
            {Object.entries(byMarket).map(([mkt, mktItems]) => (
              <div key={mkt}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">🏪</span>
                  <p className="text-xs font-bold" style={{ color: "#3d6648" }}>{mkt}</p>
                  <div className="flex-1 h-px" style={{ background: "#c8bfb2" }}/>
                  <p className="text-[10px] font-mono font-bold" style={{ color: "#3d6648" }}>
                    R$ {mktItems.reduce((s, i) => s + (i.price ?? 0) * parseFloat(i.qty), 0).toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1.5">
                  {mktItems.map(item => <ItemRow key={item.id} item={item}/>)}
                </div>
              </div>
            ))}
            {noMarket.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">❓</span>
                  <p className="text-xs font-bold" style={{ color: pal.textSecondary }}>Sem mercado definido</p>
                  <div className="flex-1 h-px" style={{ background: "#c8bfb2" }}/>
                </div>
                <div className="space-y-1.5">
                  {noMarket.map(item => <ItemRow key={item.id} item={item}/>)}
                </div>
              </div>
            )}
            {checked.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest pt-1 mb-2" style={{ color: pal.textSecondary }}>Concluídos</p>
                <div className="space-y-1.5">
                  {checked.map(item => <ItemRow key={item.id} item={item}/>)}
                </div>
              </div>
            )}
            {unchecked.length === 0 && checked.length === 0 && (
              <div className="text-center py-16" style={{ color: pal.textSecondary }}>
                <p className="text-5xl mb-3">🛒</p>
                <p className="font-semibold text-sm">Lista vazia</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Add item modal ── */}
      {showAddModal && (
        <div
          className="absolute inset-0 flex items-end"
          style={{ background: "rgba(44,36,22,0.45)", backdropFilter: "blur(3px)", zIndex: 50 }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full rounded-t-3xl p-6 pb-8 flex flex-col gap-4"
            style={{ background: pal.card }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto" style={{ background: pal.border }}/>
            <h2 className="font-bold text-base" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Adicionar à Lista</h2>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Produto</label>
              <input autoFocus
                className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                placeholder="Ex: Arroz, Tomate, Pão..."
                value={addName}
                onChange={e => setAddName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem()}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Qtd</label>
                <input type="number" min="1"
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                  style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                  value={addQty} onChange={e => setAddQty(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Unidade</label>
                <select className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                  style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                  value={addUnit} onChange={e => setAddUnit(e.target.value)}>
                  {["un", "kg", "g", "L", "ml", "cx", "pct"].map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Mercado</label>
              <select className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                value={addMarket} onChange={e => setAddMarket(e.target.value)}>
                <option value="">Selecione um mercado...</option>
                {LIST_MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                <option value="__custom__">+ Mercado não registrado ainda</option>
              </select>
              {addMarket === "__custom__" && (
                <input
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none mt-2"
                  style={{ background: pal.inputBg, border: "1px solid #e8a530", color: pal.textPrimary }}
                  placeholder="Nome do mercado..."
                  value={addMarketCustom}
                  onChange={e => setAddMarketCustom(e.target.value)}
                />
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
                style={{ background: pal.inputBg, color: pal.textSecondary }}>
                Cancelar
              </button>
              <button onClick={addItem}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white"
                style={{ background: addName.trim() ? "#3d6648" : "#c8bfb2", boxShadow: addName.trim() ? "0 4px 12px #3d664833" : "none" }}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SCREEN: INVENTORY ─────────────────────────────────────────────────────────

const STOCK_MARKETS = ["Atacadão Sul", "Feira Livre Central", "Supermercado Bom Preço", "Mercadinho do Bairro", "Hortifruti Verde Vida"]

function StockScreen() {
  const dark = useDark(); const pal = dmPalette(dark)
  const [items, setItems] = useState<StockItem[]>(STOCK_INIT)
  const [filter, setFilter] = useState<"all" | "warning" | "expired">("all")
  const [deleteTarget, setDeleteTarget] = useState<StockItem | null>(null)
  const [addedToList, setAddedToList] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [addName, setAddName] = useState("")
  const [addMarket, setAddMarket] = useState("")
  const [addMarketCustom, setAddMarketCustom] = useState("")
  const [addQty, setAddQty] = useState("1")
  const [addUnit, setAddUnit] = useState("un")
  const [addExpiry, setAddExpiry] = useState("")

  function handleAddItem() {
    const name = addName.trim()
    if (!name) return
    const market = addMarket === "__custom__" ? addMarketCustom.trim() || "Mercado não registrado" : addMarket || "Mercado não registrado"
    setItems(p => [...p, {
      id: Date.now().toString(), name, qty: addQty, unit: addUnit,
      expiry: addExpiry || "2099-12-31", category: "Outros",
      purchasePrice: 0, market,
    }])
    setAddName(""); setAddMarket(""); setAddMarketCustom(""); setAddQty("1"); setAddUnit("un"); setAddExpiry("")
    setShowAddModal(false)
  }

  const expired = items.filter(i => expiryStatus(i.expiry) === "expired")
  const warning = items.filter(i => expiryStatus(i.expiry) === "warning")
  const ok = items.filter(i => expiryStatus(i.expiry) === "ok")

  const filtered = filter === "all" ? items : filter === "expired" ? expired : warning

  const STATUS = {
    expired: { bg: "bg-red-50", border: "border-red-100", badge: "bg-red-100 text-red-700" },
    warning: { bg: "bg-orange-50", border: "border-orange-100", badge: "bg-orange-100 text-orange-700" },
    ok: { bg: "bg-white", border: "border-slate-100", badge: "bg-green-100 text-green-700" },
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-6 pb-3 flex-shrink-0" style={{ background: pal.headerBg, borderBottom: `1px solid ${pal.border}` }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold" style={{ color: pal.textPrimary }}>Meu Estoque</h1>
            <p className="text-xs mt-0.5" style={{ color: pal.textSecondary }}>{items.length} produtos em casa</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="w-9 h-9 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm" style={{ background: "#3d6648" }}>
            +
          </button>
        </div>

        {/* Summary pills */}
        <div className="flex gap-2">
          <div className="flex-1 rounded-xl p-2.5 border text-center" style={{ background: dark ? "#2d1a1a" : "#fef2f2", borderColor: dark ? "#5c2626" : "#fecaca" }}>
            <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: dark ? "#f87171" : "#ef4444" }}>Vencidos</p>
            <p className="text-xl font-bold" style={{ color: dark ? "#fca5a5" : "#b91c1c" }}>{expired.length}</p>
          </div>
          <div className="flex-1 rounded-xl p-2.5 border text-center" style={{ background: dark ? "#2d2010" : "#fff7ed", borderColor: dark ? "#5c3d10" : "#fed7aa" }}>
            <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: dark ? "#fb923c" : "#f97316" }}>Em breve</p>
            <p className="text-xl font-bold" style={{ color: dark ? "#fdba74" : "#c2410c" }}>{warning.length}</p>
          </div>
          <div className="flex-1 rounded-xl p-2.5 border text-center" style={{ background: dark ? "#0f2a1a" : "#f0fdf4", borderColor: dark ? "#1a4d2e" : "#bbf7d0" }}>
            <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: dark ? "#4ade80" : "#16a34a" }}>Em dia</p>
            <p className="text-xl font-bold" style={{ color: dark ? "#86efac" : "#15803d" }}>{ok.length}</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex rounded-xl p-1 mt-3 gap-1" style={{ background: dark ? "#374151" : "#f1f5f9" }}>
          {([
            { k: "all", l: "Todos" },
            { k: "warning", l: "⚠️ Atenção" },
            { k: "expired", l: "🔴 Vencidos" },
          ] as const).map(({ k, l }) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className="flex-1 py-2 rounded-lg text-[11px] font-bold transition-all"
              style={filter === k
                ? { background: pal.card, color: pal.textPrimary, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }
                : { color: pal.textSecondary }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2" style={{ background: pal.bg }}>
        {filtered.map(item => {
          const st = expiryStatus(item.expiry)
          const days = daysUntil(item.expiry)
          const cardBg = st === "expired"
            ? (dark ? "#2d1a1a" : "#fef2f2")
            : st === "warning"
            ? (dark ? "#2d2010" : "#fff7ed")
            : pal.card
          const cardBorder = st === "expired"
            ? (dark ? "#5c2626" : "#fecaca")
            : st === "warning"
            ? (dark ? "#5c3d10" : "#fed7aa")
            : pal.border
          const badgeBg = st === "expired"
            ? (dark ? "#5c2626" : "#fee2e2")
            : st === "warning"
            ? (dark ? "#5c3d10" : "#ffedd5")
            : (dark ? "#1a4d2e" : "#dcfce7")
          const badgeColor = st === "expired"
            ? (dark ? "#fca5a5" : "#b91c1c")
            : st === "warning"
            ? (dark ? "#fdba74" : "#c2410c")
            : (dark ? "#86efac" : "#15803d")

          return (
            <div key={item.id} className="rounded-2xl p-4 border" style={{ background: cardBg, borderColor: cardBorder }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0 border" style={{ background: pal.card, borderColor: pal.border }}>
                  {CAT_EMOJI[item.category] ?? "📦"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-sm" style={{ color: pal.textPrimary }}>{item.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: pal.textSecondary }}>{item.qty} {item.unit} · {item.market}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: badgeBg, color: badgeColor }}>
                      {st === "expired"
                        ? `Venceu há ${Math.abs(days)}d`
                        : st === "warning"
                        ? `Vence em ${days}d`
                        : "Em dia"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px]" style={{ color: pal.textSecondary }}>📅 {fmtDate(item.expiry)}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-[10px] font-semibold" style={{ color: pal.textPrimary }}>R$ {item.purchasePrice.toFixed(2)}</p>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-all active:scale-90"
                        style={{ background: "#f5ebe8" }}
                        title="Excluir item"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c04830" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: pal.textMuted }}>
            <p className="text-5xl mb-3">✅</p>
            <p className="font-semibold text-sm">Nenhum item aqui</p>
          </div>
        )}
      </div>

      {/* ── Add item modal ──────────────────── */}
      {showAddModal && (
        <div
          className="absolute inset-0 flex items-end"
          style={{ background: "rgba(44,36,22,0.45)", backdropFilter: "blur(3px)", zIndex: 50 }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full rounded-t-3xl p-6 pb-8 flex flex-col gap-4"
            style={{ background: pal.card }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto" style={{ background: pal.border }}/>
            <h2 className="font-bold text-base" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Adicionar ao Estoque</h2>

            {/* Produto */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Produto</label>
              <input
                autoFocus
                className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                placeholder="Ex: Arroz, Feijão, Leite..."
                value={addName}
                onChange={e => setAddName(e.target.value)}
              />
            </div>

            {/* Quantidade + Unidade */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Quantidade</label>
                <input
                  type="number" min="1"
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                  style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                  value={addQty}
                  onChange={e => setAddQty(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Unidade</label>
                <select
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                  style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                  value={addUnit}
                  onChange={e => setAddUnit(e.target.value)}
                >
                  {["un", "kg", "g", "L", "ml", "cx", "pct"].map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {/* Validade */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Data de Validade</label>
              <input
                type="date"
                className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                value={addExpiry}
                onChange={e => setAddExpiry(e.target.value)}
              />
            </div>

            {/* Mercado */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: pal.textSecondary }}>Mercado</label>
              <select
                className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
                value={addMarket}
                onChange={e => setAddMarket(e.target.value)}
              >
                <option value="">Selecione um mercado...</option>
                {STOCK_MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                <option value="__custom__">+ Mercado não registrado ainda</option>
              </select>
              {addMarket === "__custom__" && (
                <input
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none mt-2"
                  style={{ background: pal.inputBg, border: "1px solid #e8a530", color: pal.textPrimary }}
                  placeholder="Nome do mercado..."
                  value={addMarketCustom}
                  onChange={e => setAddMarketCustom(e.target.value)}
                />
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
                style={{ background: pal.inputBg, color: pal.textSecondary }}>
                Cancelar
              </button>
              <button onClick={handleAddItem}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white"
                style={{ background: addName.trim() ? "#3d6648" : "#c8bfb2", boxShadow: addName.trim() ? "0 4px 12px #3d664833" : "none" }}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal ──────────────────── */}
      {deleteTarget && (
        <div
          className="absolute inset-0 flex items-end"
          style={{ background: "rgba(44,36,22,0.45)", backdropFilter: "blur(3px)", zIndex: 50 }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full rounded-t-3xl p-6 pb-8"
            style={{ background: pal.card }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: pal.border }}/>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: dark ? "#4a1a14" : "#f5ebe8" }}>
                {CAT_EMOJI[deleteTarget.category] ?? "📦"}
              </div>
              <div>
                <p className="font-bold" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>{deleteTarget.name}</p>
                <p className="text-xs mt-0.5" style={{ color: pal.textSecondary }}>{deleteTarget.qty} {deleteTarget.unit} · {deleteTarget.market}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: pal.textPrimary }}>
              Deseja adicionar <strong>{deleteTarget.name}</strong> à sua lista de compras antes de excluir do estoque?
            </p>

            {addedToList.includes(deleteTarget.id) && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: pal.greenMuted }}>
                <span className="text-sm">✅</span>
                <p className="text-xs font-semibold" style={{ color: "#3d6648" }}>Adicionado à lista de compras!</p>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {!addedToList.includes(deleteTarget.id) && (
                <button
                  onClick={() => { setAddedToList(p => [...p, deleteTarget!.id]); setItems(p => p.filter(i => i.id !== deleteTarget!.id)); setDeleteTarget(null) }}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                  style={{ background: "#3d6648", color: "#fff", boxShadow: "0 4px 12px #3d664833" }}
                >
                  <span>🛒</span> Sim, adicionar à lista e excluir
                </button>
              )}
              <button
                onClick={() => {
                  setItems(p => p.filter(i => i.id !== deleteTarget!.id))
                  setDeleteTarget(null)
                }}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95"
                style={{ background: "#f5ebe8", color: "#c04830" }}
              >
                {addedToList.includes(deleteTarget.id) ? "Excluir do estoque" : "Não, apenas excluir"}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="w-full py-3 rounded-2xl font-bold text-sm transition-all"
                style={{ background: pal.inputBg, color: pal.textSecondary }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SCREEN: SETTINGS ─────────────────────────────────────────────────────────

function SettingsScreen({ onLogout, onBack, darkMode = false, onToggleDark }: { onLogout: () => void; onBack?: () => void; darkMode?: boolean; onToggleDark?: () => void }) {
  const dark = useDark(); const pal = dmPalette(dark)
  const [notifPrice, setNotifPrice] = useState(true)
  const [notifExpiry, setNotifExpiry] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "xlsx">("csv")
  const [exportFields, setExportFields] = useState(["compras", "precos", "estoque", "lista"])
  const toggleExportField = (f: string) => setExportFields(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f])
  const [exportDateFrom, setExportDateFrom] = useState("")
  const [exportDateTo, setExportDateTo] = useState("")
  const exportAllProducts = Object.keys(PRICE_DATA)
  const exportAllMarkets = ["Atacadão Sul", "Feira Livre Central", "Supermercado Bom Preço", "Mercadinho do Bairro", "Hortifruti Verde Vida"]
  const [exportProducts, setExportProducts] = useState<string[]>([])
  const [exportMarkets, setExportMarkets] = useState<string[]>([])
  const [exportProdSearch, setExportProdSearch] = useState("")
  const toggleExportProd = (p: string) => setExportProducts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  const toggleExportMkt  = (m: string) => setExportMarkets(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("Real Brasileiro (R$)")
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  // Change password modal state
  const [currentPwd, setCurrentPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [showCurrentPwd, setShowCurrentPwd] = useState(false)
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [pwdError, setPwdError] = useState("")
  // Edit profile modal state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [profileName, setProfileName] = useState("Ana Silva")
  const [profileEmail, setProfileEmail] = useState("ana.silva@email.com")
  const [profilePhone, setProfilePhone] = useState("")
  const [profileCity, setProfileCity] = useState("")
  const [profileState, setProfileState] = useState("")
  const [profileCep, setProfileCep] = useState("")

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className="relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200"
        style={{ background: on ? "#3d6648" : "#e0d9cd" }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
          style={{ left: on ? "calc(100% - 1.375rem)" : "0.125rem" }}
        />
      </button>
    )
  }

  function SettingsRow({
    icon, label, sublabel, right, danger = false, onPress,
  }: {
    icon: string; label: string; sublabel?: string; right?: ReactNode; danger?: boolean; onPress?: () => void
  }) {
    const chevron = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8bfb2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9,18 15,12 9,6"/>
      </svg>
    )
    const inner = (
      <>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: danger ? (dark ? "#4a1a14" : "#f5ebe8") : pal.cardAlt }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: danger ? "#c04830" : pal.textPrimary }}>{label}</p>
          {sublabel && <p className="text-[10px] mt-0.5" style={{ color: pal.textSecondary }}>{sublabel}</p>}
        </div>
        {right ?? chevron}
      </>
    )
    // Use <div> when a toggle (button) is in the right slot to avoid button-in-button
    if (right) {
      return (
        <div className="w-full flex items-center gap-3 px-4 py-3.5" style={{ background: "transparent" }}>
          {inner}
        </div>
      )
    }
    return (
      <button
        onClick={onPress}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all active:opacity-70"
        style={{ background: "transparent" }}
      >
        {inner}
      </button>
    )
  }

  function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase px-4 mb-1" style={{ color: pal.textSecondary }}>{title}</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: pal.card, border: `1px solid ${pal.border}` }}>
          {children}
        </div>
      </div>
    )
  }

  function Divider() {
    return <div className="mx-4" style={{ height: 1, background: pal.divider }}/>
  }

  return (
    <div style={{ background: pal.bg, minHeight: "100%" }}>

      {/* ── Profile hero ───────────────────────────────── */}
      <div
        className="px-5 pt-6 pb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #2c4e37 0%, #3d6648 60%, #4e7f5a 100%)" }}
      >
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ background: "#ede8df" }}/>
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-10" style={{ background: "#ede8df" }}/>

        {/* Back button */}
        {onBack && (
          <button onClick={onBack} className="relative flex items-center gap-1.5 mb-4 opacity-80 hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
            <span className="text-xs font-semibold text-white">Voltar</span>
          </button>
        )}

        <div className="relative flex items-center gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-white/30"
              style={{ background: "#e8a530", color: "#2c2416", fontFamily: "Lora, serif" }}
            >
              AS
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
              style={{ background: "#4cb5b0", border: "2px solid #3d6648" }}
            >
              ✏️
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "Lora, serif" }}>
              Ana Silva
            </h2>
            <p className="text-[11px] mt-0.5" style={{ color: "#a8c9b0" }}>ana.silva@email.com</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "#e8a530", color: "#2c2416" }}
              >
                ✦ Conta Gratuita
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="relative flex gap-0 mt-5 rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          {[
            { label: "Compras", value: "23" },
            { label: "Produtos", value: "47" },
            { label: "Economia", value: "R$ 84" },
          ].map((s, i) => (
            <div key={i} className="flex-1 py-3 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <p className="text-white font-bold text-base leading-none" style={{ fontFamily: "Lora, serif" }}>{s.value}</p>
              <p className="text-[9px] mt-1" style={{ color: "#a8c9b0" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Settings sections ──────────────────────────── */}
      <div className="px-4 py-5 space-y-4">

        <Section title="Conta">
          <SettingsRow icon="👤" label="Editar perfil" sublabel="Nome, foto e dados pessoais" onPress={() => setShowEditProfileModal(true)}/>
          <Divider/>
          <SettingsRow icon="🔒" label="Alterar senha" sublabel="Segurança da conta" onPress={() => setShowChangePasswordModal(true)}/>
        </Section>

        <Section title="Notificações">
          <SettingsRow
            icon="📈"
            label="Alertas de preço"
            sublabel="Avisa quando um produto subir ou cair"
            right={<Toggle on={notifPrice} onToggle={() => setNotifPrice(p => !p)}/>}
          />
          <Divider/>
          <SettingsRow
            icon="⏰"
            label="Vencimentos próximos"
            sublabel="Lembrete 7 dias antes do vencimento"
            right={<Toggle on={notifExpiry} onToggle={() => setNotifExpiry(p => !p)}/>}
          />
          <Divider/>
          <SettingsRow
            icon="📊"
            label="Resumo semanal"
            sublabel="Relatório de gastos toda segunda-feira"
            right={<Toggle on={notifWeekly} onToggle={() => setNotifWeekly(p => !p)}/>}
          />
        </Section>

        <Section title="Preferências">
          <SettingsRow icon="💱" label="Moeda" sublabel={selectedCurrency} onPress={() => setShowCurrencyModal(true)}/>
          <Divider/>
          <SettingsRow
            icon={darkMode ? "☀️" : "🌙"}
            label="Aparência"
            sublabel={darkMode ? "Modo noturno" : "Tema claro"}
            right={<Toggle on={darkMode} onToggle={() => onToggleDark?.()}/>}
          />
        </Section>

        <Section title="Dados">
          <SettingsRow icon="⬇️" label="Exportar meus dados" sublabel="CSV com todas as compras" onPress={() => setShowExportModal(true)}/>
          <Divider/>
          <SettingsRow icon="🗑️" label="Limpar histórico" sublabel="Apaga todos os registros locais" danger onPress={() => setShowClearModal(true)}/>
        </Section>

        <Section title="Suporte">
          <SettingsRow
            icon="ℹ️"
            label="Sobre o EconoMap"
            sublabel="Versão 1.0.0 · TCC Eng. Computação"
            onPress={() => setShowAboutModal(true)}
          />
        </Section>

        {/* Logout button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ background: "#f5ebe8", color: "#c04830", border: "1.5px solid #e8c4bc" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c04830" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sair da conta
        </button>

        <p className="text-center text-[10px] pb-2" style={{ color: pal.textMuted }}>
          EconoMap · Trabalho de Conclusão de Curso
        </p>
      </div>

      {/* ── About modal ──────────────────── */}
      {showAboutModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }} onClick={() => setShowAboutModal(false)}>
          <div className="w-full rounded-t-3xl p-6 pb-8" style={{ background: pal.card }} onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: pal.border }}/>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3" style={{ background: pal.greenMuted }}>🌿</div>
              <h3 className="font-bold text-xl" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Projeto de TCC</h3>
              <p className="text-xs font-semibold mt-1" style={{ color: "#3d6648" }}>Trabalho de Conclusão de Curso</p>
            </div>
            <div className="rounded-2xl p-4 space-y-2 mb-5" style={{ background: pal.cardAlt, border: `1px solid ${pal.border}` }}>
              {[
                ["Aplicativo", "EconoMap v1.0.0"],
                ["Curso", "Engenharia da Computação"],
                ["Objetivo", "Rastreamento de preços de supermercado"],
                ["Tecnologias", "React · Vite · TypeScript · Tailwind CSS"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0" style={{ color: pal.textSecondary }}>{k}</p>
                  <p className="text-xs text-right" style={{ color: pal.textPrimary }}>{v}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAboutModal(false)} className="w-full py-4 rounded-2xl font-bold text-sm" style={{ background: "#3d6648", color: "#fff" }}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ── Clear history modal ──────────────────── */}
      {showClearModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }} onClick={() => setShowClearModal(false)}>
          <div className="w-full rounded-t-3xl p-6 pb-8" style={{ background: pal.card }} onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: pal.border }}/>
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3" style={{ background: dark ? "#4a1a14" : "#f5ebe8" }}>🗑️</div>
              <h3 className="font-bold text-lg" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Limpar Histórico</h3>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: pal.textSecondary }}>
                Esta ação irá apagar <strong style={{ color: "#c04830" }}>permanentemente</strong> todos os registros de compras, preços e estoque. Essa operação não pode ser desfeita.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setShowClearModal(false)}
                className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
                style={{ background: "#c04830", color: "#fff", boxShadow: "0 4px 16px #c0483033" }}
              >
                Sim, limpar tudo
              </button>
              <button onClick={() => setShowClearModal(false)} className="w-full py-4 rounded-2xl font-bold text-sm" style={{ background: pal.cardAlt, color: pal.textPrimary }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Export modal ──────────────────── */}
      {showExportModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }} onClick={() => setShowExportModal(false)}>
          <div className="w-full rounded-t-3xl flex flex-col" style={{ background: pal.card, height: "90%" }} onClick={e => e.stopPropagation()}>
            {/* Handle + header */}
            <div className="flex-shrink-0 px-6 pt-3 pb-4" style={{ borderBottom: `1px solid ${pal.divider}` }}>
              <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: pal.border }}/>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: pal.greenMuted }}>⬇️</div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Exportar Dados</h3>
                  <p className="text-[10px] mt-0.5" style={{ color: pal.textSecondary }}>Configure os filtros e o formato</p>
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5" style={{ background: pal.bg }}>

              {/* Dados a exportar */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: pal.textSecondary }}>Dados a exportar</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { k: "compras", label: "Histórico de compras", icon: "🛒" },
                    { k: "precos",  label: "Histórico de preços",  icon: "📈" },
                    { k: "estoque", label: "Estoque atual",        icon: "📦" },
                    { k: "lista",   label: "Lista de compras",     icon: "📋" },
                  ] as const).map(({ k, label, icon }) => {
                    const on = exportFields.includes(k)
                    return (
                      <button key={k} onClick={() => toggleExportField(k)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all"
                        style={{ background: on ? pal.greenMuted : pal.inputBg, border: `1.5px solid ${on ? "#3d6648" : pal.border}` }}>
                        <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ background: on ? "#3d6648" : pal.border }}>
                          {on && <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,5.5 4,8 8.5,2"/></svg>}
                        </div>
                        <p className="text-[10px] font-bold" style={{ color: on ? "#3d6648" : pal.textPrimary }}>{icon} {label}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Período */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: pal.textSecondary }}>Período</p>
                  <button
                    onClick={() => { setExportDateFrom(""); setExportDateTo("") }}
                    className="text-[10px] font-bold transition-all"
                    style={{ color: (!exportDateFrom && !exportDateTo) ? "#3d6648" : pal.textMuted }}
                  >
                    {(!exportDateFrom && !exportDateTo) ? "✓ Todo o período" : "Todo o período"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest block mb-1" style={{ color: pal.textMuted }}>De</label>
                    <input type="date" className="w-full rounded-xl px-3 py-2.5 text-xs outline-none"
                      style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary, opacity: (!exportDateFrom && !exportDateTo) ? 0.5 : 1 }}
                      value={exportDateFrom} onChange={e => setExportDateFrom(e.target.value)}/>
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest block mb-1" style={{ color: pal.textMuted }}>Até</label>
                    <input type="date" className="w-full rounded-xl px-3 py-2.5 text-xs outline-none"
                      style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary, opacity: (!exportDateFrom && !exportDateTo) ? 0.5 : 1 }}
                      min={exportDateFrom} value={exportDateTo} onChange={e => setExportDateTo(e.target.value)}/>
                  </div>
                </div>
                {(!exportDateFrom && !exportDateTo) && (
                  <p className="text-[10px] mt-1.5" style={{ color: pal.textMuted }}>Exportando todos os registros disponíveis</p>
                )}
              </div>

              {/* Produtos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: pal.textSecondary }}>Produtos</p>
                  <button onClick={() => setExportProducts(exportProducts.length === exportAllProducts.length ? [] : [...exportAllProducts])}
                    className="text-[10px] font-bold" style={{ color: "#3d6648" }}>
                    {exportProducts.length === exportAllProducts.length ? "Desmarcar tudo" : "Todos"}
                  </button>
                </div>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-2" style={{ background: pal.inputBg, border: `1px solid ${pal.border}` }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={pal.textSecondary} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    className="flex-1 bg-transparent text-xs outline-none"
                    style={{ color: pal.textPrimary }}
                    placeholder="Buscar produto registrado…"
                    value={exportProdSearch}
                    onChange={e => setExportProdSearch(e.target.value)}
                  />
                  {exportProdSearch && (
                    <button onClick={() => setExportProdSearch("")} className="text-xs" style={{ color: pal.textMuted }}>✕</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exportAllProducts.filter(p => p.toLowerCase().includes(exportProdSearch.toLowerCase())).map(p => {
                    const on = exportProducts.includes(p)
                    return (
                      <button key={p} onClick={() => toggleExportProd(p)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                        style={{ background: on ? "#3d6648" : pal.cardAlt, color: on ? "#fff" : pal.textPrimary }}>
                        {p}
                      </button>
                    )
                  })}
                  {exportAllProducts.filter(p => p.toLowerCase().includes(exportProdSearch.toLowerCase())).length === 0 && (
                    <p className="text-[10px]" style={{ color: pal.textMuted }}>Nenhum produto encontrado</p>
                  )}
                </div>
                {exportProducts.length === 0 && (
                  <p className="text-[10px] mt-1.5" style={{ color: pal.textMuted }}>Nenhum selecionado = todos os produtos</p>
                )}
              </div>

              {/* Mercados */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: pal.textSecondary }}>Mercados</p>
                  <button onClick={() => setExportMarkets(exportMarkets.length === exportAllMarkets.length ? [] : [...exportAllMarkets])}
                    className="text-[10px] font-bold" style={{ color: "#3d6648" }}>
                    {exportMarkets.length === exportAllMarkets.length ? "Desmarcar tudo" : "Todos"}
                  </button>
                </div>
                {/* Search field */}
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-2" style={{ background: pal.inputBg, border: `1px solid ${pal.border}` }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={pal.textSecondary} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    className="flex-1 bg-transparent text-xs outline-none"
                    style={{ color: pal.textPrimary }}
                    placeholder="Filtrar mercados registrados…"
                    id="exportMktSearch"
                    onChange={e => {
                      const q = e.target.value.toLowerCase()
                      const el = document.getElementById("exportMktList")
                      if (el) el.querySelectorAll("[data-mkt]").forEach(btn => {
                        const name = (btn as HTMLElement).dataset.mkt ?? ""
                        ;(btn as HTMLElement).style.display = name.toLowerCase().includes(q) ? "" : "none"
                      })
                    }}
                  />
                </div>
                <div id="exportMktList" className="flex flex-col gap-1.5">
                  {exportAllMarkets.map(m => {
                    const on = exportMarkets.includes(m)
                    return (
                      <button key={m} data-mkt={m} onClick={() => toggleExportMkt(m)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-all"
                        style={{ background: on ? pal.greenMuted : pal.inputBg, border: `1px solid ${on ? "#3d6648" : pal.border}` }}>
                        <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center" style={{ background: on ? "#3d6648" : pal.border }}>
                          {on && <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,5.5 4,8 8.5,2"/></svg>}
                        </div>
                        <p className="text-xs font-semibold" style={{ color: on ? "#3d6648" : pal.textPrimary }}>🏪 {m}</p>
                      </button>
                    )
                  })}
                </div>
                {exportMarkets.length === 0 && (
                  <p className="text-[10px] mt-1.5" style={{ color: pal.textMuted }}>Nenhum selecionado = todos os mercados</p>
                )}
              </div>

              {/* Formato */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: pal.textSecondary }}>Formato do arquivo</p>
                <div className="flex gap-2">
                  {([
                    { k: "csv",  label: "CSV",  icon: "📊" },
                    { k: "json", label: "JSON", icon: "🗂️" },
                    { k: "xlsx", label: "XLSX", icon: "📋" },
                  ] as const).map(({ k, label, icon }) => (
                    <button key={k} onClick={() => setExportFormat(k)}
                      className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl font-bold text-xs transition-all"
                      style={{ background: exportFormat === k ? "#3d6648" : pal.inputBg, color: exportFormat === k ? "#fff" : pal.textPrimary, border: `1.5px solid ${exportFormat === k ? "#3d6648" : pal.border}` }}>
                      <span className="text-lg">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex-shrink-0 px-6 pb-6 pt-3 flex gap-2.5" style={{ borderTop: `1px solid ${pal.divider}`, background: pal.card }}>
              <button onClick={() => setShowExportModal(false)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm" style={{ background: pal.cardAlt, color: pal.textPrimary }}>
                Cancelar
              </button>
              <button
                onClick={() => { if (exportFields.length > 0) setShowExportModal(false) }}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white transition-all active:scale-95"
                style={{ background: exportFields.length > 0 ? "#3d6648" : pal.textMuted, boxShadow: exportFields.length > 0 ? "0 4px 14px #3d664840" : "none" }}>
                Exportar .{exportFormat}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Logout confirmation modal ──────────────────── */}
      {/* ── Currency modal ──────────────────────────────── */}
      {showCurrencyModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }} onClick={() => setShowCurrencyModal(false)}>
          <div className="w-full rounded-t-3xl pb-8" style={{ background: pal.card }} onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mt-4 mb-4" style={{ background: pal.border }}/>
            <div className="px-5 mb-3">
              <h3 className="font-bold text-base" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Selecionar Moeda</h3>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
              {[
                { code: "BRL", symbol: "R$", name: "Real Brasileiro" },
                { code: "USD", symbol: "$", name: "Dólar Americano" },
                { code: "EUR", symbol: "€", name: "Euro" },
                { code: "GBP", symbol: "£", name: "Libra Esterlina" },
                { code: "ARS", symbol: "$", name: "Peso Argentino" },
                { code: "CLP", symbol: "$", name: "Peso Chileno" },
                { code: "COP", symbol: "$", name: "Peso Colombiano" },
                { code: "PEN", symbol: "S/", name: "Sol Peruano" },
                { code: "UYU", symbol: "$U", name: "Peso Uruguaio" },
                { code: "PYG", symbol: "₲", name: "Guarani Paraguaio" },
                { code: "BOB", symbol: "Bs.", name: "Boliviano" },
                { code: "VES", symbol: "Bs.", name: "Bolívar Venezuelano" },
                { code: "MXN", symbol: "$", name: "Peso Mexicano" },
              ].map((currency, i, arr) => {
                const label = `${currency.name} (${currency.symbol})`
                const isSelected = selectedCurrency === label
                return (
                  <div key={currency.code}>
                    <button
                      onClick={() => { setSelectedCurrency(label); setShowCurrencyModal(false) }}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all active:scale-95"
                      style={{ background: isSelected ? pal.greenMuted : "transparent" }}
                    >
                      <span className="text-sm font-bold w-8" style={{ color: "#3d6648" }}>{currency.symbol}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: pal.textPrimary }}>{currency.name}</p>
                        <p className="text-xs" style={{ color: pal.textSecondary }}>{currency.code}</p>
                      </div>
                      {isSelected && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d6648" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      )}
                    </button>
                    {i < arr.length - 1 && <div className="mx-5 h-px" style={{ background: pal.divider }}/>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Change password modal ────────────────────────── */}
      {showChangePasswordModal && (() => {
        const isPwdValid = newPwd.length >= 8 && newPwd === confirmPwd && currentPwd.length > 0
        const inputS = { background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }
        function handleSavePwd() {
          if (newPwd.length < 8) { setPwdError("A nova senha deve ter pelo menos 8 caracteres."); return }
          if (newPwd !== confirmPwd) { setPwdError("As senhas não coincidem."); return }
          setShowChangePasswordModal(false)
        }
        return (
          <div className="absolute inset-0 flex items-end" style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }} onClick={() => setShowChangePasswordModal(false)}>
            <div className="w-full rounded-t-3xl p-5 pb-8" style={{ background: pal.card }} onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: pal.border }}/>
              <h3 className="font-bold text-base mb-4" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>Alterar Senha</h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Senha atual</label>
                  <div className="relative">
                    <input type={showCurrentPwd ? "text" : "password"} value={currentPwd} onChange={e => { setCurrentPwd(e.target.value); setPwdError("") }} placeholder="••••••••"
                      className="w-full rounded-xl px-4 py-2.5 pr-14 text-sm outline-none" style={inputS}/>
                    <button type="button" onClick={() => setShowCurrentPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: pal.textSecondary }}>
                      {showCurrentPwd ? "Ocultar" : "Ver"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Nova senha</label>
                  <div className="relative">
                    <input type={showNewPwd ? "text" : "password"} value={newPwd} onChange={e => { setNewPwd(e.target.value); setPwdError("") }} placeholder="••••••••"
                      className="w-full rounded-xl px-4 py-2.5 pr-14 text-sm outline-none" style={inputS}/>
                    <button type="button" onClick={() => setShowNewPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: pal.textSecondary }}>
                      {showNewPwd ? "Ocultar" : "Ver"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Confirmar nova senha</label>
                  <div className="relative">
                    <input type={showConfirmPwd ? "text" : "password"} value={confirmPwd} onChange={e => { setConfirmPwd(e.target.value); setPwdError("") }} placeholder="••••••••"
                      className="w-full rounded-xl px-4 py-2.5 pr-14 text-sm outline-none" style={inputS}/>
                    <button type="button" onClick={() => setShowConfirmPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: pal.textSecondary }}>
                      {showConfirmPwd ? "Ocultar" : "Ver"}
                    </button>
                  </div>
                </div>
                {pwdError && <p className="text-xs font-semibold" style={{ color: "#c04830" }}>{pwdError}</p>}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowChangePasswordModal(false)} className="flex-1 py-3 rounded-2xl font-semibold text-sm" style={{ background: pal.cardAlt, color: pal.textPrimary, border: `1px solid ${pal.border}` }}>Cancelar</button>
                <button onClick={handleSavePwd} disabled={!isPwdValid} className="flex-1 py-3 rounded-2xl font-bold text-sm text-white" style={{ background: isPwdValid ? "linear-gradient(135deg, #3d6648, #2c4e37)" : pal.border }}>Salvar senha</button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── Edit profile modal ───────────────────────────── */}
      {showEditProfileModal && (() => {
        const inputS = { background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }
        function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
          const file = e.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = ev => setProfilePhoto(ev.target?.result as string)
            reader.readAsDataURL(file)
          }
        }
        return (
          <div className="absolute inset-0 flex items-end" style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }} onClick={() => setShowEditProfileModal(false)}>
            <div className="w-full flex flex-col" style={{ height: "90%", background: pal.card, borderRadius: "24px 24px 0 0" }} onClick={e => e.stopPropagation()}>
              <div className="flex-shrink-0 px-5 pt-5 pb-4" style={{ background: "linear-gradient(135deg, #2c4e37 0%, #3d6648 100%)", borderRadius: "24px 24px 0 0" }}>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowEditProfileModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                  <h3 className="font-bold text-base text-white flex-1" style={{ fontFamily: "Lora, serif" }}>Editar Perfil</h3>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2 pb-2">
                  <div className="relative">
                    {profilePhoto
                      ? <img src={profilePhoto} className="w-20 h-20 rounded-full object-cover"/>
                      : <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: "#e8a530", color: "#fff" }}>AS</div>
                    }
                    <label className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: "#3d6648" }}>
                      <span className="text-sm">📷</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange}/>
                    </label>
                  </div>
                  <p className="text-xs" style={{ color: pal.textSecondary }}>Toque no ícone para alterar a foto</p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Nome completo</label>
                  <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputS}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>E-mail</label>
                  <input type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputS}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Telefone</label>
                  <input type="tel" value={profilePhone} onChange={e => setProfilePhone(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputS}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Cidade</label>
                  <input type="text" value={profileCity} onChange={e => setProfileCity(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputS}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>Estado</label>
                  <input type="text" value={profileState} onChange={e => setProfileState(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputS}/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: pal.textSecondary }}>CEP</label>
                  <input type="text" value={profileCep} onChange={e => setProfileCep(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputS}/>
                </div>
              </div>
              <div className="px-5 pb-8 flex-shrink-0 space-y-2">
                <button onClick={() => setShowEditProfileModal(false)} className="w-full py-3.5 rounded-2xl font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #3d6648, #2c4e37)", boxShadow: "0 4px 16px #3d664844" }}>Salvar alterações</button>
                <button onClick={() => setShowEditProfileModal(false)} className="w-full py-3 rounded-2xl font-semibold text-sm" style={{ background: pal.cardAlt, color: pal.textPrimary, border: `1px solid ${pal.border}` }}>Cancelar</button>
              </div>
            </div>
          </div>
        )
      })()}

      {showLogoutModal && (
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ background: "rgba(44,36,22,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="w-full rounded-t-3xl p-6 pb-8"
            style={{ background: pal.card }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: pal.border }}/>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3" style={{ background: dark ? "#4a1a14" : "#f5ebe8" }}>
                👋
              </div>
              <h3 className="font-bold text-lg" style={{ color: pal.textPrimary, fontFamily: "Lora, serif" }}>
                Saindo da conta
              </h3>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: pal.textSecondary }}>
                Tem certeza que deseja sair? Seus dados ficam salvos para quando voltar.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={onLogout}
                className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
                style={{ background: "#c04830", color: "#fff", boxShadow: "0 4px 16px #c0483033" }}
              >
                Sim, quero sair
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
                style={{ background: pal.cardAlt, color: pal.textPrimary }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── SCREEN: LOGIN ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const dark = useDark(); const pal = dmPalette(dark)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPass, setShowPass] = useState(false)

  const canSubmit = email.trim() && password.trim() && (mode === "login" || name.trim())

  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(160deg, #2c4e37 0%, #3d6648 60%, #4e7f5a 100%)" }}>
      {/* Top blob */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "52%", background: pal.bg, borderRadius: "0 0 48px 48px" }}
      />

      {/* Logo + brand */}
      <div className="relative flex flex-col items-center pt-12 pb-6 flex-shrink-0">
        <img
          src={logoImg}
          alt="EconoMap – cesta de mercado dentro de um pin de localização"
          className="w-24 h-24 object-contain drop-shadow-xl"
        />
        <div className="flex items-center gap-2 mt-2">
          <div className="h-px w-6" style={{ background: "#4cb5b0" }}/>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(44,36,22,0.5)" }}>
            Compare • Economize • Decida Melhor
          </p>
          <div className="h-px w-6" style={{ background: "#e8a530" }}/>
        </div>
      </div>

      {/* Card */}
      <div className="relative flex-1 flex flex-col mx-4 rounded-3xl shadow-xl overflow-hidden" style={{ background: pal.card, border: `1px solid ${pal.border}` }}>
        {/* Tab switcher */}
        <div className="flex flex-shrink-0" style={{ borderBottom: `1px solid ${pal.divider}` }}>
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-4 text-sm font-bold transition-all ${mode === m ? "border-b-2" : ""}`}
              style={mode === m ? { color: "#3d6648", borderColor: "#3d6648" } : { color: pal.textSecondary }}
            >
              {m === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 flex flex-col gap-4">
          {/* Name field (register only) */}
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide" style={{ color: pal.textSecondary }}>Nome completo</label>
              <input
                type="text"
                placeholder="Ana Silva"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: pal.textSecondary }}>E-mail</label>
            <input
              type="email"
              placeholder="ana@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wide" style={{ color: pal.textSecondary }}>Senha</label>
              {mode === "login" && (
                <button className="text-xs font-semibold" style={{ color: "#3d6648" }}>Esqueci a senha</button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-1"
                style={{ color: pal.textSecondary }}
              >
                {showPass ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <p className="text-[10px] leading-relaxed" style={{ color: pal.textSecondary }}>
              Ao criar uma conta você concorda com os <span className="font-semibold" style={{ color: "#3d6648" }}>Termos de Uso</span> e a <span className="font-semibold" style={{ color: "#3d6648" }}>Política de Privacidade</span>.
            </p>
          )}

          {/* Primary CTA */}
          <button
            onClick={onLogin}
            disabled={!canSubmit}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all active:scale-95 mt-1"
            style={{ background: canSubmit ? "linear-gradient(135deg, #3d6648, #2c4e37)" : pal.border, color: canSubmit ? "#fff" : pal.textSecondary, boxShadow: canSubmit ? "0 4px 16px #3d664844" : "none" }}
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: pal.divider }}/>
            <span className="text-[10px] font-semibold" style={{ color: pal.textSecondary }}>ou continue com</span>
            <div className="flex-1 h-px" style={{ background: pal.divider }}/>
          </div>

          {/* Google */}
          <button
            onClick={onLogin}
            className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 transition active:scale-95"
            style={{ background: pal.cardAlt, color: pal.textPrimary, border: `2px solid ${pal.border}` }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>
        </div>
      </div>

      {/* Bottom safe area spacer */}
      <div className="flex-shrink-0 h-6"/>
    </div>
  )
}

// ─── APP SHELL ─────────────────────────────────────────────────────────────────

type Tab = "home" | "map" | "prices" | "list" | "stock" | "config"

const NAV = [
  { key: "home" as Tab,   label: "Início",  Icon: IcoHome  },
  { key: "map" as Tab,    label: "Mapa",    Icon: IcoMap   },
  { key: "prices" as Tab, label: "Preços",  Icon: IcoChart },
  { key: "list" as Tab,   label: "Lista",   Icon: IcoList  },
  { key: "stock" as Tab,  label: "Estoque", Icon: IcoBox   },
]

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<Tab>("home")
  const [darkMode, setDarkMode] = useState(false)

  function handleLogout() {
    setLoggedIn(false)
    setTab("home")
  }

  const dm = darkMode
  // Dark mode palette overrides
  const shellBg    = dm ? "#1a1a2e" : "#ede8df"
  const statusBg   = dm ? "#0f1723" : "#3d6648"
  const navBg      = dm ? "#1e2235" : "#fff"
  const navBorder  = dm ? "#2e3550" : "#e0d9cd"

  return (
    <DarkCtx.Provider value={darkMode}>
    <div className="min-h-screen flex items-center justify-center p-0 md:p-6" style={{ background: dm ? "#0d1117" : "#e2e8f0" }}>
      <div
        className="w-full md:max-w-sm flex flex-col relative overflow-hidden"
        style={{ background: shellBg, height: "100dvh", maxHeight: "100dvh" }}
      >
        {/* Status bar */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between flex-shrink-0" style={{ background: statusBg }}>
          <span className="text-xs font-bold font-mono" style={{ color: "#a8c9b0" }}>9:41</span>
          <div className="flex items-center gap-1 text-xs" style={{ color: "#a8c9b0" }}>
            <span>⚡</span>
            <span className="font-mono font-semibold">92%</span>
          </div>
        </div>

        {/* Screen */}
        <div className="flex-1 overflow-y-auto">
          {!loggedIn && <LoginScreen onLogin={() => setLoggedIn(true)}/>}
          {loggedIn && tab === "home"   && <HomeScreen onOpenSettings={() => setTab("config")}/>}
          {loggedIn && tab === "map"    && <MapScreen/>}
          {loggedIn && tab === "prices" && <PricesScreen/>}
          {loggedIn && tab === "list"   && <ListScreen/>}
          {loggedIn && tab === "stock"  && <StockScreen/>}
          {loggedIn && tab === "config" && <SettingsScreen onLogout={handleLogout} onBack={() => setTab("home")} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)}/>}
        </div>

        {/* Bottom nav */}
        {loggedIn && <div className="px-1 pt-2 pb-3 flex-shrink-0" style={{ background: navBg, borderTop: `1px solid ${navBorder}` }}>
          <div className="flex">
            {NAV.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex-1 flex flex-col items-center gap-1 py-1 rounded-xl transition-all"
                style={{ background: tab === key ? "#d4e6d9" : "transparent" }}
              >
                <Icon on={tab === key}/>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: tab === key ? "#3d6648" : "#9c8e7e" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>}
      </div>
    </div>
    </DarkCtx.Provider>
  )
}
