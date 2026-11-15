import { useState } from "react"
import type { ProductCategory } from "@/models/ProductCategory"
import type { MarketType } from "@/models/MarketType"
import { findRegisteredProduct } from "@/business/product"
import { findRegisteredMarket } from "@/business/market"
import { isPositiveReceiptValue } from "@/business/receipt"
import { PRODUCTS } from "@/services/demo/products"
import { MARKETS } from "@/services/demo/data"

export default function useItemRegistration({
  allowUnassignedMarket = false,
} = {}) {
  const [unassignedMarket, setUnassignedMarket] = useState(
    allowUnassignedMarket,
  )
  const [name, setName] = useState("")
  const [category, setCategory] = useState<ProductCategory | "">("")
  const [market, setMarket] = useState("")
  const [marketType, setMarketType] = useState<MarketType | "">("")
  const [qty, setQty] = useState("1")
  const [unit, setUnit] = useState("un")
  const [attempted, setAttempted] = useState(false)

  function changeName(value: string) {
    setName(value)
    setCategory(findRegisteredProduct(PRODUCTS, value, unit)?.category ?? "")
  }
  function changeMarket(value: string) {
    setUnassignedMarket(false)
    setMarket(value)
    setMarketType(findRegisteredMarket(MARKETS, value)?.type ?? "")
  }
  function toggleUnassignedMarket() {
    const next = !unassignedMarket
    setUnassignedMarket(next)
    if (next) {
      setMarket("")
      setMarketType("")
    }
  }
  function validate() {
    setAttempted(true)
    return (
      !!name.trim() &&
      !!category &&
      isPositiveReceiptValue(qty) &&
      (!allowUnassignedMarket || unassignedMarket || !!market.trim()) &&
      (!market.trim() || !!marketType)
    )
  }
  function reset() {
    setUnassignedMarket(allowUnassignedMarket)
    setName("")
    setCategory("")
    setMarket("")
    setMarketType("")
    setQty("1")
    setUnit("un")
    setAttempted(false)
  }
  return {
    unassignedMarket,
    toggleUnassignedMarket,
    name,
    category,
    market,
    marketType,
    qty,
    unit,
    attempted,
    changeName,
    changeMarket,
    setCategory,
    setMarketType,
    setQty,
    setUnit,
    validate,
    reset,
  }
}
