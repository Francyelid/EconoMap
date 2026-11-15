import { ICONS } from "@/constants/icons"

import { Fragment } from "react"

import type { ReactNode } from "react"

import type { ShoppingItem } from "@/models/ShoppingItem"

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
      </div>
      <div className={marketItemGroupClasses.items}>
        {items.map((item) => (
          <Fragment key={item.id}>{renderItem(item)}</Fragment>
        ))}
      </div>
    </div>
  )
}
