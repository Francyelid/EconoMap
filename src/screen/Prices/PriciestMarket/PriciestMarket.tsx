import { priciestMarketClasses } from "./PriciestMarket.styles"
type PriciestMarketProps = {
  market: string
  price: number
}

export default function PriciestMarket({ market, price }: PriciestMarketProps) {
  return (
    <div className={priciestMarketClasses.card}>
      <p className={priciestMarketClasses.label}>Mais caro agora</p>
      <p className={priciestMarketClasses.market}>{market}</p>
      <p className={priciestMarketClasses.price}>R$ {price.toFixed(2)}</p>
    </div>
  )
}
