import { ICONS } from "@/constants/icons"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"
import SettingsSection from "@/components/SettingsSection/SettingsSection"
import SettingsRow from "@/components/SettingsRow/SettingsRow"
import SettingsDivider from "@/components/SettingsDivider/SettingsDivider"
import Toggle from "@/components/Toggle/Toggle"
type PreferenceSettingsProps = {
  selectedCurrency: string
  darkMode: boolean
  onToggleDark?: () => void
  onSelectCurrency: () => void
}

export default function PreferenceSettings({
  selectedCurrency,
  darkMode,
  onToggleDark,
  onSelectCurrency,
}: PreferenceSettingsProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <SettingsSection title="Preferências">
      <SettingsRow
        icon={ICONS.currency}
        label="Moeda"
        sublabel={selectedCurrency}
        onPress={onSelectCurrency}
      />
      <SettingsDivider />
      <SettingsRow
        icon={darkMode ? ICONS.sun : ICONS.moon}
        label="Aparência"
        sublabel={darkMode ? "Modo noturno" : "Tema claro"}
        right={<Toggle on={darkMode} onToggle={() => onToggleDark?.()} />}
      />
    </SettingsSection>
  )
}
