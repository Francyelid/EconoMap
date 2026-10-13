import {
  communityRecordsHeaderClasses,
  createCommunityRecordsHeaderStyles,
} from "./CommunityRecordsHeader.styles"
import type { CommunityPalette } from "../types"

type CommunityRecordsHeaderProps = {
  palette: Pick<CommunityPalette, "border" | "divider" | "textPrimary" | "textSecondary" | "textMuted">
  onClose: () => void
}

export default function CommunityRecordsHeader({
  palette: pal,
  onClose,
}: CommunityRecordsHeaderProps) {
  const styles = createCommunityRecordsHeaderStyles(pal)
  return (
    <>
      {" "}
      <div className={communityRecordsHeaderClasses.handleContainer}>
        <div
          className={communityRecordsHeaderClasses.handle}
          style={styles.handle}
        />
      </div>
      {/* Header */}
      <div
        className={communityRecordsHeaderClasses.header}
        style={styles.header}
      >
        <div>
          <h3
            className={communityRecordsHeaderClasses.title}
            style={styles.title}
          >
            Registros da Comunidade
          </h3>
          <p
            className={communityRecordsHeaderClasses.subtitle}
            style={styles.secondaryText}
          >
            23 de agosto de 2026 · dados de todos os usuários
          </p>
        </div>
        <button
          onClick={onClose}
          className={communityRecordsHeaderClasses.closeButton}
          style={styles.mutedText}
        >
          ✕
        </button>
      </div>
    </>
  )
}
