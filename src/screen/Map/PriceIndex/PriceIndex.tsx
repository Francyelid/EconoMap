import { priceIndexClasses, priceIndexStyles } from "./PriceIndex.styles"

type PriceIndexProps = {
  value: number
}

export default function PriceIndex({ value }: PriceIndexProps) {
  return (
    <div className={priceIndexClasses.section}>
      <div className={priceIndexClasses.header}>
        <span>Índice de preço</span>
        <span>{value}/100</span>
      </div>
      <div className={priceIndexClasses.track}>
        <div
          className={priceIndexClasses.bar}
          style={priceIndexStyles.bar(value)}
        />
      </div>
    </div>
  )
}
