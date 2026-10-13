import {
  basketTotalClasses,
  createBasketTotalStyles,
} from "./BasketTotal.styles"

type BasketTotalProps = {
  productCount: number
  market: string
  total: number
  variation: number
}

export default function BasketTotal({
  productCount,
  market: calcMkt,
  total: lastVal,
  variation,
}: BasketTotalProps) {
  const styles = createBasketTotalStyles()
  return (
    <div className={basketTotalClasses.footer} style={styles.footer}>
      <div>
        <p
          className={basketTotalClasses.footerLabel}
          style={styles.footerLabel}
        >
          {productCount > 0
            ? `${productCount} produto${
                productCount !== 1 ? "s" : ""
              } · ${calcMkt.split(" ")[0]}`
            : "Selecione produtos"}
        </p>
        <p className={basketTotalClasses.footerTotal}>
          {productCount > 0 ? `R$ ${lastVal.toFixed(2)}` : "—"}
        </p>
      </div>
      {productCount > 0 && (
        <div className={basketTotalClasses.summary}>
          <p className={basketTotalClasses.caption} style={styles.footerLabel}>
            Variação (Jan→Ago)
          </p>
          <p
            className={basketTotalClasses.footerVariation}
            style={styles.footerVariation(variation)}
          >
            {variation >= 0 ? "▲" : "▼"} {Math.abs(variation).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  )
}
