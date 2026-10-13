import { toggleClasses, toggleStyles } from "./Toggle.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

type ToggleProps = {
  on: boolean
  onToggle: () => void
}

export default function Toggle({ on, onToggle }: ToggleProps) {
  const dark = useDark()
  const pal = dmPalette(dark)

  return (
    <button
      onClick={onToggle}
      className={toggleClasses.toggle}
      style={toggleStyles.toggle(on)}
    >
      <span
        className={toggleClasses.toggleThumb}
        style={toggleStyles.toggleThumb(on)}
      />
    </button>
  )
}
