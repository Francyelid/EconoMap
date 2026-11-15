import { createElement, type ReactNode } from "react"

import type { MarketType } from "@/models/MarketType"

import type { ProductCategory } from "@/models/ProductCategory"

// Flaticon Uicons: Thin Rounded. Herda a cor e o tamanho do texto.

function icon(name: string) {
  return createElement("i", {
    className: `fi fi-tr-${name} app-icon`,

    "aria-hidden": true,
  })
}

export const ICONS = {
  question: icon("question"),

  lightning: icon("bolt"),

  grain: icon("wheat"),

  condiment: icon("bottle"),

  pasta: icon("noodles"),

  milk: icon("milk"),

  cannedFood: icon("can-food"),

  coffee: icon("coffee"),

  package: icon("box-alt"),

  calendar: icon("calendar-days"),

  check: icon("check-circle"),

  cart: icon("shopping-cart-buyer"),

  edit: icon("pen-clip"),

  delete: icon("trash-empty"),

  clipboard: icon("clipboard-list"),

  store: icon("store-alt"),

  warning: icon("triangle-warning"),

  redCircle: icon("circle"),

  vegetables: icon("carrot"),

  chartUp: icon("chart-arrow-grow"),

  chartDown: icon("chart-arrow-down"),

  calculator: icon("calculator"),

  search: icon("search-alt"),

  map: icon("map-location-track"),

  departmentStore: icon("building"),

  location: icon("map-pin"),

  star: icon("icon-star"),

  community: icon("users"),

  info: icon("square-info"),

  apple: icon("apple"),

  lightbulb: icon("bulb"),

  download: icon("cloud-download-alt"),

  alarm: icon("alarm-clock"),

  chart: icon("chart-histogram"),

  leaf: icon("leaf"),

  camera: icon("camera"),

  wave: icon("hand-wave"),

  user: icon("person-simple"),

  lock: icon("lock-alt"),

  files: icon("folder-open"),

  currency: icon("exchange"),

  sun: icon("sun"),

  moon: icon("moon"),

  basket: icon("shopping-basket"),

  warehouse: icon("warehouse-alt"),

  meat: icon("meat"),

  fish: icon("fish"),

  bread: icon("bread"),

  marketplace: icon("marketplace"),

  browser: icon("browser"),

  cheese: icon("cheese"),

  snacks: icon("popcorn"),

  candy: icon("candy"),

  drink: icon("glass-citrus"),

  frozen: icon("snowflake"),

  cereal: icon("bowl-spoon"),

  hygiene: icon("soap"),

  cleaning: icon("spray-can-sparkles"),

  paper: icon("toilet-paper-blank"),

  baby: icon("baby"),

  pet: icon("paw"),

  utensils: icon("utensils"),
} as const

export const CATEGORY_ICONS: Record<ProductCategory, ReactNode> & Record<string, ReactNode> =
  {
    "Mercearia básica": ICONS.grain,

    "Massas e molhos": ICONS.pasta,

    "Cafés e chás": ICONS.coffee,

    "Leites e derivados": ICONS.milk,

    "Laticínios e frios": ICONS.cheese,

    "Carnes e aves": ICONS.meat,

    "Peixes e frutos do mar": ICONS.fish,

    Hortifrúti: ICONS.apple,

    "Padaria e confeitaria": ICONS.bread,

    "Biscoitos e snacks": ICONS.snacks,

    "Doces e sobremesas": ICONS.candy,

    Bebidas: ICONS.drink,

    Congelados: ICONS.frozen,

    "Enlatados e conservas": ICONS.cannedFood,

    "Temperos e condimentos": ICONS.condiment,

    "Cereais e matinais": ICONS.cereal,

    "Produtos naturais e dietéticos": ICONS.leaf,

    "Higiene pessoal": ICONS.hygiene,

    "Limpeza doméstica": ICONS.cleaning,

    "Papel e descartáveis": ICONS.paper,

    "Bebês e infantil": ICONS.baby,

    "Pet shop": ICONS.pet,

    "Utilidades domésticas": ICONS.utensils,

    // Compatibilidade com categorias dos mocks antigos de estoque e lista.

    Grãos: ICONS.grain,

    Condimentos: ICONS.condiment,

    Massas: ICONS.pasta,

    Laticínios: ICONS.milk,

    Enlatados: ICONS.cannedFood,

    Outros: ICONS.package,
  }

export const MARKET_ICONS: Record<MarketType, ReactNode> = {
  Supermercado: ICONS.store,

  Hipermercado: ICONS.departmentStore,

  Minimercado: ICONS.basket,

  "Mercado de bairro": ICONS.cart,

  Atacarejo: ICONS.package,

  Atacadista: ICONS.warehouse,

  Mercearia: ICONS.cannedFood,

  Empório: ICONS.star,

  Hortifrúti: ICONS.apple,

  Sacolão: ICONS.vegetables,

  Açougue: ICONS.meat,

  Peixaria: ICONS.fish,

  Padaria: ICONS.bread,

  "Loja de conveniência": ICONS.coffee,

  "Mercado municipal": ICONS.community,

  "Feira livre": ICONS.marketplace,

  "Mercado orgânico": ICONS.leaf,

  "Mercado online": ICONS.browser,
}
