import { ICONS } from "@/constants/icons"
import {
  communitySummaryClasses,
  createCommunitySummaryStyles,
} from "./CommunitySummary.styles"
import type { CommunityPalette } from "../types"

type CommunitySummaryProps = {
  palette: Pick<CommunityPalette, "cardAlt" | "divider">
  dark: boolean
}

export default function CommunitySummary({
  palette: pal,
  dark,
}: CommunitySummaryProps) {
  const styles = createCommunitySummaryStyles(pal, dark)
  return (
    <div className={communitySummaryClasses.banner} style={styles.banner}>
      <div
        className={communitySummaryClasses.bannerContent}
        style={styles.bannerContent}
      >
        <span className={communitySummaryClasses.bannerIcon}>{ICONS.community}</span>
        <p
          className={communitySummaryClasses.bannerText}
          style={styles.bannerText}
        >
          Preços registrados por <strong>múltiplos usuários</strong>. O
          algoritmo elimina duplicatas e agrega os dados mais recentes.
        </p>
      </div>
      <div className={communitySummaryClasses.statsRow} style={styles.statsRow}>
        {[
          { day: "Hoje", users: 18 },

          { day: "Ontem", users: 31 },

          { day: "Ant.", users: 24 },
        ].map((d, i) => (
          <div
            key={i}
            className={communitySummaryClasses.statCell}
            style={styles.statCell(i)}
          >
            <p
              className={communitySummaryClasses.statValue}
              style={styles.bannerText}
            >
              {d.users}
            </p>
            <p
              className={communitySummaryClasses.statLabel}
              style={styles.tealText}
            >
              {d.day}
            </p>
          </div>
        ))}
        <div
          className={communitySummaryClasses.statCell}
          style={styles.totalCell}
        >
          <p
            className={communitySummaryClasses.statValue}
            style={styles.bannerText}
          >
            73
          </p>
          <p
            className={communitySummaryClasses.statLabel}
            style={styles.tealText}
          >
            Semana
          </p>
        </div>
      </div>
    </div>
  )
}
