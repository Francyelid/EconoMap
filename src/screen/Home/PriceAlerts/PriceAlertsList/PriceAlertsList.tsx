import {
  createPriceAlertsListStyles,
  priceAlertsListClasses,
} from "./PriceAlertsList.styles"
import type { dmPalette } from "@/theme"

type PriceAlertsListProps = {
  palette: Pick<ReturnType<typeof dmPalette>, "card" | "textPrimary">
}

const alerts = [
  {
    product: "Tomate",
    change: +42,
    tip: "Feira Central está 30% mais barata",
    up: true,
  },

  {
    product: "Feijão",
    change: -15,
    tip: "Ótima época para estocar no Atacadão",
    up: false,
  },

  {
    product: "Frango",
    change: +8,
    tip: "Considere o Atacadão nesta semana",
    up: true,
  },
]

export default function PriceAlertsList({ palette }: PriceAlertsListProps) {
  const styles = createPriceAlertsListStyles(palette)

  return (
    <div className={priceAlertsListClasses.list}>
      {alerts.map((a, i) => (
        <div
          key={i}
          className={priceAlertsListClasses.card}
          style={styles.card(a.up)}
        >
          <div
            className={priceAlertsListClasses.icon}
            style={styles.icon(a.up)}
          >
            {a.up ? "📈" : "📉"}
          </div>
          <div className={priceAlertsListClasses.details}>
            <div className={priceAlertsListClasses.productRow}>
              <p
                className={priceAlertsListClasses.product}
                style={styles.primaryText}
              >
                {a.product}
              </p>
              <span
                className={priceAlertsListClasses.badge}
                style={styles.badge(a.up)}
              >
                {a.up ? "+" : ""}
                {a.change}%
              </span>
            </div>
            <p className={priceAlertsListClasses.tip} style={styles.tip}>
              {a.tip}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
