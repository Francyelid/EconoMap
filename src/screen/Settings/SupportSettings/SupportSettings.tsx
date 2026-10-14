import { ICONS } from "@/constants/icons"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"
import SettingsSection from "@/components/SettingsSection/SettingsSection"
import SettingsRow from "@/components/SettingsRow/SettingsRow"
import SettingsDivider from "@/components/SettingsDivider/SettingsDivider"
type SupportSettingsProps = {
  onAbout: () => void
}

export default function SupportSettings({ onAbout }: SupportSettingsProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <SettingsSection title="Suporte">
      <SettingsRow
        icon={ICONS.info}
        label="Sobre o EconoMap"
        sublabel="Versão 1.0.0 · TCC Eng. Computação"
        onPress={onAbout}
      />
    </SettingsSection>
  )
}
