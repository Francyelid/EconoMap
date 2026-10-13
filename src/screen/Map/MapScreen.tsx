import MapHeader from "./MapHeader/MapHeader"
import type { MapView, PriceFilter } from "./types"
import { mapScreenClasses, createMapScreenStyles } from "./MapScreen.styles"
import { useState } from "react"
import type { Market } from "@/interfaces/Market"
import { MARKETS } from "@/mocks/MARKETS"
import { dmPalette, useDark } from "@/theme"
import MarketList from "./MarketList/MarketList"
import MarketMap from "./MarketMap/MarketMap"

export default function MapScreen() {
  const dark = useDark()
  const p = dmPalette(dark)

  const [selected, setSelected] = useState<Market | null>(null)

  const [view, setView] = useState<MapView>("map")

  const [rankingCollapsed, setRankingCollapsed] = useState(false)

  const [typeFilter, setTypeFilter] = useState("Todos")

  const [searchFilter, setSearchFilter] = useState("")

  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all")

  const allTypes = ["Todos", ...Array.from(new Set(MARKETS.map((m) => m.type)))]

  const sorted = [...MARKETS]

    .filter((m) => {
      if (typeFilter !== "Todos" && m.type !== typeFilter) return false

      if (
        searchFilter &&
        !m.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
        !m.address.toLowerCase().includes(searchFilter.toLowerCase())
      )
        return false

      if (priceFilter === "cheap" && m.priceIndex > 45) return false

      if (priceFilter === "mid" && (m.priceIndex <= 45 || m.priceIndex > 65))
        return false

      if (priceFilter === "expensive" && m.priceIndex <= 65) return false

      return true
    })

    .sort((a, b) => a.priceIndex - b.priceIndex)

  const styles = createMapScreenStyles(p)

  return (
    <div className={mapScreenClasses.screen}>
      <MapHeader palette={p} dark={dark} view={view} onViewChange={setView} />

      <div className={mapScreenClasses.content} style={styles.background}>
        {view === "map" && (
          <MarketMap
            markets={MARKETS}
            rankedMarkets={sorted}
            selected={selected}
            onSelectMarket={setSelected}
            rankingCollapsed={rankingCollapsed}
            onToggleRanking={() => setRankingCollapsed((c) => !c)}
          />
        )}

        {view === "list" && (
          <MarketList
            markets={sorted}
            allTypes={allTypes}
            searchFilter={searchFilter}
            onSearchFilterChange={setSearchFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
          />
        )}
      </div>
    </div>
  )
}
