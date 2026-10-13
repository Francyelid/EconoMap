import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"
import SettingsSection from "@/components/SettingsSection/SettingsSection"
import SettingsRow from "@/components/SettingsRow/SettingsRow"
import SettingsDivider from "@/components/SettingsDivider/SettingsDivider"
type AccountSettingsProps = {
  onEditProfile: () => void
  onChangePassword: () => void
}

export default function AccountSettings({
  onEditProfile,
  onChangePassword,
}: AccountSettingsProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <SettingsSection title="Conta">
      <SettingsRow
        icon="👤"
        label="Editar perfil"
        sublabel="Nome, foto e dados pessoais"
        onPress={onEditProfile}
      />
      <SettingsDivider />
      <SettingsRow
        icon="🔒"
        label="Alterar senha"
        sublabel="Segurança da conta"
        onPress={onChangePassword}
      />
    </SettingsSection>
  )
}
