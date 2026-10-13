import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

type AuthSubmitButtonProps = {
  enabled: boolean
  onClick: () => void
  children: ReactNode
}

export default function AuthSubmitButton({
  enabled,
  onClick,
  children,
}: AuthSubmitButtonProps) {
  const palette = dmPalette(useDark())
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      className={sharedClasses.authSubmitButton}
      style={sharedStyles.authSubmitButton(palette, enabled)}
    >
      {children}
    </button>
  )
}
