import { ICONS } from "@/constants/icons"
import { Fragment } from "react"
import type { ReactNode } from "react"
import type { ShoppingItem } from "@/interfaces/ShoppingItem"
import { dmPalette, useDark } from "@/theme"
import {
  marketItemGroupClasses,
  createMarketItemGroupStyles,
} from "./MarketItemGroup.styles"

type MarketItemGroupProps = {
  market?: string
  items: ShoppingItem[]
  renderItem: (item: ShoppingItem) => ReactNode
}

export default function MarketItemGroup({
  market,
  items,
  renderItem,
}: MarketItemGroupProps) {
  const styles = createMarketItemGroupStyles(dmPalette(useDark()))
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * parseFloat(item.qty),
    0,
  )
  return (
    <div>
      <div className={marketItemGroupClasses.header}>
        <span className={marketItemGroupClasses.icon}>
          {market ? ICONS.store : ICONS.question}
        </span>
        <p
          className={marketItemGroupClasses.name}
          style={market ? styles.accent : styles.secondaryText}
        >
          {market ?? "Sem mercado definido"}
        </p>
        <div
          className={marketItemGroupClasses.divider}
          style={styles.divider}
        />
        {market && (
          <p className={marketItemGroupClasses.subtotal} style={styles.accent}>
            R$ {subtotal.toFixed(2)}
          </p>
        )}
      </div>
      <div className={marketItemGroupClasses.items}>
        {items.map((item) => (
          <Fragment key={item.id}>{renderItem(item)}</Fragment>
        ))}
      </div>
    </div>
  )
}
