import {
  createNewReceiptManualStyles,
  newReceiptManualClasses,
} from "./NewReceiptManual.styles"

import GreenHeader from "../GreenHeader"

import type { ReceiptItem, ReceiptModalProps } from "../types"

import { useState } from "react"

import type { Market } from "@/models/Market"

import type { MarketType } from "@/models/MarketType"

import { findRegisteredMarket } from "@/business/market"

import EstablishmentField from "./EstablishmentField"
import ProductNameField from "./ProductNameField"
import { PRODUCTS } from "@/services/demo/products"
import { isPositiveReceiptValue } from "@/business/receipt"

type NewReceiptManualProps = ReceiptModalProps & {
  purchaseDate: string

  storeName: string

  markets: readonly Market[]

  storeType: MarketType | ""

  setStoreType: (value: MarketType | "") => void

  onSelectMarket: (market: Market) => void

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
  palette: pal,
  onClose,
  purchaseDate,
  storeName,
  cnpj,
  address,
  receiptItems,

  setPurchaseDate,
  setStoreName,
  setCnpj,
  setAddress,
  addItem,
  updateItem,
  removeItem,

  onBack,
  onReview,

  markets,
  storeType,
  setStoreType,
  onSelectMarket,
}: NewReceiptManualProps) {
  const styles = createNewReceiptManualStyles(pal)

  const [typeError, setTypeError] = useState("")
  const [reviewAttempted, setReviewAttempted] = useState(false)

  function review() {
    setReviewAttempted(true)
    if (
      receiptItems.length === 0 ||
      receiptItems.some(
        (item) =>
          !isPositiveReceiptValue(item.qty) ||
          !isPositiveReceiptValue(item.price),
      )
    )
      return
    if (
      storeName.trim() &&
      !findRegisteredMarket(markets, storeName) &&
      !storeType
    ) {
      setTypeError("Selecione o tipo do novo estabelecimento para continuar.")

      return
    }

    onReview()
  }

  return (
    <>
      <GreenHeader
        title="Dados da Nota Fiscal"
        onBack={onBack}
        onClose={onClose}
      />
      <div className={newReceiptManualClasses.content}>
        {/* Purchase info */}
        <div className={newReceiptManualClasses.section}>
          <p
            className={newReceiptManualClasses.sectionTitle}
            style={styles.mutedText}
          >
            Informações da compra
          </p>

          <div className={newReceiptManualClasses.field}>
            <label
              className={newReceiptManualClasses.label}
              style={styles.label}
            >
              Data da compra
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}
            />
          </div>

          <EstablishmentField
            markets={markets}
            name={storeName}
            type={storeType}
            palette={pal}
            error={typeError}
            onNameChange={(name) => {
              setStoreName(name)
              setTypeError("")
            }}
            onSelect={(market) => {
              onSelectMarket(market)
              setTypeError("")
            }}
            onTypeChange={(type) => {
              setStoreType(type)
              setTypeError("")
            }}
          />

          <div className={newReceiptManualClasses.field}>
            <label
              className={newReceiptManualClasses.label}
              style={styles.label}
            >
              CNPJ
            </label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}
            />
          </div>

          <div className={newReceiptManualClasses.field}>
            <label
              className={newReceiptManualClasses.label}
              style={styles.label}
            >
              Endereço
            </label>
            <input
              type="text"
              placeholder="Rua, número, bairro"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={newReceiptManualClasses.input}
              style={styles.input}
            />
          </div>
        </div>

        {/* Items */}
        <div className={newReceiptManualClasses.section}>
          <p
            className={newReceiptManualClasses.sectionTitle}
            style={styles.mutedText}
          >
            Itens da nota
          </p>
          {reviewAttempted && receiptItems.length === 0 && (
            <p role="alert" className="text-xs text-red-600">
              Adicione pelo menos um item à nota.
            </p>
          )}

          {receiptItems.map((item, idx) => (
            <div
              key={item.id}
              className={newReceiptManualClasses.itemCard}
              style={styles.itemCard}
            >
              <div className={newReceiptManualClasses.itemHeader}>
                <p
                  className={newReceiptManualClasses.itemTitle}
                  style={styles.secondaryText}
                >
                  Item {idx + 1}
                </p>
                {receiptItems.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className={newReceiptManualClasses.label}
                    style={styles.removeButton}
                  >
                    Remover
                  </button>
                )}
              </div>

              <ProductNameField
                products={PRODUCTS}
                name={item.name}
                itemNumber={idx + 1}
                palette={pal}
                onNameChange={(name) => updateItem(item.id, "name", name)}
                onSelect={(product) => {
                  updateItem(item.id, "name", product.name)
                  updateItem(item.id, "unit", product.unit)
                }}
              />

              <div className={newReceiptManualClasses.itemRow}>
                <input
                  type="number"
                  placeholder="Qtd"
                  aria-label={`Quantidade do item ${idx + 1}`}
                  aria-invalid={
                    reviewAttempted && !isPositiveReceiptValue(item.qty)
                  }
                  min="0.001"
                  step="any"
                  required
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                  className={newReceiptManualClasses.quantityInput}
                  style={styles.input}
                />
                <select
                  aria-label={`Unidade do item ${idx + 1}`}
                  value={item.unit}
                  onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                  className={newReceiptManualClasses.unitSelect}
                  style={styles.input}
                >
                  {["un", "kg", "g", "L", "ml", "cx", "pct"].map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Preço unit."
                  aria-label={`Preço unitário do item ${idx + 1}`}
                  aria-invalid={
                    reviewAttempted && !isPositiveReceiptValue(item.price)
                  }
                  min="0.01"
                  step="0.01"
                  required
                  value={item.price}
                  onChange={(e) => updateItem(item.id, "price", e.target.value)}
                  className={newReceiptManualClasses.priceInput}
                  style={styles.input}
                />
              </div>

              {reviewAttempted && !isPositiveReceiptValue(item.qty) && (
                <p role="alert" className="text-xs text-red-600">
                  A quantidade deve ser maior que zero.
                </p>
              )}
              {reviewAttempted && !isPositiveReceiptValue(item.price) && (
                <p role="alert" className="text-xs text-red-600">
                  O preço unitário deve ser maior que zero.
                </p>
              )}

              <div className={newReceiptManualClasses.field}>
                <label
                  className={newReceiptManualClasses.caption}
                  style={styles.label}
                >
                  Data de validade
                </label>
                <input
                  type="date"
                  value={item.expiry}
                  onChange={(e) =>
                    updateItem(item.id, "expiry", e.target.value)
                  }
                  className={newReceiptManualClasses.itemInput}
                  style={styles.input}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addItem}
            className={newReceiptManualClasses.addButton}
            style={styles.addButton}
          >
            <span className={newReceiptManualClasses.addIcon}>+</span> Adicionar
            item
          </button>
        </div>
      </div>

      <div className={newReceiptManualClasses.footer}>
        <button
          onClick={review}
          className={newReceiptManualClasses.primaryButton}
          style={styles.primaryButton}
        >
          Revisar e Salvar
        </button>
      </div>
    </>
  )
}
