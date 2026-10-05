import { createNewReceiptQRStyles, newReceiptQRClasses } from "./NewReceiptQR.styles"
import GreenHeader from "../GreenHeader"
import type { ReceiptModalProps } from "../types"

type NewReceiptQRProps = ReceiptModalProps & {
  onManual: () => void
}

export default function NewReceiptQR({ onClose, palette: pal, onManual }: NewReceiptQRProps) {
  const styles = createNewReceiptQRStyles(pal)
  return (
    <>
      <GreenHeader onClose={onClose} title="Registrar Nota Fiscal" onBack={onClose}/>
      <div className={newReceiptQRClasses.content}>
        {/* Camera viewfinder */}
        <div className={newReceiptQRClasses.viewfinder} style={styles.viewfinder}>
          {/* Corner brackets */}
          <svg className={newReceiptQRClasses.corners} width="240" height="240" viewBox="0 0 240 240" fill="none">
            <path d="M20,44 L20,20 L44,20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M196,20 L220,20 L220,44" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M20,196 L20,220 L44,220" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M220,196 L220,220 L196,220" stroke="white" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          {/* Scanning line */}
          <div
            className={newReceiptQRClasses.scanLine}
            style={styles.scanLine}
          />
          <div className={newReceiptQRClasses.scanIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4cb5b088" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/>
              <rect x="3" y="16" width="5" height="5" rx="1"/><rect x="11" y="11" width="3" height="3" rx="0.5"/>
              <line x1="16" y1="11" x2="21" y2="11"/><line x1="16" y1="16" x2="16" y2="21"/>
              <line x1="21" y1="16" x2="21" y2="21"/><line x1="11" y1="16" x2="11" y2="21"/>
            </svg>
          </div>
        </div>

        <p className={newReceiptQRClasses.instruction} style={styles.secondaryText}>
          Aponte para o QR Code da nota fiscal
        </p>
        <p className={newReceiptQRClasses.status} style={styles.mutedText}>
          Aguardando leitura...
        </p>
      </div>

      <div className={newReceiptQRClasses.footer}>
        <button
          onClick={onManual}
          className={newReceiptQRClasses.manualButton}
          style={styles.manualButton}
        >
          Inserir manualmente
        </button>
      </div>
    </>
  )
}
