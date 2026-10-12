import {
  settingsScreenClasses,
  settingsScreenStyles,
} from "./SettingsScreen.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import AboutProject from "./AboutProject/AboutProject"
import ClearHistory from "./ClearHistory/ClearHistory"
import ExportData from "./ExportData/ExportData"
import SelectCurrency from "./SelectCurrency/SelectCurrency"
import ChangePassword from "./ChangePassword/ChangePassword"
import EditProfile from "./EditProfile/EditProfile"
import { useState } from "react"
import type { ReactNode } from "react"
import { dmPalette, useDark } from "@/theme"

export default function SettingsScreen({
  onLogout,
  onBack,
  darkMode = false,
  onToggleDark,
}: {
  onLogout: () => void
  onBack?: () => void
  darkMode?: boolean
  onToggleDark?: () => void
}) {
  const dark = useDark()
  const pal = dmPalette(dark)

  const [notifPrice, setNotifPrice] = useState(true)

  const [notifExpiry, setNotifExpiry] = useState(true)

  const [notifWeekly, setNotifWeekly] = useState(false)

  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const [showAboutModal, setShowAboutModal] = useState(false)

  const [showClearModal, setShowClearModal] = useState(false)

  const [showExportModal, setShowExportModal] = useState(false)

  const [showCurrencyModal, setShowCurrencyModal] = useState(false)

  const [selectedCurrency, setSelectedCurrency] = useState(
    "Real Brasileiro (R$)",
  )

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  function Toggle({ on, onToggle }: { on: boolean, onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className={settingsScreenClasses.toggle}
        style={settingsScreenStyles.toggle(on)}
      >
        <span
          className={settingsScreenClasses.toggleThumb}
          style={settingsScreenStyles.toggleThumb(on)}
        />
      </button>
    )
  }

  function SettingsRow({
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
          style={settingsScreenStyles.rowIcon(danger, dark, pal)}
        >
          {icon}
        </div>
        <div className={sharedClasses.details}>
          <p
            className={sharedClasses.emphasizedText}
            style={settingsScreenStyles.rowLabel(danger, pal)}
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
        <div
          className={settingsScreenClasses.row}
          style={settingsScreenStyles.row}
        >
          {inner}
        </div>
      )
    }

    return (
      <button
        onClick={onPress}
        className={settingsScreenClasses.interactiveRow}
        style={settingsScreenStyles.row}
      >
        {inner}
      </button>
    )
  }

  function Section({ title, children }: { title: string, children: ReactNode }) {
    return (
      <div>
        <p
          className={settingsScreenClasses.sectionLabel}
          style={sharedStyles.secondaryText(pal)}
        >
          {title}
        </p>
        <div
          className={settingsScreenClasses.section}
          style={sharedStyles.card(pal)}
        >
          {children}
        </div>
      </div>
    )
  }

  function Divider() {
    return (
      <div
        className={settingsScreenClasses.divider}
        style={settingsScreenStyles.divider(pal)}
      />
    )
  }

  return (
    <div style={settingsScreenStyles.screen(pal)}>
      {/* ── Profile hero ───────────────────────────────── */}
      <div
        className={settingsScreenClasses.hero}
        style={settingsScreenStyles.hero}
      >
        <div
          className={settingsScreenClasses.topDecoration}
          style={settingsScreenStyles.decoration}
        />
        <div
          className={settingsScreenClasses.bottomDecoration}
          style={settingsScreenStyles.decoration}
        />

        {/* Back button */}
        {onBack && (
          <button onClick={onBack} className={settingsScreenClasses.backButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="15,18 9,12 15,6" />
            </svg>
            <span className={settingsScreenClasses.backLabel}>Voltar</span>
          </button>
        )}

        <div className={settingsScreenClasses.profileRow}>
          {/* Avatar */}
          <div className={settingsScreenClasses.avatarContainer}>
            <div
              className={settingsScreenClasses.avatar}
              style={settingsScreenStyles.avatar}
            >
              AS
            </div>
            <button
              className={settingsScreenClasses.editAvatar}
              style={settingsScreenStyles.editAvatar}
            >
              ✏️
            </button>
          </div>

          {/* Info */}
          <div className={sharedClasses.details}>
            <h2
              className={settingsScreenClasses.profileName}
              style={sharedStyles.serifHeading}
            >
              Ana Silva
            </h2>
            <p
              className={settingsScreenClasses.profileEmail}
              style={settingsScreenStyles.profileMetadata}
            >
              ana.silva@email.com
            </p>
            <div className={settingsScreenClasses.badgeContainer}>
              <span
                className={settingsScreenClasses.badge}
                style={settingsScreenStyles.badge}
              >
                ✦ Conta Gratuita
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={settingsScreenClasses.stats}
          style={settingsScreenStyles.stats}
        >
          {[
            { label: "Compras", value: "23" },

            { label: "Produtos", value: "47" },

            { label: "Economia", value: "R$ 84" },
          ].map((s, i) => (
            <div
              key={i}
              className={settingsScreenClasses.stat}
              style={settingsScreenStyles.stat(i)}
            >
              <p
                className={settingsScreenClasses.statValue}
                style={sharedStyles.serifHeading}
              >
                {s.value}
              </p>
              <p
                className={settingsScreenClasses.statLabel}
                style={settingsScreenStyles.profileMetadata}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Settings sections ──────────────────────────── */}
      <div className={settingsScreenClasses.sections}>
        <Section title="Conta">
          <SettingsRow
            icon="👤"
            label="Editar perfil"
            sublabel="Nome, foto e dados pessoais"
            onPress={() => setShowEditProfileModal(true)}
          />
          <Divider />
          <SettingsRow
            icon="🔒"
            label="Alterar senha"
            sublabel="Segurança da conta"
            onPress={() => setShowChangePasswordModal(true)}
          />
        </Section>

        <Section title="Notificações">
          <SettingsRow
            icon="📈"
            label="Alertas de preço"
            sublabel="Avisa quando um produto subir ou cair"
            right={
              <Toggle
                on={notifPrice}
                onToggle={() => setNotifPrice((p) => !p)}
              />
            }
          />
          <Divider />
          <SettingsRow
            icon="⏰"
            label="Vencimentos próximos"
            sublabel="Lembrete 7 dias antes do vencimento"
            right={
              <Toggle
                on={notifExpiry}
                onToggle={() => setNotifExpiry((p) => !p)}
              />
            }
          />
          <Divider />
          <SettingsRow
            icon="📊"
            label="Resumo semanal"
            sublabel="Relatório de gastos toda segunda-feira"
            right={
              <Toggle
                on={notifWeekly}
                onToggle={() => setNotifWeekly((p) => !p)}
              />
            }
          />
        </Section>

        <Section title="Preferências">
          <SettingsRow
            icon="💱"
            label="Moeda"
            sublabel={selectedCurrency}
            onPress={() => setShowCurrencyModal(true)}
          />
          <Divider />
          <SettingsRow
            icon={darkMode ? "☀️" : "🌙"}
            label="Aparência"
            sublabel={darkMode ? "Modo noturno" : "Tema claro"}
            right={<Toggle on={darkMode} onToggle={() => onToggleDark?.()} />}
          />
        </Section>

        <Section title="Dados">
          <SettingsRow
            icon="⬇️"
            label="Exportar meus dados"
            sublabel="CSV com todas as compras"
            onPress={() => setShowExportModal(true)}
          />
          <Divider />
          <SettingsRow
            icon="🗑️"
            label="Limpar histórico"
            sublabel="Apaga todos os registros locais"
            danger
            onPress={() => setShowClearModal(true)}
          />
        </Section>

        <Section title="Suporte">
          <SettingsRow
            icon="ℹ️"
            label="Sobre o EconoMap"
            sublabel="Versão 1.0.0 · TCC Eng. Computação"
            onPress={() => setShowAboutModal(true)}
          />
        </Section>

        {/* Logout button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className={settingsScreenClasses.logoutButton}
          style={settingsScreenStyles.logoutButton}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c04830"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair da conta
        </button>

        <p
          className={settingsScreenClasses.footer}
          style={sharedStyles.mutedText(pal)}
        >
          EconoMap · Trabalho de Conclusão de Curso
        </p>
      </div>

      <AboutProject
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />

      <ClearHistory
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
      />

      <ExportData
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      {/* ── Logout confirmation modal ──────────────────── */}
      <SelectCurrency
        isOpen={showCurrencyModal}
        selectedCurrency={selectedCurrency}
        onSelect={setSelectedCurrency}
        onClose={() => setShowCurrencyModal(false)}
      />

      <ChangePassword
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />

      <EditProfile
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      />

      {showLogoutModal && (
        <div
          className={settingsScreenClasses.logoutOverlay}
          style={sharedStyles.dialogOverlay}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className={sharedClasses.confirmationSheet}
            style={sharedStyles.cardBackground(pal)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div
              className={sharedClasses.confirmationHandle}
              style={sharedStyles.handle(pal)}
            />

            <div className={sharedClasses.dialogIntro}>
              <div
                className={sharedClasses.dialogIcon}
                style={sharedStyles.dangerIconBackground(dark)}
              >
                👋
              </div>
              <h3
                className={sharedClasses.dialogTitle}
                style={sharedStyles.sectionTitle(pal)}
              >
                Saindo da conta
              </h3>
              <p
                className={sharedClasses.confirmationMessage}
                style={sharedStyles.secondaryText(pal)}
              >
                Tem certeza que deseja sair? Seus dados ficam salvos para quando
                voltar.
              </p>
            </div>

            <div className={settingsScreenClasses.logoutActions}>
              <button
                onClick={onLogout}
                className={sharedClasses.animatedDialogButton}
                style={settingsScreenStyles.confirmLogoutButton}
              >
                Sim, quero sair
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className={sharedClasses.animatedDialogButton}
                style={sharedStyles.dialogCancelButton(pal)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
