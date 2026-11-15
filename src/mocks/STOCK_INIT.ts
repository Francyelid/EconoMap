import type { StockItem } from "@/models/StockItem"

export const STOCK_INIT: StockItem[] = [
  {
    id: "1",
    name: "Arroz",
    qty: "3",
    unit: "kg",
    expiry: "2026-10-15",
    category: "Mercearia básica",
    purchasePrice: 28.9,
    market: "Supermercado Bom Preço",
    marketType: "Supermercado",
  },

  {
    id: "2",
    name: "Feijão",
    qty: "0,5",
    unit: "kg",
    expiry: "2026-09-05",
    category: "Mercearia básica",
    purchasePrice: 7.9,
    market: "Feira Livre Central",
    marketType: "Feira livre",
  },

  {
    id: "3",
    name: "Azeite",
    qty: "1",
    unit: "un",
    expiry: "2025-12-31",
    category: "Temperos e condimentos",
    purchasePrice: 32.5,
    market: "Atacadão Sul",
    marketType: "Atacarejo",
  },

  {
    id: "4",
    name: "Macarrão",
    qty: "2",
    unit: "un",
    expiry: "2026-08-30",
    category: "Massas e molhos",
    purchasePrice: 4.5,
    market: "Supermercado Bom Preço",
    marketType: "Supermercado",
  },

  {
    id: "5",
    name: "Leite em Pó",
    qty: "1",
    unit: "un",
    expiry: "2026-11-20",
    category: "Leites e derivados",
    purchasePrice: 29.8,
    market: "Atacadão Sul",
    marketType: "Atacarejo",
  },

  {
    id: "6",
    name: "Molho de Tomate",
    qty: "3",
    unit: "un",
    expiry: "2026-08-26",
    category: "Massas e molhos",
    purchasePrice: 3.8,
    market: "Mercadinho do Bairro",
    marketType: "Mercado de bairro",
  },

  {
    id: "7",
    name: "Café Torrado",
    qty: "1",
    unit: "un",
    expiry: "2025-08-10",
    category: "Cafés e chás",
    purchasePrice: 18.9,
    market: "Supermercado Bom Preço",
    marketType: "Supermercado",
  },
]
