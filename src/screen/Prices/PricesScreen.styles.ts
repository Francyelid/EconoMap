import type { CSSProperties } from "react"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"
import { CHART_COLORS } from "./PriceChart/PriceChart.styles"

export const pricesScreenClasses = {
  screen: "px-4 py-6 space-y-5",
  title: sharedClasses.pageTitle,
  subtitle: sharedClasses.caption,
  filters: sharedClasses.list,
  search: sharedClasses.spaciousSearchContainer,
  searchInput: sharedClasses.searchInput,
  clearButton: sharedClasses.smallText,
  filterRow: sharedClasses.filterRow,
  marketSelect: sharedClasses.select,
  maxPrice: "flex items-center gap-1 rounded-xl px-3 py-2",
  maxPriceLabel: sharedClasses.tinyBoldText,
  maxPriceInput: "w-14 bg-transparent text-xs font-mono font-bold outline-none",
  periodGroup: sharedClasses.filterGroup,
  periodButton: "flex-1 py-2 text-[11px] font-bold transition-all",
  dateRow: "flex gap-2 items-center",
  dateField: sharedClasses.fill,
  dateLabel: "text-[10px] font-bold uppercase tracking-widest mb-1 block",
  dateInput: "w-full rounded-xl px-3 py-2 text-xs outline-none",
  calculatorButton:
    "w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95",
  sectionLabel:
    "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2",
  productList: "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
  productButton: (selected: boolean) =>
    `flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
      selected
        ? "bg-green-600 text-white border-green-600"
        : "bg-white text-slate-600 border-slate-200"
    }`,
  markets: "flex gap-2 flex-wrap",
  marketButton:
    "px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all",
  chartCard: sharedClasses.shadowCard,
  chartHeader: sharedClasses.sectionHeader,
  chartTitle: sharedClasses.itemTitle,
  chartPeriod: "text-[10px] font-mono",
  emptyChart: "h-28 flex items-center justify-center text-xs",
  legend: "flex gap-4 mt-3 flex-wrap",
  legendItem: "flex items-center gap-1.5",
  legendDot: "w-2.5 h-2.5 rounded-full",
  legendLabel: sharedClasses.tinyText,
  stats: "grid grid-cols-2 gap-3",
} as const

export function createPricesScreenStyles(pal: ReturnType<typeof dmPalette>) {
  return {
    screen: { background: pal.bg, minHeight: "100%" } satisfies CSSProperties,
    primaryText: sharedStyles.primaryText(pal),
    secondaryText: sharedStyles.secondaryText(pal),
    search: sharedStyles.searchContainer(pal),
    mutedText: sharedStyles.mutedText(pal),
    input: sharedStyles.input(pal),
    border: sharedStyles.border(pal),
    periodButton: (selected: boolean): CSSProperties =>
      sharedStyles.selectedFilter(pal, selected),
    calculatorButton: {
      background: "linear-gradient(135deg, #3d6648, #4e7f5a)",
      color: "#fff",
      boxShadow: "0 4px 14px #3d664840",
    } satisfies CSSProperties,
    marketButton: (active: boolean, index: number): CSSProperties => {
      const col = CHART_COLORS[index % CHART_COLORS.length]
      return {
        borderColor: active ? col : "#e2e8f0",

        background: active ? col + "22" : "white",

        color: active ? col : "#94a3b8",
      }
    },
    card: sharedStyles.card(pal),
    legendDot: (index: number): CSSProperties => ({
      background: CHART_COLORS[index % CHART_COLORS.length],
    }),
  }
}
