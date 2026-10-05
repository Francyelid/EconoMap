import { createHomeStyles, homeClasses } from "./HomeScreen.styles"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import PurchaseHistorySheet from "./RecentPurchases/PurchaseHistorySheet/PurchaseHistorySheet"
import CommunityRecords from "@/screen/Home/PriceAlerts/CommunityRecords/CommunityRecords"
import PriceAlerts from "@/screen/Home/PriceAlerts/PriceAlerts"
import RecentPurchases from "@/screen/Home/RecentPurchases/RecentPurchases"
import ReceiptModal from "@/screen/Home/NewInvoice/ReceiptModal"

export default function HomeScreen({ onOpenSettings }: { onOpenSettings: () => void }) {
  const dark = useDark(); const p = dmPalette(dark)
  const styles = createHomeStyles(p)
  const [showTodaySheet, setShowTodaySheet] = useState(false)
  const [showAllPurchases, setShowAllPurchases] = useState(false)
  const [expandedDay, setExpandedDay] = useState<string | null>("23/08/2026")
  const [showReceiptModal, setShowReceiptModal] = useState(false)

  return (
    <div style={styles.screen}>

      {/* ── Hero header ─────────────────────────────────── */}
      <div
        className={homeClasses.hero}
        style={styles.hero}
      >
        {/* Decorative dots */}
        <div className={homeClasses.decorationTop} style={styles.decoration}/>
        <div className={homeClasses.decorationBottom} style={styles.decoration}/>

        {/* Greeting row */}
        <div className={homeClasses.greetingRow}>
          <div>
            <p className={homeClasses.greeting}>Bom dia,</p>
            <h1 className={homeClasses.title} style={styles.heading}>
              Ana Silva
            </h1>
          </div>
          <button
            onClick={onOpenSettings}
            className={homeClasses.avatarButton}
            style={styles.avatar}
          >
            AS
          </button>
        </div>

        {/* Main stat card */}
        <div className={homeClasses.summaryCard} style={styles.summaryCard}>
          <p className={homeClasses.summaryLabel}>Gasto em Agosto</p>
          <div className={homeClasses.summaryRow}>
            <p className={homeClasses.summaryValue} style={styles.heading}>
              R$&nbsp;345<span className={homeClasses.summaryDecimals}>,00</span>
            </p>
            <span className={homeClasses.badge} style={styles.badge}>
              −R$&nbsp;42 vs jul
            </span>
          </div>

          {/* Sub stats */}
          <div className={homeClasses.statsRow} style={styles.statsRow}>
            <div>
              <p className={homeClasses.statLabel}>Produtos rastreados</p>
              <p className={homeClasses.statValue}>47</p>
            </div>
            <div style={styles.statDivider}/>
            <div>
              <p className={homeClasses.statLabel}>Mercados visitados</p>
              <p className={homeClasses.statValue}>5</p>
            </div>
            <div style={styles.statDivider}/>
            <div>
              <p className={homeClasses.statLabel}>Compras no mês</p>
              <p className={homeClasses.statValue}>3</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA strip ───────────────────────────────────── */}
      <div className={homeClasses.actionSection}>
        <button
          onClick={() => setShowReceiptModal(true)}
          className={homeClasses.primaryButton}
          style={styles.primaryButton}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
            <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
          </svg>
          Registrar Nota Fiscal
        </button>
      </div>

      {/* ── Tagline strip ───────────────────────────────── */}
      <div className={homeClasses.taglineRow}>
        <div className={homeClasses.divider} style={styles.tealDivider}/>
        <span className={homeClasses.tagline} style={styles.tagline}>
          Compare • Economize • Decida Melhor
        </span>
        <div className={homeClasses.divider} style={styles.amberDivider}/>
      </div>

      {/* ── Price alerts ────────────────────────────────── */}
      <PriceAlerts palette={p} onViewAll={() => setShowTodaySheet(true)}/>

      {/* ── Recent purchases ────────────────────────────── */}
      <RecentPurchases palette={p} onViewAll={() => setShowAllPurchases(true)}/>

      {/* ── Today's items bottom sheet ──────────────────── */}
      {showTodaySheet && (
        <CommunityRecords dark={dark} palette={p} onClose={() => setShowTodaySheet(false)}/>
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
      {showReceiptModal && <ReceiptModal palette={p} onClose={() => setShowReceiptModal(false)}/>}
    </div>
  )
}
