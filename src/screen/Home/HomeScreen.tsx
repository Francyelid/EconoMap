import HomeHeader from "./HomeHeader/HomeHeader"
import ReceiptAction from "./ReceiptAction/ReceiptAction"
import { createHomeStyles, homeClasses } from "./HomeScreen.styles"

import { useState } from "react"

import { dmPalette, useDark } from "@/theme"

import PurchaseHistorySheet from "./RecentPurchases/PurchaseHistorySheet/PurchaseHistorySheet"

import CommunityRecords from "@/screen/Home/PriceAlerts/CommunityRecords/CommunityRecords"

import PriceAlerts from "@/screen/Home/PriceAlerts/PriceAlerts"

import RecentPurchases from "@/screen/Home/RecentPurchases/RecentPurchases"

import ReceiptModal from "@/screen/Home/NewInvoice/ReceiptModal"

export default function HomeScreen({
  onOpenSettings,
}: {
  onOpenSettings: () => void
}) {
  const dark = useDark()
  const p = dmPalette(dark)

  const styles = createHomeStyles(p)

  const [showTodaySheet, setShowTodaySheet] = useState(false)

  const [showAllPurchases, setShowAllPurchases] = useState(false)

  const [expandedDay, setExpandedDay] = useState<string | null>("23/08/2026")

  const [showReceiptModal, setShowReceiptModal] = useState(false)

  return (
    <div style={styles.screen}>
      <HomeHeader onOpenSettings={onOpenSettings} />
      <ReceiptAction onRegisterReceipt={() => setShowReceiptModal(true)} />

      {/* ── Tagline strip ───────────────────────────────── */}
      <div className={homeClasses.taglineRow}>
        <div className={homeClasses.divider} style={styles.tealDivider} />
        <span className={homeClasses.tagline} style={styles.tagline}>
          Compare • Economize • Decida Melhor
        </span>
        <div className={homeClasses.divider} style={styles.amberDivider} />
      </div>

      {/* ── Price alerts ────────────────────────────────── */}
      <PriceAlerts palette={p} onViewAll={() => setShowTodaySheet(true)} />

      {/* ── Recent purchases ────────────────────────────── */}
      <RecentPurchases
        palette={p}
        onViewAll={() => setShowAllPurchases(true)}
      />

      {/* ── Today's items bottom sheet ──────────────────── */}
      {showTodaySheet && (
        <CommunityRecords
          dark={dark}
          palette={p}
          onClose={() => setShowTodaySheet(false)}
        />
      )}

      {/* ── All purchases bottom sheet ──────────────────── */}
      {showAllPurchases && (
        <PurchaseHistorySheet
          palette={p}
          onClose={() => setShowAllPurchases(false)}
          expandedDay={expandedDay}
          setExpandedDay={setExpandedDay}
        />
      )}

      {/* ── Receipt modal ──────────────────────────────── */}
      {showReceiptModal && (
        <ReceiptModal palette={p} onClose={() => setShowReceiptModal(false)} />
      )}
    </div>
  )
}
