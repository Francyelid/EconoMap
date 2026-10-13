import {
  createRecentPurchaseCardStyles,
  recentPurchaseCardClasses,
} from "./RecentPurchaseCard.styles"
import type { RecentPurchase, RecentPurchasesPalette } from "../types"

type RecentPurchaseCardProps = {
  purchase: RecentPurchase
  palette: RecentPurchasesPalette
}

export default function RecentPurchaseCard({
  purchase,
  palette,
}: RecentPurchaseCardProps) {
  const styles = createRecentPurchaseCardStyles(palette)
  return (
    <div
      className={recentPurchaseCardClasses.purchaseCard}
      style={styles.purchaseCard}
    >
      <div className={recentPurchaseCardClasses.icon} style={styles.icon}>
        {purchase.emoji}
      </div>
      <div className={recentPurchaseCardClasses.details}>
        <p className={recentPurchaseCardClasses.market} style={styles.market}>
          {purchase.market}
        </p>
        <p
          className={recentPurchaseCardClasses.metadata}
          style={styles.metadata}
        >
          {purchase.date} · {purchase.items} itens
        </p>
      </div>
      <p className={recentPurchaseCardClasses.total} style={styles.accent}>
        R$&nbsp;{purchase.total.toFixed(2)}
      </p>
    </div>
  )
}
