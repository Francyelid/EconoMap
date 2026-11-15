import { filterMarkets } from "@/business/market"
import MapHeader from "./MapHeader/MapHeader"
import type { MapView, PriceFilter } from "./types"
import { mapScreenClasses, createMapScreenStyles } from "./MapScreen.styles"
import { useState } from "react"
import type { Market } from "@/models/Market"
import { MARKETS } from "@/services/demo/data"
import { dmPalette, useDark } from "@/theme"
import MarketList from "./MarketList/MarketList"
import MarketMap from "./MarketMap/MarketMap"
import MarketFilters from "./MarketFilters/MarketFilters"
import { MARKET_TYPES, type MarketTypeFilter } from "@/models/MarketType"

export default function MapScreen() {
  const dark = useDark()
  const p = dmPalette(dark)

  const [selected, setSelected] = useState<Market | null>(null)

  const [view, setView] = useState<MapView>("map")

  const [rankingCollapsed, setRankingCollapsed] = useState(false)

  const [typeFilter, setTypeFilter] = useState<MarketTypeFilter>([])

  const [searchFilter, setSearchFilter] = useState("")

  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all")

  const sorted = filterMarkets(MARKETS, typeFilter, searchFilter, priceFilter)
  const visibleSelected = selected && sorted.some((market) => market.id === selected.id) ? selected : null

  const styles = createMapScreenStyles(p)

  return (
    <div className={mapScreenClasses.screen}>
      <MapHeader palette={p} dark={dark} view={view} onViewChange={setView} />

      <div className={mapScreenClasses.content} style={styles.background}>
        <MarketFilters
          palette={p}
          allTypes={MARKET_TYPES}
          searchFilter={searchFilter}
          onSearchFilterChange={setSearchFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
        />
        {view === "map" && (
          <MarketMap
            markets={sorted}
            rankedMarkets={sorted}
            selected={visibleSelected}
            onSelectMarket={setSelected}
            rankingCollapsed={rankingCollapsed}
            onToggleRanking={() => setRankingCollapsed((c) => !c)}
          />
        )}

        {view === "list" && (
          <MarketList
            markets={sorted}
          />
        )}
      </div>
    </div>
  )
}
