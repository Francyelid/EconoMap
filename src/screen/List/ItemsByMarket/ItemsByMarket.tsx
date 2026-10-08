import {
  itemsByMarketClasses,
  createItemsByMarketStyles,
} from "./ItemsByMarket.styles"
import { Fragment } from "react"
import type { ReactNode } from "react"
import type { ShoppingItem } from "@/interfaces/ShoppingItem"
import { dmPalette, useDark } from "@/theme"

type ItemsByMarketProps = {
  unchecked: ShoppingItem[]

  checked: ShoppingItem[]

  renderItem: (item: ShoppingItem) => ReactNode
}

export default function ItemsByMarket({
  unchecked,
  checked,
  renderItem,
}: ItemsByMarketProps) {
  const pal = dmPalette(useDark())

  // Group unchecked by market

  const byMarket: Record<string, ShoppingItem[]> = {}

  const noMarket: ShoppingItem[] = []

  unchecked.forEach((item) => {
    if (item.market) {
      if (!byMarket[item.market]) byMarket[item.market] = []

      byMarket[item.market].push(item)
    } else {
      noMarket.push(item)
    }
  })

  const styles = createItemsByMarketStyles(pal)

  return (
    <div className={itemsByMarketClasses.groups}>
      {Object.entries(byMarket).map(([mkt, mktItems]) => (
        <div key={mkt}>
          <div className={itemsByMarketClasses.groupHeader}>
            <span className={itemsByMarketClasses.icon}>🏪</span>
            <p
              className={itemsByMarketClasses.marketName}
              style={styles.accent}
            >
              {mkt}
            </p>
            <div
              className={itemsByMarketClasses.divider}
              style={styles.divider}
            />
            <p className={itemsByMarketClasses.subtotal} style={styles.accent}>
              R${" "}
              {mktItems
                .reduce((s, i) => s + (i.price ?? 0) * parseFloat(i.qty), 0)
                .toFixed(2)}
            </p>
          </div>
          <div className={itemsByMarketClasses.items}>
            {mktItems.map((item) => (
              <Fragment key={item.id}>{renderItem(item)}</Fragment>
            ))}
          </div>
        </div>
      ))}
      {noMarket.length > 0 && (
        <div>
          <div className={itemsByMarketClasses.groupHeader}>
            <span className={itemsByMarketClasses.icon}>❓</span>
            <p
              className={itemsByMarketClasses.marketName}
              style={styles.secondaryText}
            >
              Sem mercado definido
            </p>
            <div
              className={itemsByMarketClasses.divider}
              style={styles.divider}
            />
          </div>
          <div className={itemsByMarketClasses.items}>
            {noMarket.map((item) => (
              <Fragment key={item.id}>{renderItem(item)}</Fragment>
            ))}
          </div>
        </div>
      )}
      {checked.length > 0 && (
        <div>
          <p
            className={itemsByMarketClasses.completed}
            style={styles.secondaryText}
          >
            Concluídos
          </p>
          <div className={itemsByMarketClasses.items}>
            {checked.map((item) => (
              <Fragment key={item.id}>{renderItem(item)}</Fragment>
            ))}
          </div>
        </div>
      )}
      {unchecked.length === 0 && checked.length === 0 && (
        <div
          className={itemsByMarketClasses.empty}
          style={styles.secondaryText}
        >
          <p className={itemsByMarketClasses.emptyIcon}>🛒</p>
          <p className={itemsByMarketClasses.emptyTitle}>Lista vazia</p>
        </div>
      )}
    </div>
  )
}
