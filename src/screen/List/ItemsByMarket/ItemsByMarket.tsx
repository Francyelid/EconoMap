import MarketItemGroup from "../MarketItemGroup/MarketItemGroup"
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
      {Object.entries(byMarket).map(([market, marketItems]) => (
        <MarketItemGroup
          key={market}
          market={market}
          items={marketItems}
          renderItem={renderItem}
        />
      ))}
      {noMarket.length > 0 && (
        <MarketItemGroup items={noMarket} renderItem={renderItem} />
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
