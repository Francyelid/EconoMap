import { settingsRowClasses, settingsRowStyles } from "./SettingsRow.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

export default function SettingsRow({
  icon,
  label,
  sublabel,
  right,
  danger = false,
  onPress,
}: {
  icon: string
  label: string
  sublabel?: string
  right?: ReactNode
  danger?: boolean
  onPress?: () => void
}) {
  const dark = useDark()
  const pal = dmPalette(dark)

  const chevron = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c8bfb2"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9,18 15,12 9,6" />
    </svg>
  )

  const inner = (
    <>
      <div
        className={sharedClasses.itemIcon}
        style={settingsRowStyles.rowIcon(danger, dark, pal)}
      >
        {icon}
      </div>
      <div className={sharedClasses.details}>
        <p
          className={sharedClasses.emphasizedText}
          style={settingsRowStyles.rowLabel(danger, pal)}
        >
          {label}
        </p>
        {sublabel && (
          <p
            className={sharedClasses.metadata}
            style={sharedStyles.secondaryText(pal)}
          >
            {sublabel}
          </p>
        )}
      </div>
      {right ?? chevron}
    </>
  )

  // Use <div> when a toggle (button) is in the right slot to avoid button-in-button

  if (right) {
    return (
      <div className={settingsRowClasses.row} style={settingsRowStyles.row}>
        {inner}
      </div>
    )
  }

  return (
    <button
      onClick={onPress}
      className={settingsRowClasses.interactiveRow}
      style={settingsRowStyles.row}
    >
      {inner}
    </button>
  )
}
