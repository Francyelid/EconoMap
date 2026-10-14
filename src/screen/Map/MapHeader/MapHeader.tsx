import { ICONS } from "@/constants/icons"
import { mapHeaderClasses, createMapHeaderStyles } from "./MapHeader.styles"
import type { dmPalette } from "@/theme"
import type { MapView } from "../types"

type MapHeaderProps = {
  palette: ReturnType<typeof dmPalette>
  dark: boolean
  view: MapView
  onViewChange: (view: MapView) => void
}

export default function MapHeader({
  palette: p,
  dark,
  view,
  onViewChange: setView,
}: MapHeaderProps) {
  const styles = createMapHeaderStyles(p, dark)
  return (
    <div className={mapHeaderClasses.header} style={styles.header}>
      <h1 className={mapHeaderClasses.title} style={styles.primaryText}>
        Mapa de Mercados
      </h1>
      <p className={mapHeaderClasses.subtitle} style={styles.secondaryText}>
        Compare preços e distâncias
      </p>
      <div className={mapHeaderClasses.tabs} style={styles.tabs}>
        {(["map", "list"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={mapHeaderClasses.tab}
            style={styles.tab(view === v)}
          >
            {v === "map" ? <>{ICONS.map}  Mapa</> : <>{ICONS.clipboard}  Lista</>}
          </button>
        ))}
      </div>
    </div>
  )
}
