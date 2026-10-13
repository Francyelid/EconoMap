import CommunityRecordsHeader from "./CommunityRecordsHeader/CommunityRecordsHeader"
import CommunitySummary from "./CommunitySummary/CommunitySummary"
import CommunityFilters from "./CommunityFilters/CommunityFilters"
import type { CommunityPalette, TrendFilter } from "./types"
import CommunityRecordsList from "./CommunityRecordsList/CommunityRecordsList"
import {
  createCommunityRecordsStyles,
  communityRecordsClasses,
} from "./CommunityRecords.styles"

import { useState } from "react"

import { TODAY_ITEMS } from "@/mocks/TODAY_ITEMS"

type CommunityRecordsProps = {
  onClose: () => void

  dark: boolean

  palette: CommunityPalette
}

export default function CommunityRecords({
  onClose,
  dark,
  palette: pal,
}: CommunityRecordsProps) {
  const styles = createCommunityRecordsStyles(pal)

  const [search, setSearch] = useState("")

  const [mktFilter, setMktFilter] = useState("Todos")

  const [trendFilter, setTrendFilter] = useState<TrendFilter>("all")

  const [maxPrice, setMaxPrice] = useState("")

  const allMarkets = [
    "Todos",
    ...Array.from(new Set(TODAY_ITEMS.map((i) => i.market))),
  ]

  const filtered = TODAY_ITEMS.filter((item) => {
    const q = search.toLowerCase()

    if (
      q &&
      !item.product.toLowerCase().includes(q) &&
      !item.market.toLowerCase().includes(q)
    )
      return false

    if (mktFilter !== "Todos" && item.market !== mktFilter) return false

    if (maxPrice && item.price > parseFloat(maxPrice)) return false

    const diff = item.price - item.prevPrice

    if (trendFilter === "up" && diff <= 0) return false

    if (trendFilter === "down" && diff >= 0) return false

    return true
  })

  return (
    <div
      className={communityRecordsClasses.overlay}
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        className={communityRecordsClasses.sheet}
        style={styles.sheet}
        onClick={(e) => e.stopPropagation()}
      >
        <CommunityRecordsHeader palette={pal} onClose={onClose} />
        <CommunitySummary palette={pal} dark={dark} />
        <CommunityFilters
          palette={pal}
          dark={dark}
          search={search}
          setSearch={setSearch}
          mktFilter={mktFilter}
          setMktFilter={setMktFilter}
          trendFilter={trendFilter}
          setTrendFilter={setTrendFilter}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          allMarkets={allMarkets}
        />

        <CommunityRecordsList items={filtered} palette={pal} />
      </div>
    </div>
  )
}
