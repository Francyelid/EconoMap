import type { Market } from "@/interfaces/Market"

export const MARKETS: Market[] = [
  { id: "1", name: "Supermercado Bom Preço", address: "Av. Brasil, 1200", distance: 0.8, priceIndex: 62, type: "Supermercado", x: 33, y: 40, rating: 4.2, registros: 47 },
  { id: "2", name: "Feira Livre Central", address: "Rua das Flores, s/n", distance: 1.2, priceIndex: 41, type: "Feira", x: 63, y: 26, rating: 4.7, registros: 83 },
  { id: "3", name: "Atacadão Sul", address: "Rod. BR-101, km 45", distance: 4.5, priceIndex: 35, type: "Atacado", x: 78, y: 66, rating: 4.0, registros: 112 },
  { id: "4", name: "Mercadinho do Bairro", address: "Rua XV de Novembro, 88", distance: 0.3, priceIndex: 78, type: "Mercado", x: 20, y: 56, rating: 3.8, registros: 29 },
  { id: "5", name: "Hortifruti Verde Vida", address: "Alameda dos Ipês, 340", distance: 2.1, priceIndex: 48, type: "Hortifruti", x: 48, y: 72, rating: 4.5, registros: 61 },
]