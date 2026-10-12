import {
  receiptActionClasses,
  receiptActionStyles,
} from "./ReceiptAction.styles"

export default function ReceiptAction({
  onRegisterReceipt,
}: {
  onRegisterReceipt: () => void
}) {
  return (
    <div className={receiptActionClasses.actionSection}>
      <button
        onClick={onRegisterReceipt}
        className={receiptActionClasses.primaryButton}
        style={receiptActionStyles.primaryButton}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
        Registrar Nota Fiscal
      </button>
    </div>
  )
}
