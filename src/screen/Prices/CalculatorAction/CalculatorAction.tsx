import { ICONS } from "@/constants/icons"
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
      {ICONS.calculator} Calcular Compras
    </button>
  )
}
