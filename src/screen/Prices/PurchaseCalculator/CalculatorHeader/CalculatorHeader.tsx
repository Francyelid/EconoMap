import { useId } from "react"
import { dmPalette, useDark } from "@/theme"

type Props = {
  markets: string[]
  market: string
  onMarketChange: (market: string) => void
}
export default function CalculatorHeader({
  markets,
  market,
  onMarketChange,
}: Props) {
  const id = useId()
  const pal = dmPalette(useDark())
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-semibold"
        style={{ color: pal.textSecondary }}
      >
        Estabelecimento da cesta
      </label>
      <select
        id={id}
        value={market}
        disabled={markets.length === 0}
        onChange={(event) => onMarketChange(event.target.value)}
        className="min-h-11 w-full min-w-0 rounded-xl border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        style={{
          background: pal.inputBg,
          borderColor: pal.border,
          color: pal.textPrimary,
        }}
      >
        {markets.length === 0 && (
          <option value="">
            Nenhum estabelecimento com histórico disponível
          </option>
        )}
        {markets.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
