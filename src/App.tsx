import LoginScreen from "@/screen/Login/LoginScreen"
import SettingsScreen from "@/screen/Settings/SettingsScreen"
import StockScreen from "@/screen/Stock/StockScreen"
import ListScreen from "@/screen/List/ListScreen"
import PricesScreen from "@/screen/Prices/PricesScreen"
import MapScreen from "@/screen/Map/MapScreen"
import HomeScreen from "@/screen/Home/HomeScreen"
import { DarkCtx } from "@/theme"
import { useState } from "react"


// ─── TYPES ────────────────────────────────────────────────────────────────────

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────

// ─── UTILS ─────────────────────────────────────────────────────────────────────

// ─── SVG ICONS ─────────────────────────────────────────────────────────────────

function IcoHome({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill={on ? "#d4e6d9" : "none"}/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )
}

function IcoMap({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" fill={on ? "#d4e6d9" : "none"}/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  )
}

function IcoChart({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={on ? "#d4e6d9" : "none"}/>
      <line x1="7" y1="17" x2="7" y2="11"/>
      <line x1="12" y1="17" x2="12" y2="5"/>
      <line x1="17" y1="17" x2="17" y2="8"/>
    </svg>
  )
}

function IcoList({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" fill={on ? "#d4e6d9" : "none"}/>
      <line x1="8" y1="8" x2="17" y2="8"/>
      <line x1="8" y1="12" x2="17" y2="12"/>
      <line x1="8" y1="16" x2="13" y2="16"/>
      <circle cx="5.5" cy="8" r="1" fill={c} stroke="none"/>
      <circle cx="5.5" cy="12" r="1" fill={c} stroke="none"/>
      <circle cx="5.5" cy="16" r="1" fill={c} stroke="none"/>
    </svg>
  )
}

function IcoBox({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill={on ? "#d4e6d9" : "none"}/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function IcoSettings({ on }: { on: boolean }) {
  const c = on ? "#3d6648" : "#9c8e7e"
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill={on ? "#d4e6d9" : "none"}/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )
}

// ─── SCREEN: HOME ──────────────────────────────────────────────────────────────

// ─── APP SHELL ─────────────────────────────────────────────────────────────────

type Tab = "home" | "map" | "prices" | "list" | "stock" | "config"

const NAV = [
  { key: "home" as Tab,   label: "Início",  Icon: IcoHome  },
  { key: "map" as Tab,    label: "Mapa",    Icon: IcoMap   },
  { key: "prices" as Tab, label: "Preços",  Icon: IcoChart },
  { key: "list" as Tab,   label: "Lista",   Icon: IcoList  },
  { key: "stock" as Tab,  label: "Estoque", Icon: IcoBox   },
]

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<Tab>("home")
  const [darkMode, setDarkMode] = useState(false)

  function handleLogout() {
    setLoggedIn(false)
    setTab("home")
  }

  const dm = darkMode
  // Dark mode palette overrides
  const shellBg    = dm ? "#1a1a2e" : "#ede8df"
  const statusBg   = dm ? "#0f1723" : "#3d6648"
  const navBg      = dm ? "#1e2235" : "#fff"
  const navBorder  = dm ? "#2e3550" : "#e0d9cd"

  return (
    <DarkCtx.Provider value={darkMode}>
    <div className="min-h-screen flex items-center justify-center p-0 md:p-6" style={{ background: dm ? "#0d1117" : "#e2e8f0" }}>
      <div
        className="w-full md:max-w-sm flex flex-col relative overflow-hidden"
        style={{ background: shellBg, height: "100dvh", maxHeight: "100dvh" }}
      >
        {/* Status bar */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between flex-shrink-0" style={{ background: statusBg }}>
          <span className="text-xs font-bold font-mono" style={{ color: "#a8c9b0" }}>9:41</span>
          <div className="flex items-center gap-1 text-xs" style={{ color: "#a8c9b0" }}>
            <span>⚡</span>
            <span className="font-mono font-semibold">92%</span>
          </div>
        </div>

        {/* Screen */}
        <div className="flex-1 overflow-y-auto">
          {!loggedIn && <LoginScreen onLogin={() => setLoggedIn(true)}/>}
          {loggedIn && tab === "home"   && <HomeScreen onOpenSettings={() => setTab("config")}/>}
          {loggedIn && tab === "map"    && <MapScreen/>}
          {loggedIn && tab === "prices" && <PricesScreen/>}
          {loggedIn && tab === "list"   && <ListScreen/>}
          {loggedIn && tab === "stock"  && <StockScreen/>}
          {loggedIn && tab === "config" && <SettingsScreen onLogout={handleLogout} onBack={() => setTab("home")} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)}/>}
        </div>

        {/* Bottom nav */}
        {loggedIn && <div className="px-1 pt-2 pb-3 flex-shrink-0" style={{ background: navBg, borderTop: `1px solid ${navBorder}` }}>
          <div className="flex">
            {NAV.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex-1 flex flex-col items-center gap-1 py-1 rounded-xl transition-all"
                style={{ background: tab === key ? "#d4e6d9" : "transparent" }}
              >
                <Icon on={tab === key}/>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: tab === key ? "#3d6648" : "#9c8e7e" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>}
      </div>
    </div>
    </DarkCtx.Provider>
  )
}
