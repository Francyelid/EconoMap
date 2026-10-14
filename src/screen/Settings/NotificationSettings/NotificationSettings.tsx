import { ICONS } from "@/constants/icons"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"
import SettingsSection from "@/components/SettingsSection/SettingsSection"
import SettingsRow from "@/components/SettingsRow/SettingsRow"
import SettingsDivider from "@/components/SettingsDivider/SettingsDivider"
import Toggle from "@/components/Toggle/Toggle"
type NotificationSettingsProps = {
  notifPrice: boolean
  notifExpiry: boolean
  notifWeekly: boolean
  setNotifPrice: (update: (value: boolean) => boolean) => void
  setNotifExpiry: (update: (value: boolean) => boolean) => void
  setNotifWeekly: (update: (value: boolean) => boolean) => void
}

export default function NotificationSettings({
  notifPrice,
  notifExpiry,
  notifWeekly,
  setNotifPrice,
  setNotifExpiry,
  setNotifWeekly,
}: NotificationSettingsProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <SettingsSection title="Notificações">
      <SettingsRow
        icon={ICONS.chartUp}
        label="Alertas de preço"
        sublabel="Avisa quando um produto subir ou cair"
        right={
          <Toggle on={notifPrice} onToggle={() => setNotifPrice((p) => !p)} />
        }
      />
      <SettingsDivider />
      <SettingsRow
        icon={ICONS.alarm}
        label="Vencimentos próximos"
        sublabel="Lembrete 7 dias antes do vencimento"
        right={
          <Toggle on={notifExpiry} onToggle={() => setNotifExpiry((p) => !p)} />
        }
      />
      <SettingsDivider />
      <SettingsRow
        icon={ICONS.chart}
        label="Resumo semanal"
        sublabel="Relatório de gastos toda segunda-feira"
        right={
          <Toggle on={notifWeekly} onToggle={() => setNotifWeekly((p) => !p)} />
        }
      />
    </SettingsSection>
  )
}
