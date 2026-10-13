import {
  logoutConfirmationClasses,
  logoutConfirmationStyles,
} from "./LogoutConfirmation.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

type LogoutConfirmationProps = {
  onLogout: () => void
  onClose: () => void
}

export default function LogoutConfirmation({
  onLogout,
  onClose,
}: LogoutConfirmationProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <div
      className={logoutConfirmationClasses.logoutOverlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
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

        <div className={logoutConfirmationClasses.logoutActions}>
          <button
            onClick={onLogout}
            className={sharedClasses.animatedDialogButton}
            style={logoutConfirmationStyles.confirmLogoutButton}
          >
            Sim, quero sair
          </button>
          <button
            onClick={onClose}
            className={sharedClasses.animatedDialogButton}
            style={sharedStyles.dialogCancelButton(pal)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
