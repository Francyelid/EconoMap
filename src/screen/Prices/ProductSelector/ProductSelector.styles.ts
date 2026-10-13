import { sharedClasses } from "@/screen/shared/styles"

export const productSelectorClasses = {
  sectionLabel: sharedClasses.selectionLabel,
  productList: "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
  productButton: (selected: boolean) =>
    `flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
      selected
        ? "bg-green-600 text-white border-green-600"
        : "bg-white text-slate-600 border-slate-200"
    }`,
} as const
