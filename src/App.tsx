import { useState } from "react"
import { DarkCtx } from "@/theme"
import AppContent from "@/app/AppContent"
import type { AppTab } from "@/app/types"
import AppShell from "@/components/AppShell/AppShell"
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<AppTab>("home")
  const [darkMode, setDarkMode] = useState(false)

  function handleLogout() {
    setLoggedIn(false)
    setTab("home")
  }

  return (
    <DarkCtx.Provider value={darkMode}>
      <AppShell
        navigation={
          loggedIn && <BottomNavigation tab={tab} onTabChange={setTab} />
        }
      >
        <AppContent
          loggedIn={loggedIn}
          tab={tab}
          darkMode={darkMode}
          onLogin={() => setLoggedIn(true)}
          onLogout={handleLogout}
          onTabChange={setTab}
          onToggleDark={() => setDarkMode((previous) => !previous)}
        />
      </AppShell>
    </DarkCtx.Provider>
  )
}
