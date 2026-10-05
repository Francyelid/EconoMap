import { createReceiptModalStyles, receiptModalClasses } from "./ReceiptModal.styles"
import NewReceiptQR from "./NewReceiptQR/NewReceiptQR"
import GreenHeader from "./GreenHeader"
import NewReceiptManual from "./NewReceiptManual/NewReceiptManual"
import type { ReceiptItem, ReceiptModalProps } from "./types"
import { useState } from "react"


export default function ReceiptModal({ onClose, palette: pal }: ReceiptModalProps) {
  const styles = createReceiptModalStyles(pal)
  const [step, setStep] = useState<"scan" | "manual" | "confirm">("scan")
  const [purchaseDate, setPurchaseDate] = useState("")
  const [storeName, setStoreName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [address, setAddress] = useState("")
  const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([{ id: "1", name: "", qty: "1", unit: "un", price: "", expiry: "" }])
  const [shareWithUsers, setShareWithUsers] = useState(true)

  function addItem() {
    setReceiptItems(prev => [...prev, { id: String(Date.now()), name: "", qty: "1", unit: "un", price: "", expiry: "" }])
  }

  function updateItem(id: string, field: keyof ReceiptItem, value: string) {
    setReceiptItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it))
  }

  function removeItem(id: string) {
    setReceiptItems(prev => prev.filter(it => it.id !== id))
  }


  return (
    <div className={receiptModalClasses.overlay} style={styles.overlay} onClick={onClose}>
      <div className={receiptModalClasses.sheet} style={styles.sheet} onClick={e => e.stopPropagation()}>

        {/* ── STEP: SCAN ─────────────────────────────────── */}
        {step === "scan" && (
          <NewReceiptQR
            palette={pal}
            onClose={onClose}
            onManual={() => setStep("manual")}
          />
        )}

        {/* ── STEP: MANUAL ───────────────────────────────── */}
        {step === "manual" && (
          <NewReceiptManual
            palette={pal}
            onClose={onClose}
            purchaseDate={purchaseDate}
            storeName={storeName}
            cnpj={cnpj}
            address={address}
            receiptItems={receiptItems}
            setPurchaseDate={setPurchaseDate}
            setStoreName={setStoreName}
            setCnpj={setCnpj}
            setAddress={setAddress}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
            onBack={() => setStep("scan")}
            onReview={() => setStep("confirm")}
          />
        )}

        {/* ── STEP: CONFIRM ──────────────────────────────── */}
        {step === "confirm" && (
          <>
            <GreenHeader onClose={onClose} title="Confirmar Registro" onBack={() => setStep("manual")}/>
            <div className={receiptModalClasses.content}>

              {/* Store info */}
              <div className={receiptModalClasses.storeCard} style={styles.card}>
                <p className={receiptModalClasses.sectionTitle} style={styles.mutedText}>Estabelecimento</p>
                <p className={receiptModalClasses.storeName} style={styles.primaryText}>{storeName || "—"}</p>
                {cnpj && <p className={receiptModalClasses.caption} style={styles.secondaryText}>CNPJ: {cnpj}</p>}
                {purchaseDate && <p className={receiptModalClasses.caption} style={styles.secondaryText}>Data: {purchaseDate}</p>}
                {address && <p className={receiptModalClasses.caption} style={styles.secondaryText}>{address}</p>}
              </div>

              {/* Items review */}
              <div className={receiptModalClasses.items}>
                <p className={receiptModalClasses.sectionTitle} style={styles.mutedText}>Itens ({receiptItems.length})</p>
                {receiptItems.map((item, idx) => (
                  <div key={item.id} className={receiptModalClasses.itemCard} style={styles.card}>
                    <div className={receiptModalClasses.details}>
                      <p className={receiptModalClasses.itemName} style={styles.primaryText}>{item.name || `Item ${idx + 1}`}</p>
                      <p className={receiptModalClasses.caption} style={styles.secondaryText}>
                        {item.qty} {item.unit} {item.price ? `· R$ ${item.price}` : ""} {item.expiry ? `· Val: ${item.expiry}` : ""}
                      </p>
                    </div>
                    <div className={receiptModalClasses.itemActions}>
                      <button onClick={() => setStep("manual")} className={receiptModalClasses.iconButton} style={styles.iconButton}>✏️</button>
                      <button onClick={() => removeItem(item.id)} className={receiptModalClasses.iconButton} style={styles.iconButton}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share toggle */}
              <div className={receiptModalClasses.shareCard} style={styles.card}>
                <div className={receiptModalClasses.shareDetails}>
                  <p className={receiptModalClasses.itemName} style={styles.primaryText}>Compartilhar com outros usuários</p>
                  <p className={receiptModalClasses.caption} style={styles.secondaryText}>Ajuda a comunidade com dados de preços</p>
                </div>
                <button
                  onClick={() => setShareWithUsers(p => !p)}
                  className={receiptModalClasses.toggle}
                  style={styles.toggle(shareWithUsers)}
                >
                  <span
                    className={receiptModalClasses.toggleThumb}
                    style={styles.toggleThumb(shareWithUsers)}
                  />
                </button>
              </div>
            </div>

            <div className={receiptModalClasses.footer}>
              <button
                onClick={onClose}
                className={receiptModalClasses.primaryButton}
                style={styles.primaryButton}
              >
                Salvar e Compartilhar
              </button>
              <button
                onClick={() => setStep("manual")}
                className={receiptModalClasses.secondaryButton}
                style={styles.secondaryButton}
              >
                Voltar para editar
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

