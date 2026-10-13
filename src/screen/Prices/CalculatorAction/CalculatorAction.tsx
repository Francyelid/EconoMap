import {
  calculatorActionClasses,
  createCalculatorActionStyles,
} from "./CalculatorAction.styles"

type CalculatorActionProps = {
  onOpen: () => void
}

export default function CalculatorAction({ onOpen }: CalculatorActionProps) {
  const styles = createCalculatorActionStyles()
  return (
    <button
      onClick={onOpen}
      className={calculatorActionClasses.calculatorButton}
      style={styles.calculatorButton}
    >
      🧮 Calcular Compras
    </button>
  )
}
