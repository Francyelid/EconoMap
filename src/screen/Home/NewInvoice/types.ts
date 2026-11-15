import type { ProductCategory } from "@/models/ProductCategory"

export type ReceiptModalProps = {
  onClose: () => void

  palette: {
    card: string

    cardAlt: string

    border: string

    inputBg: string

    textPrimary: string

    textSecondary: string

    textMuted: string
  }
}

export type ReceiptItem = {
  id: string

  name: string

  qty: string

  unit: string

  price: string

  expiry: string

  category: ProductCategory | ""
}
