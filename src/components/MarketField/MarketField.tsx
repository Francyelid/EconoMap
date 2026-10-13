import {
  marketFieldClasses,
  createMarketFieldStyles,
} from "./MarketField.styles"
import { dmPalette, useDark } from "@/theme"

type MarketFieldProps = {
  markets: string[]
  addMarket: string
  setAddMarket: (value: string) => void
  addMarketCustom: string
  setAddMarketCustom: (value: string) => void
}

export default function MarketField({
  markets,
  addMarket,
  setAddMarket,
  addMarketCustom,
  setAddMarketCustom,
}: MarketFieldProps) {
  const styles = createMarketFieldStyles(dmPalette(useDark()))
  return (
    <div>
      <label className={marketFieldClasses.label} style={styles.secondaryText}>
        Mercado
      </label>
      <select
        className={marketFieldClasses.input}
        style={styles.input}
        value={addMarket}
        onChange={(e) => setAddMarket(e.target.value)}
      >
        <option value="">Selecione um mercado...</option>
        {markets.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
        <option value="__custom__">+ Mercado não registrado ainda</option>
      </select>
      {addMarket === "__custom__" && (
        <input
          className={marketFieldClasses.customMarketInput}
          style={styles.customMarketInput}
          placeholder="Nome do mercado..."
          value={addMarketCustom}
          onChange={(e) => setAddMarketCustom(e.target.value)}
        />
      )}
    </div>
  )
}
