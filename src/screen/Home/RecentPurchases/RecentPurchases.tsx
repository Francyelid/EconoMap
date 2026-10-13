import RecentPurchasesList from "./RecentPurchasesList/RecentPurchasesList"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { recentPurchasesClasses } from "./RecentPurchases.styles"

import type { RecentPurchasesPalette } from "./types"

import WeeklyTip from "./WeeklyTip/WeeklyTip"

type RecentPurchasesProps = {
  palette: RecentPurchasesPalette

  onViewAll: () => void
}

export default function RecentPurchases({
  palette: p,
  onViewAll,
}: RecentPurchasesProps) {
  return (
    <div className={recentPurchasesClasses.section}>
      <SectionHeader
        title="Compras Recentes"
        palette={p}
        actionLabel="Ver todas"
        onAction={onViewAll}
      />

      <WeeklyTip />

      <RecentPurchasesList palette={p} />
    </div>
  )
}
