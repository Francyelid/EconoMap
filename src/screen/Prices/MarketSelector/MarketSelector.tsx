import {
  marketSelectorClasses,
  createMarketSelectorStyles,
} from "./MarketSelector.styles"

type MarketSelectorProps = {
  markets: string[]
  selectedMarkets: string[]
  onToggleMarket: (market: string) => void
}

export default function MarketSelector({
  markets: allMarkets,
  selectedMarkets: selMarkets,
  onToggleMarket: toggle,
}: MarketSelectorProps) {
  const styles = createMarketSelectorStyles()
  return (
    <div>
      <p className={marketSelectorClasses.sectionLabel}>Mercados</p>
      <div className={marketSelectorClasses.markets}>
        {allMarkets.map((m, i) => {
          const active = selMarkets.includes(m)

          return (
            <button
              key={m}
              onClick={() => toggle(m)}
              className={marketSelectorClasses.marketButton}
              style={styles.marketButton(active, i)}
            >
              {m}
            </button>
          )
        })}
      </div>
    </div>
  )
}
