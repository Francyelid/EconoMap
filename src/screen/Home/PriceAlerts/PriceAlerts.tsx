import { createPriceAlertsStyles, priceAlertsClasses } from "./PriceAlerts.styles"
type PriceAlertsProps = {
  palette: {
    card: string
    textPrimary: string
  }
  onViewAll: () => void
}

const alerts = [
  { product: "Tomate", change: +42, tip: "Feira Central está 30% mais barata", up: true },
  { product: "Feijão", change: -15, tip: "Ótima época para estocar no Atacadão", up: false },
  { product: "Frango", change: +8, tip: "Considere o Atacadão nesta semana", up: true },
]

export default function PriceAlerts({ palette: p, onViewAll }: PriceAlertsProps) {
  const styles = createPriceAlertsStyles(p)
  return (
    <div className={priceAlertsClasses.section}>
      <div className={priceAlertsClasses.header}>
        <h2 className={priceAlertsClasses.title} style={styles.title}>
          Alertas de Preço
        </h2>
        <button onClick={onViewAll} className={priceAlertsClasses.viewAllButton} style={styles.accent}>Ver todos</button>
      </div>
      <div className={priceAlertsClasses.list}>
        {alerts.map((a, i) => (
          <div
            key={i}
            className={priceAlertsClasses.card}
            style={styles.card(a.up)}
          >
            <div
              className={priceAlertsClasses.icon}
              style={styles.icon(a.up)}
            >
              {a.up ? "📈" : "📉"}
            </div>
            <div className={priceAlertsClasses.details}>
              <div className={priceAlertsClasses.productRow}>
                <p className={priceAlertsClasses.product} style={styles.primaryText}>{a.product}</p>
                <span
                  className={priceAlertsClasses.badge}
                  style={styles.badge(a.up)}
                >
                  {a.up ? "+" : ""}{a.change}%
                </span>
              </div>
              <p className={priceAlertsClasses.tip} style={styles.tip}>{a.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
