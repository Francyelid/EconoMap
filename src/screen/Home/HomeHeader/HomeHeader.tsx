import { homeHeaderClasses, homeHeaderStyles } from "./HomeHeader.styles"
import SpendingSummary from "../SpendingSummary/SpendingSummary"

export default function HomeHeader({
  onOpenSettings,
}: {
  onOpenSettings: () => void
}) {
  return (
    <div className={homeHeaderClasses.hero} style={homeHeaderStyles.hero}>
      {/* Decorative dots */}
      <div
        className={homeHeaderClasses.decorationTop}
        style={homeHeaderStyles.decoration}
      />
      <div
        className={homeHeaderClasses.decorationBottom}
        style={homeHeaderStyles.decoration}
      />

      {/* Greeting row */}
      <div className={homeHeaderClasses.greetingRow}>
        <div>
          <p className={homeHeaderClasses.greeting}>Bom dia,</p>
          <h1
            className={homeHeaderClasses.title}
            style={homeHeaderStyles.heading}
          >
            Ana Silva
          </h1>
        </div>
        <button
          onClick={onOpenSettings}
          className={homeHeaderClasses.avatarButton}
          style={homeHeaderStyles.avatar}
        >
          AS
        </button>
      </div>

      <SpendingSummary />
    </div>
  )
}
