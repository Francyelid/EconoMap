import { ICONS } from "@/constants/icons"
import MarketCard from "../MarketCard/MarketCard"
import MarketFilters from "../MarketFilters/MarketFilters"
import type { MarketFiltersProps } from "../types"
import { marketListClasses, createMarketListStyles } from "./MarketList.styles"
import type { Market } from "@/interfaces/Market"
import { dmPalette, useDark } from "@/theme"

export type { PriceFilter } from "../types"

type MarketListProps = MarketFiltersProps & { markets: Market[] }

export default function MarketList({
  markets: sorted,
  allTypes,
  searchFilter,
  onSearchFilterChange: setSearchFilter,
  typeFilter,
  onTypeFilterChange: setTypeFilter,
  priceFilter,
  onPriceFilterChange: setPriceFilter,
}: MarketListProps) {
  const p = dmPalette(useDark())

  const styles = createMarketListStyles(p)

  return (
    <>
      <MarketFilters
        palette={p}
        allTypes={allTypes}
        searchFilter={searchFilter}
        onSearchFilterChange={setSearchFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
      />
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
