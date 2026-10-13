import SettingsProfile from "./SettingsProfile/SettingsProfile"
import LogoutConfirmation from "./LogoutConfirmation/LogoutConfirmation"
import AccountSettings from "./AccountSettings/AccountSettings"
import NotificationSettings from "./NotificationSettings/NotificationSettings"
import PreferenceSettings from "./PreferenceSettings/PreferenceSettings"
import DataSettings from "./DataSettings/DataSettings"
import SupportSettings from "./SupportSettings/SupportSettings"
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

  return (
    <div style={settingsScreenStyles.screen(pal)}>
      <SettingsProfile onBack={onBack} />

      {/* ── Settings sections ──────────────────────────── */}
      <div className={settingsScreenClasses.sections}>
        <AccountSettings
          onEditProfile={() => setShowEditProfileModal(true)}
          onChangePassword={() => setShowChangePasswordModal(true)}
        />

        <NotificationSettings
          notifPrice={notifPrice}
          notifExpiry={notifExpiry}
          notifWeekly={notifWeekly}
          setNotifPrice={setNotifPrice}
          setNotifExpiry={setNotifExpiry}
          setNotifWeekly={setNotifWeekly}
        />

        <PreferenceSettings
          selectedCurrency={selectedCurrency}
          darkMode={darkMode}
          onToggleDark={onToggleDark}
          onSelectCurrency={() => setShowCurrencyModal(true)}
        />

        <DataSettings
          onExport={() => setShowExportModal(true)}
          onClear={() => setShowClearModal(true)}
        />

        <SupportSettings onAbout={() => setShowAboutModal(true)} />

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
        <LogoutConfirmation
          onLogout={onLogout}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  )
}
