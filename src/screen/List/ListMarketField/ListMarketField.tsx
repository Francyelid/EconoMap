import {
  listMarketFieldClasses,
  createListMarketFieldStyles,
} from "./ListMarketField.styles"
import { dmPalette, useDark } from "@/theme"

type ListMarketFieldProps = {
  markets: string[]
  addMarket: string
  setAddMarket: (value: string) => void
  addMarketCustom: string
  setAddMarketCustom: (value: string) => void
}

export default function ListMarketField({
  markets,
  addMarket,
  setAddMarket,
  addMarketCustom,
  setAddMarketCustom,
}: ListMarketFieldProps) {
  const styles = createListMarketFieldStyles(dmPalette(useDark()))
  return (
    <div>
      <label
        className={listMarketFieldClasses.label}
        style={styles.secondaryText}
      >
        Mercado
      </label>
      <select
        className={listMarketFieldClasses.input}
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
          className={listMarketFieldClasses.customMarketInput}
          style={styles.customMarketInput}
          placeholder="Nome do mercado..."
          value={addMarketCustom}
          onChange={(e) => setAddMarketCustom(e.target.value)}
        />
      )}
    </div>
  )
}
