import type { ShoppingItem } from "@/models/ShoppingItem"

export const SHOPPING_INIT: ShoppingItem[] = [
  {
    id: "1",
    name: "Arroz",
    qty: "5",
    unit: "kg",
    price: 28.9,
    checked: false,
    category: "Mercearia básica",
    market: "Atacadão Sul",
    marketType: "Atacarejo",
  },

  {
    id: "2",
    name: "Feijão Carioca",
    qty: "1",
    unit: "kg",
    price: 7.9,
    checked: false,
    category: "Mercearia básica",
    market: "Atacadão Sul",
    marketType: "Atacarejo",
  },

  {
    id: "3",
    name: "Tomate",
    qty: "1",
    unit: "kg",
    price: 4.5,
    checked: true,
    category: "Hortifrúti",
    market: "Feira Livre Central",
    marketType: "Feira livre",
  },

  {
    id: "4",
    name: "Frango",
    qty: "2",
    unit: "kg",
    price: 19.8,
    checked: false,
    category: "Carnes e aves",
    market: undefined,
  },

  {
    id: "5",
    name: "Leite Integral",
    qty: "6",
    unit: "un",
    price: 5.2,
    checked: true,
    category: "Leites e derivados",
    market: "Supermercado Bom Preço",
    marketType: "Supermercado",
  },

  {
    id: "6",
    name: "Pão de Forma",
    qty: "1",
    unit: "un",
    price: 8.5,
    checked: false,
    category: "Padaria e confeitaria",
    market: "Supermercado Bom Preço",
    marketType: "Supermercado",
  },

  {
    id: "7",
    name: "Banana",
    qty: "1",
    unit: "kg",
    price: 3.2,
    checked: false,
    category: "Hortifrúti",
    market: "Feira Livre Central",
    marketType: "Feira livre",
  },
]
