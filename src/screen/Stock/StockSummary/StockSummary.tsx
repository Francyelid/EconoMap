import {
  stockSummaryClasses,
  createStockSummaryStyles,
} from "./StockSummary.styles"
import { dmPalette, useDark } from "@/theme"

type StockSummaryProps = {
  expiredCount: number
  warningCount: number
  okCount: number
}

export default function StockSummary({
  expiredCount,
  warningCount,
  okCount,
}: StockSummaryProps) {
  const dark = useDark()
  const styles = createStockSummaryStyles(dmPalette(dark), dark)

  return (
    <div className={stockSummaryClasses.summary}>
      <div
        className={stockSummaryClasses.summaryCard}
        style={styles.expiredCard}
      >
        <p
          className={stockSummaryClasses.summaryLabel}
          style={styles.expiredLabel}
        >
          Vencidos
        </p>
        <p className={stockSummaryClasses.title} style={styles.expiredValue}>
          {expiredCount}
        </p>
      </div>
      <div
        className={stockSummaryClasses.summaryCard}
        style={styles.warningCard}
      >
        <p
          className={stockSummaryClasses.summaryLabel}
          style={styles.warningLabel}
        >
          Em breve
        </p>
        <p className={stockSummaryClasses.title} style={styles.warningValue}>
          {warningCount}
        </p>
      </div>
      <div className={stockSummaryClasses.summaryCard} style={styles.okCard}>
        <p className={stockSummaryClasses.summaryLabel} style={styles.okLabel}>
          Em dia
        </p>
        <p className={stockSummaryClasses.title} style={styles.okValue}>
          {okCount}
        </p>
      </div>
    </div>
  )
}
