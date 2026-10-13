import PriceAlertsList from "./PriceAlertsList/PriceAlertsList"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { priceAlertsClasses } from "./PriceAlerts.styles"

type PriceAlertsProps = {
  palette: {
    card: string

    textPrimary: string
  }

  onViewAll: () => void
}

export default function PriceAlerts({
  palette: p,
  onViewAll,
}: PriceAlertsProps) {
  return (
    <div className={priceAlertsClasses.section}>
      <SectionHeader
        title="Alertas de Preço"
        palette={p}
        actionLabel="Ver todos"
        onAction={onViewAll}
      />
      <PriceAlertsList palette={p} />
    </div>
  )
}
