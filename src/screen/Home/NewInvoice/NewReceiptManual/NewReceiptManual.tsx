import { createNewReceiptManualStyles, newReceiptManualClasses } from "./NewReceiptManual.styles"
import GreenHeader from "../GreenHeader"
import type { ReceiptItem, ReceiptModalProps } from "../types"

type NewReceiptManualProps = ReceiptModalProps & {
  purchaseDate: string
  storeName: string
  cnpj: string
  address: string
  receiptItems: ReceiptItem[]
  setPurchaseDate: (value: string) => void
  setStoreName: (value: string) => void
  setCnpj: (value: string) => void
  setAddress: (value: string) => void
  addItem: () => void
  updateItem: (id: string, field: keyof ReceiptItem, value: string) => void
  removeItem: (id: string) => void
  onBack: () => void
  onReview: () => void
}

export default function NewReceiptManual({
  palette: pal, onClose, purchaseDate, storeName, cnpj, address, receiptItems,
  setPurchaseDate, setStoreName, setCnpj, setAddress, addItem, updateItem, removeItem,
  onBack, onReview,
}: NewReceiptManualProps) {
  const styles = createNewReceiptManualStyles(pal)

  return (
    <>
      <GreenHeader title="Dados da Nota Fiscal" onBack={onBack} onClose={onClose}/>
      <div className={newReceiptManualClasses.content}>

        {/* Purchase info */}
        <div className={newReceiptManualClasses.section}>
          <p className={newReceiptManualClasses.sectionTitle} style={styles.mutedText}>Informações da compra</p>

          <div className={newReceiptManualClasses.field}>
            <label className={newReceiptManualClasses.label} style={styles.label}>Data da compra</label>
            <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}/>
          </div>

          <div className={newReceiptManualClasses.field}>
            <label className={newReceiptManualClasses.label} style={styles.label}>Local / Estabelecimento</label>
            <input type="text" placeholder="Nome do estabelecimento" value={storeName} onChange={e => setStoreName(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}/>
          </div>

          <div className={newReceiptManualClasses.field}>
            <label className={newReceiptManualClasses.label} style={styles.label}>CNPJ</label>
            <input type="text" placeholder="00.000.000/0000-00" value={cnpj} onChange={e => setCnpj(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}/>
          </div>

          <div className={newReceiptManualClasses.field}>
            <label className={newReceiptManualClasses.label} style={styles.label}>Endereço</label>
            <input type="text" placeholder="Rua, número, bairro" value={address} onChange={e => setAddress(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}/>
          </div>
        </div>

        {/* Items */}
        <div className={newReceiptManualClasses.section}>
          <p className={newReceiptManualClasses.sectionTitle} style={styles.mutedText}>Itens da nota</p>

          {receiptItems.map((item, idx) => (
            <div key={item.id} className={newReceiptManualClasses.itemCard} style={styles.itemCard}>
              <div className={newReceiptManualClasses.itemHeader}>
                <p className={newReceiptManualClasses.itemTitle} style={styles.secondaryText}>Item {idx + 1}</p>
                {receiptItems.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className={newReceiptManualClasses.label} style={styles.removeButton}>Remover</button>
                )}
              </div>

              <input type="text" placeholder="Nome do produto" value={item.name} onChange={e => updateItem(item.id, "name", e.target.value)}
                className={newReceiptManualClasses.itemInput}
                style={styles.input}/>

              <div className={newReceiptManualClasses.itemRow}>
                <input type="number" placeholder="Qtd" value={item.qty} onChange={e => updateItem(item.id, "qty", e.target.value)}
                  className={newReceiptManualClasses.quantityInput}
                  style={styles.input}/>
                <select value={item.unit} onChange={e => updateItem(item.id, "unit", e.target.value)}
                  className={newReceiptManualClasses.unitSelect}
                  style={styles.input}>
                  {["un","kg","g","L","ml","cx","pct"].map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <input type="number" placeholder="Preço unit." value={item.price} onChange={e => updateItem(item.id, "price", e.target.value)}
                  className={newReceiptManualClasses.priceInput}
                  style={styles.input}/>
              </div>

              <div className={newReceiptManualClasses.field}>
                <label className={newReceiptManualClasses.caption} style={styles.label}>Data de validade</label>
                <input type="date" value={item.expiry} onChange={e => updateItem(item.id, "expiry", e.target.value)}
                  className={newReceiptManualClasses.itemInput}
                  style={styles.input}/>
              </div>
            </div>
          ))}

          <button
            onClick={addItem}
            className={newReceiptManualClasses.addButton}
            style={styles.addButton}
          >
            <span className={newReceiptManualClasses.addIcon}>+</span> Adicionar item
          </button>
        </div>
      </div>

      <div className={newReceiptManualClasses.footer}>
        <button
          onClick={onReview}
          className={newReceiptManualClasses.primaryButton}
          style={styles.primaryButton}
        >
          Revisar e Salvar
        </button>
      </div>
    </>
  )
}
