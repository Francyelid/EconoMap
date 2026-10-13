import LoginScreen from "@/screen/Login/LoginScreen"
import HomeScreen from "@/screen/Home/HomeScreen"
import MapScreen from "@/screen/Map/MapScreen"
import PricesScreen from "@/screen/Prices/PricesScreen"
import ListScreen from "@/screen/List/ListScreen"
import StockScreen from "@/screen/Stock/StockScreen"
import SettingsScreen from "@/screen/Settings/SettingsScreen"
import type { AppTab } from "./types"

type AppContentProps = {
  loggedIn: boolean
  tab: AppTab
  darkMode: boolean
  onLogin: () => void
  onLogout: () => void
  onTabChange: (tab: AppTab) => void
  onToggleDark: () => void
}

export default function AppContent({
  loggedIn,
  tab,
  darkMode,
  onLogin,
  onLogout,
  onTabChange,
  onToggleDark,
}: AppContentProps) {
  if (!loggedIn) return <LoginScreen onLogin={onLogin} />
  switch (tab) {
    case "home":
      return <HomeScreen onOpenSettings={() => onTabChange("config")} />
    case "map":
      return <MapScreen />
    case "prices":
      return <PricesScreen />
    case "list":
      return <ListScreen />
    case "stock":
      return <StockScreen />
    case "config":
      return (
        <SettingsScreen
          onLogout={onLogout}
          onBack={() => onTabChange("home")}
          darkMode={darkMode}
          onToggleDark={onToggleDark}
        />
      )
  }
}
