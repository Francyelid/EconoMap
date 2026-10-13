import { authTabsClasses, authTabsStyles } from "./AuthTabs.styles"
import { dmPalette, useDark } from "@/theme"
import type { AuthMode } from "../types"
type AuthTabsProps = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
}

export default function AuthTabs({
  mode,
  onModeChange: setMode,
}: AuthTabsProps) {
  const pal = dmPalette(useDark())
  return (
    <div className={authTabsClasses.tabs} style={authTabsStyles.tabs(pal)}>
      {(["login", "register"] as const).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={authTabsClasses.tab(mode === m)}
          style={authTabsStyles.tab(pal, mode === m)}
        >
          {m === "login" ? "Entrar" : "Criar conta"}
        </button>
      ))}
    </div>
  )
}
