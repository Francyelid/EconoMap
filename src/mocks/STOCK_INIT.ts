import type { StockItem } from "@/interfaces/StockItem"

export const STOCK_INIT: StockItem[] = [
  { id: "1", name: "Arroz", qty: "3", unit: "kg", expiry: "2026-10-15", category: "Grãos", purchasePrice: 28.90, market: "Bom Preço" },
  { id: "2", name: "Feijão", qty: "0,5", unit: "kg", expiry: "2026-09-05", category: "Grãos", purchasePrice: 7.90, market: "Feira Central" },
  { id: "3", name: "Azeite", qty: "1", unit: "un", expiry: "2025-12-31", category: "Condimentos", purchasePrice: 32.50, market: "Atacadão" },
  { id: "4", name: "Macarrão", qty: "2", unit: "un", expiry: "2026-08-30", category: "Massas", purchasePrice: 4.50, market: "Bom Preço" },
  { id: "5", name: "Leite em Pó", qty: "1", unit: "un", expiry: "2026-11-20", category: "Laticínios", purchasePrice: 29.80, market: "Atacadão" },
  { id: "6", name: "Molho de Tomate", qty: "3", unit: "un", expiry: "2026-08-26", category: "Enlatados", purchasePrice: 3.80, market: "Mercadinho" },
  { id: "7", name: "Café Torrado", qty: "1", unit: "un", expiry: "2025-08-10", category: "Bebidas", purchasePrice: 18.90, market: "Bom Preço" },
]