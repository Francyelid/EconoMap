import { ICONS } from "@/constants/icons"
import {
  seasonalInsightClasses,
  createSeasonalInsightStyles,
} from "./SeasonalInsight.styles"
import { SEASONAL_HINTS } from "@/services/demo/data"
import { dmPalette, useDark } from "@/theme"

type SeasonalInsightProps = {
  product: string
}

export default function SeasonalInsight({ product }: SeasonalInsightProps) {
  const pal = dmPalette(useDark())

  const styles = createSeasonalInsightStyles(pal)

  return (
    <div className={seasonalInsightClasses.card} style={styles.card}>
      <p className={seasonalInsightClasses.title} style={styles.primaryText}>
        {ICONS.lightbulb} Insight Sazonal
      </p>
      <p
        className={seasonalInsightClasses.description}
        style={styles.secondaryText}
      >
        {SEASONAL_HINTS[product]}
      </p>
    </div>
  )
}
