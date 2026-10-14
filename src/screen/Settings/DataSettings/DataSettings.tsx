import { ICONS } from "@/constants/icons"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"
import SettingsSection from "@/components/SettingsSection/SettingsSection"
import SettingsRow from "@/components/SettingsRow/SettingsRow"
import SettingsDivider from "@/components/SettingsDivider/SettingsDivider"
type DataSettingsProps = {
  onExport: () => void
  onClear: () => void
}

export default function DataSettings({ onExport, onClear }: DataSettingsProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <SettingsSection title="Dados">
      <SettingsRow
        icon={ICONS.download}
        label="Exportar meus dados"
        sublabel="CSV com todas as compras"
        onPress={onExport}
      />
      <SettingsDivider />
      <SettingsRow
        icon={ICONS.delete}
        label="Limpar histórico"
        sublabel="Apaga todos os registros locais"
        danger
        onPress={onClear}
      />
    </SettingsSection>
  )
}
