import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const exportDataClasses = {
  header: "flex-shrink-0 px-6 pt-3 pb-4",
  icon: "w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0",
  content: "flex-1 overflow-y-auto px-6 py-4 space-y-5",
  sectionLabel: "text-[10px] font-bold uppercase tracking-widest mb-2",
  fieldGrid: "grid grid-cols-2 gap-2",
  fieldOption:
    "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all",
  checkbox: "w-4 h-4 rounded flex-shrink-0 flex items-center justify-center",
  sectionHeader: "flex items-center justify-between mb-2",
  filterLabel: "text-[10px] font-bold uppercase tracking-widest",
  resetPeriod: "text-[10px] font-bold transition-all",
  dateLabel: "text-[9px] font-bold uppercase tracking-widest block mb-1",
  dateInput: "w-full rounded-xl px-3 py-2.5 text-xs outline-none",
  hint: "text-[10px] mt-1.5",
  search: "flex items-center gap-2 rounded-xl px-3 py-2 mb-2",
  searchInput: "flex-1 bg-transparent text-xs outline-none",
  productList: "flex flex-wrap gap-1.5",
  productOption: "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all",
  marketList: "flex flex-col gap-1.5",
  marketOption:
    "flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-all",
  formatOption:
    "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl font-bold text-xs transition-all",
  formatIcon: "text-lg",
  footer: "flex-shrink-0 px-6 pb-6 pt-3 flex gap-2.5",
  exportButton:
    "flex-1 py-3.5 rounded-2xl font-bold text-sm text-white transition-all active:scale-95",
} as const

export const exportDataStyles = {
  sheet: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    background: pal.card,
    height: "90%",
  }),
  header: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    borderBottom: `1px solid ${pal.divider}`,
  }),

  fieldOption: (
    on: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: on ? pal.greenMuted : pal.inputBg,
    border: `1.5px solid ${on ? "#3d6648" : pal.border}`,
  }),
  checkbox: (
    on: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({ background: on ? "#3d6648" : pal.border }),
  fieldLabel: (
    on: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({ color: on ? "#3d6648" : pal.textPrimary }),
  resetPeriod: (
    exportDateFrom: string,
    exportDateTo: string,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    color: !exportDateFrom && !exportDateTo ? "#3d6648" : pal.textMuted,
  }),
  dateInput: (
    pal: ReturnType<typeof dmPalette>,
    exportDateFrom: string,
    exportDateTo: string,
  ): CSSProperties => ({
    background: pal.inputBg,
    border: `1px solid ${pal.border}`,
    color: pal.textPrimary,
    opacity: !exportDateFrom && !exportDateTo ? 0.5 : 1,
  }),
  productOption: (
    on: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: on ? "#3d6648" : pal.cardAlt,
    color: on ? "#fff" : pal.textPrimary,
  }),
  marketOption: (
    on: boolean,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: on ? pal.greenMuted : pal.inputBg,
    border: `1px solid ${on ? "#3d6648" : pal.border}`,
  }),
  formatOption: (
    exportFormat: string,
    k: string,
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: exportFormat === k ? "#3d6648" : pal.inputBg,
    color: exportFormat === k ? "#fff" : pal.textPrimary,
    border: `1.5px solid ${exportFormat === k ? "#3d6648" : pal.border}`,
  }),
  footer: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    borderTop: `1px solid ${pal.divider}`,
    background: pal.card,
  }),
  exportButton: (
    exportFields: string[],
    pal: ReturnType<typeof dmPalette>,
  ): CSSProperties => ({
    background: exportFields.length > 0 ? "#3d6648" : pal.textMuted,
    boxShadow: exportFields.length > 0 ? "0 4px 14px #3d664840" : "none",
  }),
}
