import { settingsSectionClasses } from "./SettingsSection.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

type SettingsSectionProps = {
  title: string
  children: ReactNode
}

export default function SettingsSection({
  title,
  children,
}: SettingsSectionProps) {
  const dark = useDark()
  const pal = dmPalette(dark)

  return (
    <div>
      <p
        className={settingsSectionClasses.sectionLabel}
        style={sharedStyles.secondaryText(pal)}
      >
        {title}
      </p>
      <div
        className={settingsSectionClasses.section}
        style={sharedStyles.card(pal)}
      >
        {children}
      </div>
    </div>
  )
}
