import SettingsScreen from "@/screen/Settings/SettingsScreen"
import StockScreen from "@/screen/Stock/StockScreen"
import ListScreen from "@/screen/List/ListScreen"
import PricesScreen from "@/screen/Prices/PricesScreen"
import MapScreen from "@/screen/Map/MapScreen"
import HomeScreen from "@/screen/Home/HomeScreen"
import { DarkCtx, dmPalette, useDark } from "@/theme"
import { useState } from "react"

import logoImg from "@/imports/Logo.png"
import logoCompleto from "@/imports/Logo_Completo.png"

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

// ─── SCREEN: LOGIN ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const dark = useDark(); const pal = dmPalette(dark)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPass, setShowPass] = useState(false)

  const canSubmit = email.trim() && password.trim() && (mode === "login" || name.trim())

  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(160deg, #2c4e37 0%, #3d6648 60%, #4e7f5a 100%)" }}>
      {/* Top blob */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "52%", background: pal.bg, borderRadius: "0 0 48px 48px" }}
      />

      {/* Logo + brand */}
      <div className="relative flex flex-col items-center pt-12 pb-6 flex-shrink-0">
        <img
          src={logoImg}
          alt="EconoMap – cesta de mercado dentro de um pin de localização"
          className="w-24 h-24 object-contain drop-shadow-xl"
        />
        <div className="flex items-center gap-2 mt-2">
          <div className="h-px w-6" style={{ background: "#4cb5b0" }}/>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(44,36,22,0.5)" }}>
            Compare • Economize • Decida Melhor
          </p>
          <div className="h-px w-6" style={{ background: "#e8a530" }}/>
        </div>
      </div>

      {/* Card */}
      <div className="relative flex-1 flex flex-col mx-4 rounded-3xl shadow-xl overflow-hidden" style={{ background: pal.card, border: `1px solid ${pal.border}` }}>
        {/* Tab switcher */}
        <div className="flex flex-shrink-0" style={{ borderBottom: `1px solid ${pal.divider}` }}>
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-4 text-sm font-bold transition-all ${mode === m ? "border-b-2" : ""}`}
              style={mode === m ? { color: "#3d6648", borderColor: "#3d6648" } : { color: pal.textSecondary }}
            >
              {m === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 flex flex-col gap-4">
          {/* Name field (register only) */}
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide" style={{ color: pal.textSecondary }}>Nome completo</label>
              <input
                type="text"
                placeholder="Ana Silva"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: pal.textSecondary }}>E-mail</label>
            <input
              type="email"
              placeholder="ana@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wide" style={{ color: pal.textSecondary }}>Senha</label>
              {mode === "login" && (
                <button className="text-xs font-semibold" style={{ color: "#3d6648" }}>Esqueci a senha</button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition"
                style={{ background: pal.inputBg, border: `1px solid ${pal.border}`, color: pal.textPrimary }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-1"
                style={{ color: pal.textSecondary }}
              >
                {showPass ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <p className="text-[10px] leading-relaxed" style={{ color: pal.textSecondary }}>
              Ao criar uma conta você concorda com os <span className="font-semibold" style={{ color: "#3d6648" }}>Termos de Uso</span> e a <span className="font-semibold" style={{ color: "#3d6648" }}>Política de Privacidade</span>.
            </p>
          )}

          {/* Primary CTA */}
          <button
            onClick={onLogin}
            disabled={!canSubmit}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all active:scale-95 mt-1"
            style={{ background: canSubmit ? "linear-gradient(135deg, #3d6648, #2c4e37)" : pal.border, color: canSubmit ? "#fff" : pal.textSecondary, boxShadow: canSubmit ? "0 4px 16px #3d664844" : "none" }}
          >
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: pal.divider }}/>
            <span className="text-[10px] font-semibold" style={{ color: pal.textSecondary }}>ou continue com</span>
            <div className="flex-1 h-px" style={{ background: pal.divider }}/>
          </div>

          {/* Google */}
          <button
            onClick={onLogin}
            className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 transition active:scale-95"
            style={{ background: pal.cardAlt, color: pal.textPrimary, border: `2px solid ${pal.border}` }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>
        </div>
      </div>

      {/* Bottom safe area spacer */}
      <div className="flex-shrink-0 h-6"/>
    </div>
  )
}

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
