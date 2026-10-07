import { sharedClasses, sharedStyles } from "@/screen/shared/styles"

import type { CSSProperties } from "react"

import type { dmPalette } from "@/theme"

export type PurchaseHistoryPalette = Pick<ReturnType<typeof dmPalette>, "bg" | "border" | "headerBg" | "divider" | "inputBg" | "textSecondary" | "textPrimary" | "textMuted" | "card" | "cardAlt" | "greenMuted">

export const historyClasses = {
  overlay: sharedClasses.overlay,

  sheet: sharedClasses.sheet,

  handleContainer: sharedClasses.handleContainer,

  handle: sharedClasses.handle,

  header: "px-4 pt-2 pb-3 flex items-center gap-3 flex-shrink-0",

  closeButton:
    "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",

  headerContent: sharedClasses.fill,

  title: "font-bold text-white text-sm",

  caption: sharedClasses.tinyText,

  compareButton: "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",

  filters: "px-4 pt-3 pb-2 flex flex-col gap-2 flex-shrink-0",

  searchContainer: sharedClasses.searchContainer,

  searchInput: "flex-1 bg-transparent text-xs outline-none",

  clearButton: sharedClasses.smallText,

  filterRow: sharedClasses.filterRow,

  select: sharedClasses.select,

  daysList: "flex-1 overflow-y-auto px-4 py-3 space-y-2",

  emptyState: "text-center py-12",

  emptyIcon: sharedClasses.emptyIcon,

  emptyMessage: sharedClasses.emphasizedText,

  dayCard: "rounded-2xl overflow-hidden",

  dayButton: "w-full flex items-center gap-3 px-4 py-3 text-left",

  dayIcon: sharedClasses.itemIcon,

  details: sharedClasses.details,

  dayTitle: sharedClasses.itemTitle,

  dayMetadata: "text-[10px] mt-0.5 truncate",

  daySummary: "flex items-center gap-2 flex-shrink-0",

  dayTotal: "font-mono font-bold text-sm",

  recordsList: "px-3 pt-2 pb-3 flex flex-col gap-1",

  recordButton:
    "flex items-center gap-2 w-full rounded-xl px-3 py-2 text-left transition-all",

  checkbox: "w-4 h-4 rounded flex-shrink-0 flex items-center justify-center",

  product: "text-xs font-semibold truncate",

  recordPrice: "font-mono text-xs font-bold flex-shrink-0",
} as const

export function createPurchaseHistoryStyles(pal: PurchaseHistoryPalette) {
  return {
    overlay: {
      background: "rgba(44,36,22,0.4)",
      backdropFilter: "blur(3px)",
      zIndex: 50,
    },

    sheet: { background: pal.bg, height: "88%" },

    handle: sharedStyles.handle(pal),

    header: {
      background: "linear-gradient(150deg, #2c4e37, var(--color-brand-green))",
      borderRadius: "20px 20px 0 0",
    },

    closeButton: sharedStyles.translucentButton,

    title: sharedStyles.serifHeading,

    headerCaption: { color: "#a8c9b0" },

    compareButton: (compareMode: boolean): CSSProperties => ({
      background: compareMode ? "var(--color-amber)" : "rgba(255,255,255,0.15)",
      color: compareMode ? "var(--color-bark)" : "#fff",
    }),

    filters: {
      background: pal.headerBg,
      borderBottom: `1px solid ${pal.divider}`,
    },

    searchContainer: sharedStyles.searchContainer(pal),

    primaryText: sharedStyles.primaryText(pal),

    mutedText: sharedStyles.mutedText(pal),

    select: sharedStyles.input(pal),

    secondaryText: sharedStyles.secondaryText(pal),

    dayCard: sharedStyles.card(pal),

    dayIcon: { background: pal.cardAlt },

    accentText: sharedStyles.accentText,

    chevron: (isOpen: boolean): CSSProperties =>
      sharedStyles.chevronRotation(isOpen ? 90 : 0),

    records: { borderTop: `1px solid ${pal.divider}` },

    recordButton: (isSel: boolean, compareMode: boolean): CSSProperties => ({
      background: isSel ? pal.greenMuted : pal.inputBg,
      border: `1px solid ${isSel ? "var(--color-brand-green)" : pal.divider}`,
      cursor: compareMode ? "pointer" : "default",
    }),

    checkbox: (isSel: boolean): CSSProperties => ({
      background: isSel ? "var(--color-brand-green)" : pal.border,
    }),

    recordPrice: (isSel: boolean): CSSProperties => ({
      color: isSel ? "var(--color-brand-green)" : pal.textPrimary,
    }),
  } satisfies Record<string, CSSProperties | ((
    ...states: boolean[]
  ) => CSSProperties)>
}
