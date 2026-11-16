import { useId, useState } from "react"
import PricesHeader from "./PricesHeader/PricesHeader"
import ProductPricesPanel from "./ProductPricesPanel"
import PurchaseCalculator from "./PurchaseCalculator/PurchaseCalculator"
import {
  pricesScreenClasses,
  createPricesScreenStyles,
} from "./PricesScreen.styles"
import { dmPalette, useDark } from "@/theme"
import { ICONS } from "@/constants/icons"

const tabs = [
  { key: "product", label: "Por produto", icon: ICONS.package },
  { key: "basket", label: "Por cesta", icon: ICONS.basket },
] as const
export default function PricesScreen() {
  const pal = dmPalette(useDark())
  const styles = createPricesScreenStyles(pal)
  const [active, setActive] = useState<"product" | "basket">("product")
  const id = useId()
  return (
    <div className={pricesScreenClasses.screen} style={styles.screen}>
      <PricesHeader palette={pal} />
      <div
        role="tablist"
        aria-label="Análise de preços"
        className="grid grid-cols-2 gap-1 rounded-2xl border p-1"
        style={{ background: pal.card, borderColor: pal.border }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`${id}-${tab.key}-tab`}
            aria-selected={active === tab.key}
            aria-controls={`${id}-${tab.key}-panel`}
            tabIndex={active === tab.key ? 0 : -1}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-green-600"
            style={{
              background: active === tab.key ? pal.green : "transparent",
              color: active === tab.key ? "#fff" : pal.textSecondary,
            }}
            onClick={() => setActive(tab.key)}
            onKeyDown={(event) => {
              let next: number | undefined
              if (event.key === "ArrowRight" || event.key === "ArrowLeft")
                next = 1 - index
              if (event.key === "Home") next = 0
              if (event.key === "End") next = 1
              if (next !== undefined) {
                event.preventDefault()
                setActive(tabs[next].key)
                event.currentTarget.parentElement
                  ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                  [next]?.focus()
              }
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <p
        id={`${id}-description`}
        className="flex items-start gap-2 text-xs leading-relaxed"
        style={{ color: pal.textSecondary }}
      >
        <span className="mt-0.5 shrink-0" aria-hidden="true">
          {ICONS.info}
        </span>
        <span>
          {active === "product"
            ? "Compare o preço de um mesmo produto entre diferentes mercados."
            : "Acompanhe a evolução do valor total de um conjunto de produtos em um mercado."}
        </span>
      </p>
      {/* Os dois painéis permanecem montados para preservar seleções e buscas. */}
      <section
        role="tabpanel"
        id={`${id}-product-panel`}
        aria-labelledby={`${id}-product-tab`}
        aria-describedby={`${id}-description`}
        hidden={active !== "product"}
        tabIndex={0}
      >
        <ProductPricesPanel />
      </section>
      <section
        role="tabpanel"
        id={`${id}-basket-panel`}
        aria-labelledby={`${id}-basket-tab`}
        aria-describedby={`${id}-description`}
        hidden={active !== "basket"}
        tabIndex={0}
      >
        <PurchaseCalculator />
      </section>
    </div>
  )
}
