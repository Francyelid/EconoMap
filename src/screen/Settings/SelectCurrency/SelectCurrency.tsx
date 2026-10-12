import {
  selectCurrencyClasses,
  selectCurrencyStyles,
} from "./SelectCurrency.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"

type SelectCurrencyProps = {
  isOpen: boolean
  selectedCurrency: string
  onSelect: (currency: string) => void
  onClose: () => void
}

export default function SelectCurrency({
  isOpen,
  selectedCurrency,
  onSelect,
  onClose,
}: SelectCurrencyProps) {
  const pal = dmPalette(useDark())

  if (!isOpen) return null

  return (
    <div
      className={sharedClasses.overlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
    >
      <div
        className={selectCurrencyClasses.sheet}
        style={sharedStyles.cardBackground(pal)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={selectCurrencyClasses.handle}
          style={sharedStyles.handle(pal)}
        />
        <div className={selectCurrencyClasses.header}>
          <h3
            className={sharedClasses.formTitle}
            style={sharedStyles.sectionTitle(pal)}
          >
            Selecionar Moeda
          </h3>
        </div>
        <div
          className={selectCurrencyClasses.list}
          style={selectCurrencyStyles.list}
        >
          {[
            { code: "BRL", symbol: "R$", name: "Real Brasileiro" },

            { code: "USD", symbol: "$", name: "Dólar Americano" },

            { code: "EUR", symbol: "€", name: "Euro" },

            { code: "GBP", symbol: "£", name: "Libra Esterlina" },

            { code: "ARS", symbol: "$", name: "Peso Argentino" },

            { code: "CLP", symbol: "$", name: "Peso Chileno" },

            { code: "COP", symbol: "$", name: "Peso Colombiano" },

            { code: "PEN", symbol: "S/", name: "Sol Peruano" },

            { code: "UYU", symbol: "$U", name: "Peso Uruguaio" },

            { code: "PYG", symbol: "₲", name: "Guarani Paraguaio" },

            { code: "BOB", symbol: "Bs.", name: "Boliviano" },

            { code: "VES", symbol: "Bs.", name: "Bolívar Venezuelano" },

            { code: "MXN", symbol: "$", name: "Peso Mexicano" },
          ].map((currency, i, arr) => {
            const label = `${currency.name} (${currency.symbol})`

            const isSelected = selectedCurrency === label

            return (
              <div key={currency.code}>
                <button
                  onClick={() => {
                    onSelect(label)
                    onClose()
                  }}
                  className={selectCurrencyClasses.option}
                  style={selectCurrencyStyles.option(isSelected, pal)}
                >
                  <span
                    className={selectCurrencyClasses.symbol}
                    style={sharedStyles.brandText}
                  >
                    {currency.symbol}
                  </span>
                  <div className={sharedClasses.fill}>
                    <p
                      className={sharedClasses.emphasizedText}
                      style={sharedStyles.primaryText(pal)}
                    >
                      {currency.name}
                    </p>
                    <p
                      className={sharedClasses.smallText}
                      style={sharedStyles.secondaryText(pal)}
                    >
                      {currency.code}
                    </p>
                  </div>
                  {isSelected && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3d6648"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  )}
                </button>
                {i < arr.length - 1 && (
                  <div
                    className={selectCurrencyClasses.divider}
                    style={selectCurrencyStyles.divider(pal)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
