import { ICONS } from "@/constants/icons"
import { clearHistoryClasses, clearHistoryStyles } from "./ClearHistory.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"

type ClearHistoryProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ClearHistory({ isOpen, onClose }: ClearHistoryProps) {
  const dark = useDark()
  const pal = dmPalette(dark)

  if (!isOpen) return null

  return (
    <div
      className={sharedClasses.overlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
    >
      <div
        className={sharedClasses.confirmationSheet}
        style={sharedStyles.cardBackground(pal)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={sharedClasses.confirmationHandle}
          style={sharedStyles.handle(pal)}
        />
        <div className={clearHistoryClasses.intro}>
          <div
            className={sharedClasses.dialogIcon}
            style={sharedStyles.dangerIconBackground(dark)}
          >
            {ICONS.delete}
          </div>
          <h3
            className={sharedClasses.dialogTitle}
            style={sharedStyles.sectionTitle(pal)}
          >
            Limpar Histórico
          </h3>
          <p
            className={sharedClasses.confirmationMessage}
            style={sharedStyles.secondaryText(pal)}
          >
            Esta ação irá apagar{" "}
            <strong style={sharedStyles.dangerText}>permanentemente</strong>{" "}
            todos os registros de compras, preços e estoque. Essa operação não
            pode ser desfeita.
          </p>
        </div>
        <div className={clearHistoryClasses.actions}>
          <button
            onClick={onClose}
            className={sharedClasses.animatedDialogButton}
            style={clearHistoryStyles.confirmButton}
          >
            Sim, limpar tudo
          </button>
          <button
            onClick={onClose}
            className={sharedClasses.dialogButton}
            style={sharedStyles.dialogCancelButton(pal)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
