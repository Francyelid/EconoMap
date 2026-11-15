import ProductNameField from "./ProductNameField"
import ProductCategoryField from "./ProductCategoryField"
import EstablishmentField from "./EstablishmentField"
import type { PurchaseFieldPalette } from "./styles"
import type useItemRegistration from "@/hooks/useItemRegistration"
import { PRODUCTS } from "@/services/demo/products"
import { MARKETS } from "@/services/demo/data"
import { findRegisteredProduct } from "@/business/product"
import { ICONS } from "@/constants/icons"

type Props = {
  form: ReturnType<typeof useItemRegistration>
  palette: PurchaseFieldPalette
  section: "product" | "market"
  allowUnassignedMarket?: boolean
}

export default function ItemRegistrationFields({
  form,
  palette,
  section,
  allowUnassignedMarket = false,
}: Props) {
  if (section === "market")
    return (
      <div className="space-y-3">
        {allowUnassignedMarket && (
          <button
            type="button"
            aria-pressed={form.unassignedMarket}
            onClick={form.toggleUnassignedMarket}
            className="flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            style={{
              background: form.unassignedMarket ? "#3d6648" : palette.cardAlt,
              borderColor: form.unassignedMarket ? "#3d6648" : palette.border,
              color: form.unassignedMarket ? "#fff" : palette.textPrimary,
            }}
          >
            <span className="text-lg">
              {form.unassignedMarket ? ICONS.check : ICONS.redCircle}
            </span>
            <span>
              <span className="block text-xs font-semibold">
                Sem mercado definido
              </span>
              <span
                className="block text-xs"
                style={{
                  color: form.unassignedMarket
                    ? "#e0ede4"
                    : palette.textSecondary,
                }}
              >
                Você pode escolher onde comprar depois.
              </span>
            </span>
          </button>
        )}
        {(!allowUnassignedMarket || !form.unassignedMarket) && (
          <EstablishmentField
            markets={MARKETS}
            name={form.market}
            type={form.marketType}
            palette={palette}
            error={
              form.attempted && form.market.trim() && !form.marketType
                ? "Selecione o tipo do estabelecimento."
                : ""
            }
            onNameChange={form.changeMarket}
            onTypeChange={form.setMarketType}
            onSelect={(market) => {
              form.changeMarket(market.name)
              form.setMarketType(market.type)
            }}
          />
        )}
        {allowUnassignedMarket &&
          !form.unassignedMarket &&
          form.attempted &&
          !form.market.trim() && (
            <p role="alert" className="text-xs text-red-600">
              Informe o estabelecimento ou selecione “Sem mercado definido”.
            </p>
          )}
      </div>
    )
  return (
    <div className="space-y-3">
      <p
        className="block text-xs font-semibold"
        style={{ color: palette.textSecondary }}
      >
        Produto
      </p>
      <ProductNameField
        products={PRODUCTS}
        name={form.name}
        itemNumber={1}
        palette={palette}
        onNameChange={form.changeName}
        onSelect={(product) => {
          form.changeName(product.name)
          form.setCategory(product.category)
          form.setUnit(product.unit)
        }}
      />
      {form.attempted && !form.name.trim() && (
        <p role="alert" className="text-xs text-red-600">
          Informe o nome do produto.
        </p>
      )}
      {form.name.trim() && (
        <ProductCategoryField
          category={form.category}
          registered={!!findRegisteredProduct(PRODUCTS, form.name, form.unit)}
          palette={palette}
          invalid={form.attempted && !form.category}
          onChange={form.setCategory}
        />
      )}
    </div>
  )
}
