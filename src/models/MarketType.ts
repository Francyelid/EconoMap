export const MARKET_TYPES = [
  "Hipermercado",
  "Minimercado",
  "Mercado de bairro",
  "Atacarejo",
  "Atacadista",
  "Mercearia",
  "Empório",
  "Hortifrúti",
  "Sacolão",
  "Açougue",
  "Peixaria",
  "Padaria",
  "Loja de conveniência",
  "Supermercado",
  "Mercado municipal",
  "Feira livre",
  "Mercado orgânico",
  "Mercado online",
] as const

export type MarketType = typeof MARKET_TYPES[number]
/** Uma seleção vazia representa todos os tipos. */
export type MarketTypeFilter = readonly MarketType[]
