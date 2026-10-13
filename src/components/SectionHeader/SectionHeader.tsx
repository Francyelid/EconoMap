import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import type { dmPalette } from "@/theme"

type SectionHeaderProps = {
  title: string
  palette: Pick<ReturnType<typeof dmPalette>, "textPrimary">
  actionLabel?: string
  onAction?: () => void
}

export default function SectionHeader({
  title,
  palette,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className={sharedClasses.sectionHeader}>
      <h2
        className={sharedClasses.heading}
        style={sharedStyles.sectionTitle(palette)}
      >
        {title}
      </h2>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={sharedClasses.textButton}
          style={sharedStyles.accentText}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
