import { ICONS } from "@/constants/icons"
import RecentPurchaseCard from "../RecentPurchaseCard/RecentPurchaseCard"
import { recentPurchasesListClasses } from "./RecentPurchasesList.styles"
import type { RecentPurchase, RecentPurchasesPalette } from "../types"

const recents: RecentPurchase[] = [
  {
    date: "22/08",
    market: "Supermercado Bom Preço",
    total: 87.4,
    items: 8,
    icon: ICONS.store,
  },

  {
    date: "18/08",
    market: "Feira Livre Central",
    total: 42.1,
    items: 12,
    icon: ICONS.vegetables,
  },

  {
    date: "15/08",
    market: "Atacadão Sul",
    total: 215.6,
    items: 23,
    icon: ICONS.package,
  },
]

type RecentPurchasesListProps = {
  palette: RecentPurchasesPalette
  purchases?: RecentPurchase[]
}

export default function RecentPurchasesList({
  palette,
  purchases = recents,
}: RecentPurchasesListProps) {
  return (
    <div className={recentPurchasesListClasses.list}>
      {purchases.map((purchase, index) => (
        <RecentPurchaseCard key={index} purchase={purchase} palette={palette} />
      ))}
    </div>
  )
}
