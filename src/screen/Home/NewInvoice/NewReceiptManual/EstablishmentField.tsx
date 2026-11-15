import { useId, useState } from "react"
import type { Market } from "@/models/Market"
import { MARKET_TYPES, type MarketType } from "@/models/MarketType"
import { findRegisteredMarket, suggestMarkets } from "@/business/market"
import { MARKET_ICONS } from "@/constants/icons"
import { MARKET_TYPE_DESCRIPTIONS } from "@/constants/marketTypes"
import type { ReceiptModalProps } from "../types"
import {
  createNewReceiptManualStyles,
  newReceiptManualClasses as classes,
} from "./NewReceiptManual.styles"

type Props = {
  markets: readonly Market[]
  name: string
  type: MarketType | ""
  palette: ReceiptModalProps["palette"]
  error: string
  onNameChange: (name: string) => void
  onSelect: (market: Market) => void
  onTypeChange: (type: MarketType | "") => void
}

export default function EstablishmentField({
  markets,
  name,
  type,
  palette,
  error,
  onNameChange,
  onSelect,
  onTypeChange,
}: Props) {
  const id = useId()
  const styles = createNewReceiptManualStyles(palette)
  const [focused, setFocused] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [active, setActive] = useState(-1)
  const suggestions = suggestMarkets(markets, name)
  const registered = findRegisteredMarket(markets, name)
  const open =
    focused && !dismissed && name.trim().length > 0 && suggestions.length > 0
  const isNew = name.trim().length > 0 && !registered

  function select(market: Market) {
    onSelect(market)
    setDismissed(true)
    setActive(-1)
  }

  return (
    <div className="space-y-3">
      <div
        className={classes.field}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false)
        }}
      >
        <label htmlFor={id} className={classes.label} style={styles.label}>
          Local / Estabelecimento
        </label>
        <input
          id={id}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? `${id}-suggestions` : undefined}
          aria-activedescendant={
            open && active >= 0 ? `${id}-option-${active}` : undefined
          }
          autoComplete="off"
          placeholder="Nome do estabelecimento"
          value={name}
          className={classes.input}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            onNameChange(event.target.value)
            setDismissed(false)
            setActive(-1)
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setDismissed(true)
              setActive(-1)
            }
            if (
              (event.key === "ArrowDown" || event.key === "ArrowUp") &&
              suggestions.length &&
              name.trim()
            ) {
              event.preventDefault()
              setDismissed(false)
              setActive((previous) =>
                event.key === "ArrowDown"
                  ? (previous + 1) % suggestions.length
                  : previous <= 0
                    ? suggestions.length - 1
                    : previous - 1,
              )
            }
            if (event.key === "Enter" && open && active >= 0) {
              event.preventDefault()
              select(suggestions[active])
            }
          }}
        />
        {open && (
          <ul
            id={`${id}-suggestions`}
            role="listbox"
            aria-label="Estabelecimentos cadastrados"
            className="max-h-48 overflow-y-auto rounded-xl border p-1 shadow-sm"
            style={{ background: palette.card, borderColor: palette.border }}
          >
            {suggestions.map((market, index) => (
              <li
                key={market.id}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={active === index}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5"
                style={{
                  background: active === index ? palette.cardAlt : undefined,
                  color: palette.textPrimary,
                }}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)}
                onClick={() => select(market)}
              >
                <span className="text-lg">{MARKET_ICONS[market.type]}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">
                    {market.name}
                  </span>
                  <span className="block text-xs" style={styles.secondaryText}>
                    {market.type} · {market.address}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
        {registered && (
          <p
            className="flex items-center gap-2 text-xs"
            style={styles.secondaryText}
          >
            {MARKET_ICONS[registered.type]} {registered.type} · Estabelecimento
            cadastrado
          </p>
        )}
      </div>

      {isNew && (
        <div className={classes.field}>
          <label
            htmlFor={`${id}-type`}
            className={classes.label}
            style={styles.label}
          >
            Tipo de estabelecimento <span aria-hidden="true">*</span>
          </label>
          <p className="mb-1 text-xs" style={styles.secondaryText}>
            Este estabelecimento ainda não foi cadastrado. Escolha o tipo.
          </p>
          <select
            id={`${id}-type`}
            required
            value={type}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={classes.input}
            style={styles.input}
            onChange={(event) => {
              const value = event.target.value
              onTypeChange(MARKET_TYPES.find((item) => item === value) ?? "")
            }}
          >
            <option value="">Selecione o tipo</option>
            {MARKET_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {type && (
            <p
              className="flex items-start gap-2 text-xs"
              style={styles.secondaryText}
            >
              {MARKET_ICONS[type]} {MARKET_TYPE_DESCRIPTIONS[type]}
            </p>
          )}
          {error && (
            <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
