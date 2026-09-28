import type { ShoppingItem } from "@/interfaces/ShoppingItem"

export const SHOPPING_INIT: ShoppingItem[] = [
  { id: "1", name: "Arroz", qty: "5", unit: "kg", price: 28.90, checked: false, category: "Grãos", market: "Atacadão Sul" },
  { id: "2", name: "Feijão Carioca", qty: "1", unit: "kg", price: 7.90, checked: false, category: "Grãos", market: "Atacadão Sul" },
  { id: "3", name: "Tomate", qty: "1", unit: "kg", price: 4.50, checked: true, category: "Hortifruti", market: "Feira Livre Central" },
  { id: "4", name: "Frango", qty: "2", unit: "kg", price: 19.80, checked: false, category: "Carnes", market: undefined },
  { id: "5", name: "Leite Integral", qty: "6", unit: "un", price: 5.20, checked: true, category: "Laticínios", market: "Supermercado Bom Preço" },
  { id: "6", name: "Pão de Forma", qty: "1", unit: "un", price: 8.50, checked: false, category: "Padaria", market: "Supermercado Bom Preço" },
  { id: "7", name: "Banana", qty: "1", unit: "kg", price: 3.20, checked: false, category: "Hortifruti", market: "Feira Livre Central" },
]