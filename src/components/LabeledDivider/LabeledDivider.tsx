import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import { labeledDividerClasses } from "./LabeledDivider.styles"

type LabeledDividerProps = { label: string }

export default function LabeledDivider({ label }: LabeledDividerProps) {
  const palette = dmPalette(useDark())
  return (
    <div className={sharedClasses.alignedRow}>
      <div
        className={labeledDividerClasses.line}
        style={sharedStyles.paletteDivider(palette)}
      />
      <span
        className={sharedClasses.priceSummaryLabel}
        style={sharedStyles.secondaryText(palette)}
      >
        {label}
      </span>
      <div
        className={labeledDividerClasses.line}
        style={sharedStyles.paletteDivider(palette)}
      />
    </div>
  )
}
