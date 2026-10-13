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
        icon="⬇️"
        label="Exportar meus dados"
        sublabel="CSV com todas as compras"
        onPress={onExport}
      />
      <SettingsDivider />
      <SettingsRow
        icon="🗑️"
        label="Limpar histórico"
        sublabel="Apaga todos os registros locais"
        danger
        onPress={onClear}
      />
    </SettingsSection>
  )
}
