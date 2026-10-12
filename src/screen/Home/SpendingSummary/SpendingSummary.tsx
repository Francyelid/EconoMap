import {
  spendingSummaryClasses,
  spendingSummaryStyles,
} from "./SpendingSummary.styles"
import { Fragment } from "react"
import Stat from "@/components/Stat/Stat"

const stats = [
  { label: "Produtos rastreados", value: "47" },
  { label: "Mercados visitados", value: "5" },
  { label: "Compras no mês", value: "3" },
]

export default function SpendingSummary() {
  return (
    <div
      className={spendingSummaryClasses.summaryCard}
      style={spendingSummaryStyles.summaryCard}
    >
      <p className={spendingSummaryClasses.summaryLabel}>Gasto em Agosto</p>
      <div className={spendingSummaryClasses.summaryRow}>
        <p
          className={spendingSummaryClasses.summaryValue}
          style={spendingSummaryStyles.heading}
        >
          R$&nbsp;345
          <span className={spendingSummaryClasses.summaryDecimals}>,00</span>
        </p>
        <span
          className={spendingSummaryClasses.badge}
          style={spendingSummaryStyles.badge}
        >
          −R$&nbsp;42 vs jul
        </span>
      </div>

      <div
        className={spendingSummaryClasses.statsRow}
        style={spendingSummaryStyles.statsRow}
      >
        {stats.map((stat, index) => (
          <Fragment key={stat.label}>
            {index > 0 && <div style={spendingSummaryStyles.statDivider} />}
            <Stat
              label={stat.label}
              value={stat.value}
              labelClassName={spendingSummaryClasses.statLabel}
              valueClassName={spendingSummaryClasses.statValue}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
