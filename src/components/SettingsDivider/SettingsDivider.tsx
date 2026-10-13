import {
  settingsDividerClasses,
  settingsDividerStyles,
} from "./SettingsDivider.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

export default function SettingsDivider() {
  const dark = useDark()
  const pal = dmPalette(dark)

  return (
    <div
      className={settingsDividerClasses.divider}
      style={settingsDividerStyles.divider(pal)}
    />
  )
}
