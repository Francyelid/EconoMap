import { createRecentPurchasesStyles, recentPurchasesClasses } from "./RecentPurchases.styles"
import type { RecentPurchasesPalette } from "./RecentPurchases.styles"
import WeeklyTip from "./WeeklyTip/WeeklyTip"

type RecentPurchasesProps = {
  palette: RecentPurchasesPalette
  onViewAll: () => void
}

const recents = [
  { date: "22/08", market: "Supermercado Bom Preço", total: 87.40, items: 8, emoji: "🏪" },
  { date: "18/08", market: "Feira Livre Central", total: 42.10, items: 12, emoji: "🥬" },
  { date: "15/08", market: "Atacadão Sul", total: 215.60, items: 23, emoji: "📦" },
]

export default function RecentPurchases({ palette: p, onViewAll }: RecentPurchasesProps) {
  const styles = createRecentPurchasesStyles(p)

  return (
    <div className={recentPurchasesClasses.section}>
      <div className={recentPurchasesClasses.header}>
        <h2 className={recentPurchasesClasses.title} style={styles.title}>
          Compras Recentes
        </h2>
        <button onClick={onViewAll} className={recentPurchasesClasses.viewAllButton} style={styles.accent}>Ver todas</button>
      </div>

      <WeeklyTip/>

      <div className={recentPurchasesClasses.list}>
        {recents.map((r, i) => (
          <div
            key={i}
            className={recentPurchasesClasses.purchaseCard}
            style={styles.purchaseCard}
          >
            <div
              className={recentPurchasesClasses.icon}
              style={styles.icon}
            >
              {r.emoji}
            </div>
            <div className={recentPurchasesClasses.details}>
              <p className={recentPurchasesClasses.market} style={styles.market}>{r.market}</p>
              <p className={recentPurchasesClasses.metadata} style={styles.metadata}>{r.date} · {r.items} itens</p>
            </div>
            <p className={recentPurchasesClasses.total} style={styles.accent}>
              R$&nbsp;{r.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
