import { createElement, type ReactNode } from "react"

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
} as const

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  Grãos: ICONS.grain,
  Condimentos: ICONS.condiment,
  Massas: ICONS.pasta,
  Laticínios: ICONS.milk,
  Enlatados: ICONS.cannedFood,
  Bebidas: ICONS.coffee,
  Outros: ICONS.package,
}

export const MARKET_ICONS: Record<string, ReactNode> = {
  Supermercado: ICONS.store,
  Feira: ICONS.vegetables,
  Atacado: ICONS.package,
  Mercado: ICONS.cart,
  Hortifruti: ICONS.apple,
}
