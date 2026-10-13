export type AppTab = "home" | "map" | "prices" | "list" | "stock" | "config"
export type NavigationTab = Exclude<AppTab, "config">
