import { useId } from "react"
import { ICONS } from "@/constants/icons"
import {
  priceFiltersClasses as classes,
  createPriceFiltersStyles,
} from "./PriceFilters.styles"
import type { dmPalette } from "@/theme"
import type { PricePeriod } from "../types"

type PriceFiltersProps = {
  palette: ReturnType<typeof dmPalette>
  maxPriceFilter: string
  setMaxPriceFilter: (value: string) => void
  periodFilter: PricePeriod
  setPeriodFilter: (value: PricePeriod) => void
  dateFrom: string
  setDateFrom: (value: string) => void
  dateTo: string
  setDateTo: (value: string) => void
}

export default function PriceFilters({
  palette,
  maxPriceFilter,
  setMaxPriceFilter,
  periodFilter,
  setPeriodFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}: PriceFiltersProps) {
  const styles = createPriceFiltersStyles(palette)
  const id = useId()
  const hasFilters =
    !!maxPriceFilter || periodFilter !== "all" || !!dateFrom || !!dateTo
  function clear() {
    setMaxPriceFilter("")
    setPeriodFilter("all")
    setDateFrom("")
    setDateTo("")
  }
  return (
    <div className={classes.filters}>
      <div className={classes.heading}>
        {hasFilters && (
          <button
            type="button"
            className={classes.clearButton}
            style={styles.accent}
            onClick={clear}
          >
            Limpar filtros
          </button>
        )}
      </div>
      <div className={classes.field}>
        <label
          htmlFor={`${id}-price`}
          className={classes.label}
          style={styles.secondaryText}
        >
          Preço máximo <span className="font-normal">(opcional)</span>
        </label>
        <div className={classes.search} style={styles.search}>
          <span className="text-xs font-semibold" style={styles.secondaryText}>
            R$
          </span>
          <input
            id={`${id}-price`}
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            className={classes.searchInput}
            style={styles.primaryText}
            placeholder="Sem limite"
            value={maxPriceFilter}
            onChange={(event) => setMaxPriceFilter(event.target.value)}
          />
        </div>
      </div>
      <fieldset className={classes.periodField} style={styles.divider}>
        <legend className={classes.label} style={styles.secondaryText}>
          Período do histórico
        </legend>
        <p className="text-[10px] leading-relaxed" style={styles.secondaryText}>
          Os dados de demonstração são mensais, de janeiro a agosto de 2026. O
          intervalo inclui os meses das datas escolhidas.
        </p>
        <div className={classes.periodGroup} style={styles.surface}>
          {([
            { key: "all", label: "Todo o período" },
            { key: "custom", label: "Escolher datas" },
          ] as const).map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={periodFilter === option.key}
              className={classes.periodButton}
              style={styles.periodButton(periodFilter === option.key)}
              onClick={() => setPeriodFilter(option.key)}
            >
              {option.key === "custom" && ICONS.calendar}
              {option.label}
            </button>
          ))}
        </div>
        {periodFilter === "custom" && (
          <div className={classes.dateRow}>
            <div className={classes.field}>
              <label
                htmlFor={`${id}-from`}
                className={classes.label}
                style={styles.secondaryText}
              >
                Data inicial
              </label>
              <input
                id={`${id}-from`}
                type="date"
                className={classes.dateInput}
                style={styles.input}
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(event) => setDateFrom(event.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label
                htmlFor={`${id}-to`}
                className={classes.label}
                style={styles.secondaryText}
              >
                Data final
              </label>
              <input
                id={`${id}-to`}
                type="date"
                className={classes.dateInput}
                style={styles.input}
                value={dateTo}
                min={dateFrom}
                onChange={(event) => setDateTo(event.target.value)}
              />
            </div>
          </div>
        )}
      </fieldset>
    </div>
  )
}
