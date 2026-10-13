import {
  calculatorHeaderClasses,
  createCalculatorHeaderStyles,
} from "./CalculatorHeader.styles"

type CalculatorHeaderProps = {
  markets: string[]
  market: string
  onMarketChange: (market: string) => void
  onClose: () => void
}

export default function CalculatorHeader({
  markets: allMktNames,
  market: calcMkt,
  onMarketChange: setCalcMkt,
  onClose,
}: CalculatorHeaderProps) {
  const styles = createCalculatorHeaderStyles()
  return (
    <div className={calculatorHeaderClasses.header} style={styles.header}>
      <div className={calculatorHeaderClasses.headerRow}>
        <h2 className={calculatorHeaderClasses.title} style={styles.title}>
          Calcular Compras
        </h2>
        <button
          onClick={onClose}
          className={calculatorHeaderClasses.closeButton}
          style={styles.closeButton}
        >
          ✕
        </button>
      </div>
      <p className={calculatorHeaderClasses.caption} style={styles.caption}>
        Selecione produtos e um mercado para ver a variação da cesta ao longo do
        tempo
      </p>
      {/* Market selector */}
      <select
        className={calculatorHeaderClasses.marketSelect}
        style={styles.marketSelect}
        value={calcMkt}
        onChange={(e) => setCalcMkt(e.target.value)}
      >
        {allMktNames
          .filter((m) => m !== "Todos")
          .map((m) => (
            <option key={m} style={styles.marketOption}>
              {m}
            </option>
          ))}
      </select>
    </div>
  )
}
