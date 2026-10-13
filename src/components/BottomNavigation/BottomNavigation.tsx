import { useDark } from "@/theme"
import type { AppTab, NavigationTab } from "@/app/types"
import NavigationIcon from "../NavigationIcon/NavigationIcon"
import {
  bottomNavigationClasses,
  bottomNavigationStyles,
} from "./BottomNavigation.styles"

const items = [
  { key: "home", label: "Início" },
  { key: "map", label: "Mapa" },
  { key: "prices", label: "Preços" },
  { key: "list", label: "Lista" },
  { key: "stock", label: "Estoque" },
] satisfies {
  key: NavigationTab
  label: string
}[]

type BottomNavigationProps = {
  tab: AppTab
  onTabChange: (tab: AppTab) => void
}

export default function BottomNavigation({
  tab,
  onTabChange,
}: BottomNavigationProps) {
  const dark = useDark()
  return (
    <nav
      className={bottomNavigationClasses.container}
      style={bottomNavigationStyles.container(dark)}
      aria-label="Navegação principal"
    >
      <div className={bottomNavigationClasses.items}>
        {items.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            aria-current={tab === key ? "page" : undefined}
            className={bottomNavigationClasses.item}
            style={bottomNavigationStyles.item(tab === key)}
          >
            <NavigationIcon name={key} active={tab === key} />
            <span
              className={bottomNavigationClasses.label}
              style={bottomNavigationStyles.label(tab === key)}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
