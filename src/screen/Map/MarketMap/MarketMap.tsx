import SelectedMarketCard from "../SelectedMarketCard/SelectedMarketCard"
import type { Market } from "@/interfaces/Market"
import MapDrawing from "./MapDrawing/MapDrawing"
import MarketRanking from "./Ranking/MarketRanking"

type MarketMapProps = {
  markets: Market[]
  rankedMarkets: Market[]
  selected: Market | null
  onSelectMarket: (market: Market | null) => void
  rankingCollapsed: boolean
  onToggleRanking: () => void
}

export default function MarketMap({
  markets,
  rankedMarkets,
  selected,
  onSelectMarket: setSelected,
  rankingCollapsed,
  onToggleRanking,
}: MarketMapProps) {
  return (
    <>
      <MapDrawing
        markets={markets}
        selected={selected}
        onSelectMarket={setSelected}
      />

      {/* Selected market */}
      {selected && (
        <SelectedMarketCard
          market={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <MarketRanking
        markets={rankedMarkets}
        rankingCollapsed={rankingCollapsed}
        onToggleRanking={onToggleRanking}
        onSelectMarket={setSelected}
      />
    </>
  )
}
