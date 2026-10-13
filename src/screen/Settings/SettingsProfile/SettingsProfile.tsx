import {
  settingsProfileClasses,
  settingsProfileStyles,
} from "./SettingsProfile.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"
import type { ReactNode } from "react"

type SettingsProfileProps = {
  onBack?: () => void
}

export default function SettingsProfile({ onBack }: SettingsProfileProps) {
  const dark = useDark()
  const pal = dmPalette(dark)
  return (
    <div
      className={settingsProfileClasses.hero}
      style={settingsProfileStyles.hero}
    >
      <div
        className={settingsProfileClasses.topDecoration}
        style={settingsProfileStyles.decoration}
      />
      <div
        className={settingsProfileClasses.bottomDecoration}
        style={settingsProfileStyles.decoration}
      />

      {/* Back button */}
      {onBack && (
        <button onClick={onBack} className={settingsProfileClasses.backButton}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="15,18 9,12 15,6" />
          </svg>
          <span className={settingsProfileClasses.backLabel}>Voltar</span>
        </button>
      )}

      <div className={settingsProfileClasses.profileRow}>
        {/* Avatar */}
        <div className={settingsProfileClasses.avatarContainer}>
          <div
            className={settingsProfileClasses.avatar}
            style={settingsProfileStyles.avatar}
          >
            AS
          </div>
          <button
            className={settingsProfileClasses.editAvatar}
            style={settingsProfileStyles.editAvatar}
          >
            ✏️
          </button>
        </div>

        {/* Info */}
        <div className={sharedClasses.details}>
          <h2
            className={settingsProfileClasses.profileName}
            style={sharedStyles.serifHeading}
          >
            Ana Silva
          </h2>
          <p
            className={settingsProfileClasses.profileEmail}
            style={settingsProfileStyles.profileMetadata}
          >
            ana.silva@email.com
          </p>
          <div className={settingsProfileClasses.badgeContainer}>
            <span
              className={settingsProfileClasses.badge}
              style={settingsProfileStyles.badge}
            >
              ✦ Conta Gratuita
            </span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        className={settingsProfileClasses.stats}
        style={settingsProfileStyles.stats}
      >
        {[
          { label: "Compras", value: "23" },

          { label: "Produtos", value: "47" },

          { label: "Economia", value: "R$ 84" },
        ].map((s, i) => (
          <div
            key={i}
            className={settingsProfileClasses.stat}
            style={settingsProfileStyles.stat(i)}
          >
            <p
              className={settingsProfileClasses.statValue}
              style={sharedStyles.serifHeading}
            >
              {s.value}
            </p>
            <p
              className={settingsProfileClasses.statLabel}
              style={settingsProfileStyles.profileMetadata}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
