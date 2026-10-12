import {
  changePasswordClasses,
  changePasswordStyles,
} from "./ChangePassword.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"

type ChangePasswordProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ChangePassword({
  isOpen,
  onClose,
}: ChangePasswordProps) {
  const pal = dmPalette(useDark())
  // Change password modal state

  const [currentPwd, setCurrentPwd] = useState("")

  const [newPwd, setNewPwd] = useState("")

  const [confirmPwd, setConfirmPwd] = useState("")

  const [showCurrentPwd, setShowCurrentPwd] = useState(false)

  const [showNewPwd, setShowNewPwd] = useState(false)

  const [showConfirmPwd, setShowConfirmPwd] = useState(false)

  const [pwdError, setPwdError] = useState("")

  const isPwdValid =
    newPwd.length >= 8 && newPwd === confirmPwd && currentPwd.length > 0

  function handleSavePwd() {
    if (newPwd.length < 8) {
      setPwdError("A nova senha deve ter pelo menos 8 caracteres.")
      return
    }

    if (newPwd !== confirmPwd) {
      setPwdError("As senhas não coincidem.")
      return
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={sharedClasses.overlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
    >
      <div
        className={changePasswordClasses.sheet}
        style={sharedStyles.cardBackground(pal)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={sharedClasses.compactDialogHandle}
          style={sharedStyles.handle(pal)}
        />
        <h3
          className={changePasswordClasses.title}
          style={sharedStyles.sectionTitle(pal)}
        >
          Alterar Senha
        </h3>
        <div className={sharedClasses.spaciousList}>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Senha atual
            </label>
            <div className={sharedClasses.relativeContainer}>
              <input
                type={showCurrentPwd ? "text" : "password"}
                value={currentPwd}
                onChange={(e) => {
                  setCurrentPwd(e.target.value)
                  setPwdError("")
                }}
                placeholder="••••••••"
                className={changePasswordClasses.input}
                style={sharedStyles.input(pal)}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPwd((v) => !v)}
                className={changePasswordClasses.visibilityButton}
                style={sharedStyles.secondaryText(pal)}
              >
                {showCurrentPwd ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Nova senha
            </label>
            <div className={sharedClasses.relativeContainer}>
              <input
                type={showNewPwd ? "text" : "password"}
                value={newPwd}
                onChange={(e) => {
                  setNewPwd(e.target.value)
                  setPwdError("")
                }}
                placeholder="••••••••"
                className={changePasswordClasses.input}
                style={sharedStyles.input(pal)}
              />
              <button
                type="button"
                onClick={() => setShowNewPwd((v) => !v)}
                className={changePasswordClasses.visibilityButton}
                style={sharedStyles.secondaryText(pal)}
              >
                {showNewPwd ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Confirmar nova senha
            </label>
            <div className={sharedClasses.relativeContainer}>
              <input
                type={showConfirmPwd ? "text" : "password"}
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value)
                  setPwdError("")
                }}
                placeholder="••••••••"
                className={changePasswordClasses.input}
                style={sharedStyles.input(pal)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd((v) => !v)}
                className={changePasswordClasses.visibilityButton}
                style={sharedStyles.secondaryText(pal)}
              >
                {showConfirmPwd ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>
          {pwdError && (
            <p
              className={sharedClasses.textButton}
              style={sharedStyles.dangerText}
            >
              {pwdError}
            </p>
          )}
        </div>
        <div className={changePasswordClasses.actions}>
          <button
            onClick={onClose}
            className={changePasswordClasses.cancelButton}
            style={sharedStyles.secondaryButton(pal)}
          >
            Cancelar
          </button>
          <button
            onClick={handleSavePwd}
            disabled={!isPwdValid}
            className={changePasswordClasses.saveButton}
            style={changePasswordStyles.saveButton(isPwdValid, pal)}
          >
            Salvar senha
          </button>
        </div>
      </div>
    </div>
  )
}
