import { createCommunityRecordsStyles, communityRecordsClasses } from "./CommunityRecords.styles"
import { useState } from "react"
import { TODAY_ITEMS } from "@/mocks/TODAY_ITEMS"

type CommunityRecordsProps = {
  onClose: () => void
  dark: boolean
  palette: {
    cardAlt: string
    textSecondary: string
    card: string
    border: string
    divider: string
    textPrimary: string
    textMuted: string
    inputBg: string
    bg: string
    greenMuted: string
  }
}

export default function CommunityRecords({ onClose, dark, palette: pal }: CommunityRecordsProps) {
  const styles = createCommunityRecordsStyles(pal, dark)
  const [search, setSearch] = useState("")
  const [mktFilter, setMktFilter] = useState("Todos")
  const [trendFilter, setTrendFilter] = useState<"all" | "up" | "down">("all")
  const [maxPrice, setMaxPrice] = useState("")

  const allMarkets = ["Todos", ...Array.from(new Set(TODAY_ITEMS.map(i => i.market)))]

  const filtered = TODAY_ITEMS.filter(item => {
    const q = search.toLowerCase()
    if (q && !item.product.toLowerCase().includes(q) && !item.market.toLowerCase().includes(q)) return false
    if (mktFilter !== "Todos" && item.market !== mktFilter) return false
    if (maxPrice && item.price > parseFloat(maxPrice)) return false
    const diff = item.price - item.prevPrice
    if (trendFilter === "up" && diff <= 0) return false
    if (trendFilter === "down" && diff >= 0) return false
    return true
  })

  const groups: Record<string, typeof TODAY_ITEMS> = {}
  filtered.forEach(item => {
    const key = `${item.time} · ${item.market}`
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  })

  function TrendBadge({ price, prev }: { price: number; prev: number }) {
    const diff = price - prev
    const pct = prev > 0 ? ((diff / prev) * 100).toFixed(1) : "0.0"
    if (Math.abs(diff) < 0.01) return <span className={communityRecordsClasses.neutralBadge} style={styles.neutralBadge}>—</span>
    return (
      <span className={communityRecordsClasses.trendBadge} style={styles.trendBadge(diff)}>
        {diff > 0 ? "▲" : "▼"} {Math.abs(parseFloat(pct))}%
      </span>
    )
  }

  return (
    <div
      className={communityRecordsClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={communityRecordsClasses.sheet}
        style={styles.sheet}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className={communityRecordsClasses.handleContainer}>
          <div className={communityRecordsClasses.handle} style={styles.handle}/>
        </div>

        {/* Header */}
        <div className={communityRecordsClasses.header} style={styles.header}>
          <div>
            <h3 className={communityRecordsClasses.title} style={styles.title}>Registros da Comunidade</h3>
            <p className={communityRecordsClasses.subtitle} style={styles.secondaryText}>23 de agosto de 2026 · dados de todos os usuários</p>
          </div>
          <button onClick={onClose} className={communityRecordsClasses.closeButton} style={styles.mutedText}>✕</button>
        </div>

        {/* Community banner */}
        <div className={communityRecordsClasses.banner} style={styles.banner}>
          <div className={communityRecordsClasses.bannerContent} style={styles.bannerContent}>
            <span className={communityRecordsClasses.bannerIcon}>👥</span>
            <p className={communityRecordsClasses.bannerText} style={styles.bannerText}>
              Preços registrados por <strong>múltiplos usuários</strong>. O algoritmo elimina duplicatas e agrega os dados mais recentes.
            </p>
          </div>
          <div className={communityRecordsClasses.statsRow} style={styles.statsRow}>
            {[
              { day: "Hoje", users: 18 },
              { day: "Ontem", users: 31 },
              { day: "Ant.", users: 24 },
            ].map((d, i) => (
              <div key={i} className={communityRecordsClasses.statCell} style={styles.statCell(i)}>
                <p className={communityRecordsClasses.statValue} style={styles.bannerText}>{d.users}</p>
                <p className={communityRecordsClasses.statLabel} style={styles.tealText}>{d.day}</p>
              </div>
            ))}
            <div className={communityRecordsClasses.statCell} style={styles.totalCell}>
              <p className={communityRecordsClasses.statValue} style={styles.bannerText}>73</p>
              <p className={communityRecordsClasses.statLabel} style={styles.tealText}>Semana</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={communityRecordsClasses.filters}>
          {/* Search */}
          <div className={communityRecordsClasses.searchContainer} style={styles.searchContainer}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pal.textSecondary} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className={communityRecordsClasses.searchInput}
              style={styles.primaryText}
              placeholder="Buscar produto ou mercado…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button onClick={() => setSearch("")} className={communityRecordsClasses.clearButton} style={styles.mutedText}>✕</button>}
          </div>

          {/* Row: market + price + trend */}
          <div className={communityRecordsClasses.filterRow}>
            {/* Market select */}
            <select
              className={communityRecordsClasses.select}
              style={styles.select}
              value={mktFilter}
              onChange={e => setMktFilter(e.target.value)}
            >
              {allMarkets.map(m => <option key={m}>{m}</option>)}
            </select>

            {/* Max price */}
            <div className={communityRecordsClasses.maxPriceContainer} style={styles.maxPriceContainer}>
              <span className={communityRecordsClasses.maxPriceLabel} style={styles.secondaryText}>Até R$</span>
              <input
                type="number"
                className={communityRecordsClasses.maxPriceInput}
                style={styles.primaryText}
                placeholder="—"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>

            {/* Trend filter */}
            <div className={communityRecordsClasses.trendGroup} style={styles.trendGroup}>
              {([["all", "Todos"], ["down", "▼"], ["up", "▲"]] as const).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTrendFilter(k)}
                  className={communityRecordsClasses.trendButton}
                  style={styles.trendButton(trendFilter, k)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className={communityRecordsClasses.results} style={styles.results}>
          {Object.keys(groups).length === 0 ? (
            <div className={communityRecordsClasses.emptyState} style={styles.secondaryText}>
              <p className={communityRecordsClasses.emptyIcon}>🔍</p>
              <p className={communityRecordsClasses.emptyMessage}>Nenhum item encontrado</p>
            </div>
          ) : (
            Object.entries(groups).map(([key, items]) => (
              <div key={key} className={communityRecordsClasses.group}>
                <div className={communityRecordsClasses.groupHeader}>
                  <span className={communityRecordsClasses.groupLabel} style={styles.groupLabel}>{key}</span>
                  <span className={communityRecordsClasses.caption} style={styles.secondaryText}>{items[0].reports} relatos</span>
                </div>
                {items.map((item, i) => (
                  <div key={i} className={communityRecordsClasses.item} style={styles.item}>
                    <div className={communityRecordsClasses.details}>
                      <p className={communityRecordsClasses.product} style={styles.primaryText}>{item.product}</p>
                      <p className={communityRecordsClasses.subtitle} style={styles.secondaryText}>1 {item.unit} · antes R$ {item.prevPrice.toFixed(2)}</p>
                    </div>
                    <TrendBadge price={item.price} prev={item.prevPrice}/>
                    <p className={communityRecordsClasses.price} style={styles.primaryText}>
                      R$&nbsp;{item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

