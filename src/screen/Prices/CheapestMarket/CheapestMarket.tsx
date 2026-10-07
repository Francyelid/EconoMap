import { cheapestMarketClasses } from "./CheapestMarket.styles"
type CheapestMarketProps = {
  market: string
  price: number
}

export default function CheapestMarket({ market, price }: CheapestMarketProps) {
  return (
    <div className={cheapestMarketClasses.card}>
      <p className={cheapestMarketClasses.label}>Mais barato agora</p>
      <p className={cheapestMarketClasses.market}>{market}</p>
      <p className={cheapestMarketClasses.price}>R$ {price.toFixed(2)}</p>
    </div>
  )
}
