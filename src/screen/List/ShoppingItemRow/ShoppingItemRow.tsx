import { ICONS, CATEGORY_ICONS, MARKET_ICONS } from "@/constants/icons"

import { findRegisteredMarket } from "@/business/market"

import { MARKETS } from "@/services/demo/data"

import {
  shoppingItemRowClasses,
  createShoppingItemRowStyles,
} from "./ShoppingItemRow.styles"

import { dmPalette, useDark } from "@/theme"

import type { ShoppingItem } from "@/models/ShoppingItem"

type ShoppingItemRowProps = {
  item: ShoppingItem

  markets: string[]

  toggle: (id: string) => void

  remove: (id: string) => void

  setMarket: (id: string, market: string | undefined) => void

  mktPicker: string | null

  setMktPicker: (id: string | null) => void
}

export default function ShoppingItemRow({
  item,

  markets,

  toggle,

  remove,

  setMarket,

  mktPicker,

  setMktPicker,
}: ShoppingItemRowProps) {
  const styles = createShoppingItemRowStyles(dmPalette(useDark()))

  const marketType =
    item.marketType ?? findRegisteredMarket(MARKETS, item.market ?? "")?.type

  return (
    <div className={shoppingItemRowClasses.item} style={styles.card}>
      <button
        onClick={() => toggle(item.id)}
        className={shoppingItemRowClasses.checkbox}
        style={styles.checkbox(item.checked)}
      >
        {item.checked && (
          <svg
            width="9"
            height="9"
            viewBox="0 0 10 10"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <polyline points="1.5,5.5 4,8 8.5,2" />
          </svg>
        )}
      </button>
      <div
        className={shoppingItemRowClasses.category}
        style={styles.category(item.category)}
      />
      <div className={shoppingItemRowClasses.details}>
        <span
          className="flex items-center gap-1 text-[10px]"
          style={styles.secondaryText}
        >
          {CATEGORY_ICONS[item.category] ?? ICONS.package} {item.category}
        </span>
        <p
          className={shoppingItemRowClasses.itemName}
          style={styles.itemName(item.checked)}
        >
          {item.name}
        </p>
        <div className={shoppingItemRowClasses.metadata}>
          <span
            className={shoppingItemRowClasses.quantity}
            style={styles.secondaryText}
          >
            {item.qty} {item.unit}
          </span>
          {/* Market badge */}
          <button
            onClick={() => setMktPicker(mktPicker === item.id ? null : item.id)}
            className={shoppingItemRowClasses.marketBadge}
            style={styles.marketBadge(Boolean(item.market))}
          >
            {item.market ? (
              <>
                {marketType ? MARKET_ICONS[marketType] : ICONS.store}{" "}
                {item.market.split(" ")[0]}…
              </>
            ) : (
              "Sem mercado definido"
            )}
          </button>
        </div>
        {/* Inline market picker */}
        {mktPicker === item.id && (
          <div className={shoppingItemRowClasses.marketPicker}>
            <button
              onClick={() => {
                setMarket(item.id, undefined)

                setMktPicker(null)
              }}
              className={shoppingItemRowClasses.removeMarket}
              style={styles.removeMarket}
            >
              Sem mercado definido
            </button>
            {markets.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMarket(item.id, m)

                  setMktPicker(null)
                }}
                className={shoppingItemRowClasses.marketOption}
                style={styles.marketOption(item.market === m)}
              >
                {m.split(" ")[0]}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => remove(item.id)}
        className={shoppingItemRowClasses.removeItem}
      >
        ✕
      </button>
    </div>
  )
}
