import {
  stockFiltersClasses,
  createStockFiltersStyles,
} from "./StockFilters.styles"
import { dmPalette, useDark } from "@/theme"
import type { StockFilter } from "../types"

type StockFiltersProps = {
  filter: StockFilter
  setFilter: (filter: StockFilter) => void
}

export default function StockFilters({ filter, setFilter }: StockFiltersProps) {
  const dark = useDark()
  const styles = createStockFiltersStyles(dmPalette(dark), dark)

  return (
    <div className={stockFiltersClasses.tabs} style={styles.tabs}>
      {([
        { k: "all", l: "Todos" },

        { k: "warning", l: "⚠️ Atenção" },

        { k: "expired", l: "🔴 Vencidos" },
      ] as const).map(({ k, l }) => (
        <button
          key={k}
          onClick={() => setFilter(k)}
          className={stockFiltersClasses.tab}
          style={styles.tab(filter === k)}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
