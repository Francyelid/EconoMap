import { ICONS } from "@/constants/icons"
import { useDark } from "@/theme"
import { statusBarClasses, statusBarStyles } from "./StatusBar.styles"

export default function StatusBar() {
  return (
    <div
      className={statusBarClasses.bar}
      style={statusBarStyles.bar(useDark())}
    >
      <span className={statusBarClasses.time} style={statusBarStyles.text}>
        9:41
      </span>
      <div className={statusBarClasses.indicators} style={statusBarStyles.text}>
        <span>{ICONS.lightning}</span>
        <span className={statusBarClasses.battery}>92%</span>
      </div>
    </div>
  )
}
