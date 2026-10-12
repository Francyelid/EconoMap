import {
  createCommunityRecordsListStyles,
  communityRecordsListClasses,
} from "./CommunityRecordsList.styles"
import type { TODAY_ITEMS } from "@/mocks/TODAY_ITEMS"
import type { dmPalette } from "@/theme"

type TrendBadgeProps = {
  price: number
  prev: number
}

type CommunityRecordsListProps = {
  items: typeof TODAY_ITEMS
  palette: Pick<ReturnType<typeof dmPalette>, "bg" | "card" | "cardAlt" | "border" | "textPrimary" | "textSecondary" | "greenMuted">
}

export default function CommunityRecordsList({
  items,
  palette,
}: CommunityRecordsListProps) {
  const styles = createCommunityRecordsListStyles(palette)
  const groups: Record<string, typeof TODAY_ITEMS> = {}

  items.forEach((item) => {
    const key = `${item.time} · ${item.market}`

    if (!groups[key]) groups[key] = []

    groups[key].push(item)
  })

  function TrendBadge({ price, prev }: TrendBadgeProps) {
    const diff = price - prev

    const pct = prev > 0 ? ((diff / prev) * 100).toFixed(1) : "0.0"

    if (Math.abs(diff) < 0.01)
      return (
        <span
          className={communityRecordsListClasses.neutralBadge}
          style={styles.neutralBadge}
        >
          —
        </span>
      )

    return (
      <span
        className={communityRecordsListClasses.trendBadge}
        style={styles.trendBadge(diff)}
      >
        {diff > 0 ? "▲" : "▼"} {Math.abs(parseFloat(pct))}%
      </span>
    )
  }

  return (
    <div className={communityRecordsListClasses.results} style={styles.results}>
      {Object.keys(groups).length === 0 ? (
        <div
          className={communityRecordsListClasses.emptyState}
          style={styles.secondaryText}
        >
          <p className={communityRecordsListClasses.emptyIcon}>🔍</p>
          <p className={communityRecordsListClasses.emptyMessage}>
            Nenhum item encontrado
          </p>
        </div>
      ) : (
        Object.entries(groups).map(([key, items]) => (
          <div key={key} className={communityRecordsListClasses.group}>
            <div className={communityRecordsListClasses.groupHeader}>
              <span
                className={communityRecordsListClasses.groupLabel}
                style={styles.groupLabel}
              >
                {key}
              </span>
              <span
                className={communityRecordsListClasses.caption}
                style={styles.secondaryText}
              >
                {items[0].reports} relatos
              </span>
            </div>
            {items.map((item, i) => (
              <div
                key={i}
                className={communityRecordsListClasses.item}
                style={styles.item}
              >
                <div className={communityRecordsListClasses.details}>
                  <p
                    className={communityRecordsListClasses.product}
                    style={styles.primaryText}
                  >
                    {item.product}
                  </p>
                  <p
                    className={communityRecordsListClasses.subtitle}
                    style={styles.secondaryText}
                  >
                    1 {item.unit} · antes R$ {item.prevPrice.toFixed(2)}
                  </p>
                </div>
                <TrendBadge price={item.price} prev={item.prevPrice} />
                <p
                  className={communityRecordsListClasses.price}
                  style={styles.primaryText}
                >
                  R$&nbsp;{item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}
