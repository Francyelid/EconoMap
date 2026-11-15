import { ICONS } from "@/constants/icons"
import MarketCard from "../MarketCard/MarketCard"
import { marketListClasses, createMarketListStyles } from "./MarketList.styles"
import type { Market } from "@/models/Market"
import { dmPalette, useDark } from "@/theme"

export type { PriceFilter } from "../types"

type MarketListProps = { markets: Market[] }

export default function MarketList({
  markets: sorted,
}: MarketListProps) {
  const p = dmPalette(useDark())

  const styles = createMarketListStyles(p)

  return (
    <>
      {sorted.length === 0 && (
        <div className={marketListClasses.empty} style={styles.secondaryText}>
          <p className={marketListClasses.emptyIcon}>{ICONS.search}</p>
          <p className={marketListClasses.emptyMessage}>
            Nenhum mercado encontrado
          </p>
        </div>
      )}
      {sorted.map((m) => (
        <MarketCard key={m.id} market={m} palette={p} />
      ))}
    </>
  )
}
