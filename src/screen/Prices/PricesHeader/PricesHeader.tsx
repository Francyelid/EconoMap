import {
  pricesHeaderClasses,
  createPricesHeaderStyles,
} from "./PricesHeader.styles"
import type { dmPalette } from "@/theme"

type PricesHeaderProps = {
  palette: ReturnType<typeof dmPalette>
}

export default function PricesHeader({ palette: pal }: PricesHeaderProps) {
  const styles = createPricesHeaderStyles(pal)
  return (
    <div>
      <h1 className={pricesHeaderClasses.title} style={styles.primaryText}>
        Histórico de Preços
      </h1>
      <p className={pricesHeaderClasses.subtitle} style={styles.secondaryText}>
        Evolução por produto e mercado
      </p>
    </div>
  )
}
