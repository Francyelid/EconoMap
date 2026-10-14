import { ICONS } from "@/constants/icons"
import { editProfileClasses, editProfileStyles } from "./EditProfile.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { useState } from "react"
import type { ChangeEvent } from "react"
import { dmPalette, useDark } from "@/theme"

type EditProfileProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EditProfile({ isOpen, onClose }: EditProfileProps) {
  const pal = dmPalette(useDark())
  // Edit profile modal state

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const [profileName, setProfileName] = useState("Ana Silva")

  const [profileEmail, setProfileEmail] = useState("ana.silva@email.com")

  const [profilePhone, setProfilePhone] = useState("")

  const [profileCity, setProfileCity] = useState("")

  const [profileState, setProfileState] = useState("")

  const [profileCep, setProfileCep] = useState("")

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (ev) => setProfilePhoto(ev.target?.result as string)

      reader.readAsDataURL(file)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={sharedClasses.overlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
    >
      <div
        className={editProfileClasses.sheet}
        style={editProfileStyles.sheet(pal)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={editProfileClasses.header}
          style={editProfileStyles.header}
        >
          <div className={sharedClasses.alignedRow}>
            <button
              onClick={onClose}
              className={editProfileClasses.closeButton}
              style={sharedStyles.translucentButton}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3
              className={editProfileClasses.title}
              style={sharedStyles.serifHeading}
            >
              Editar Perfil
            </h3>
          </div>
        </div>
        <div className={editProfileClasses.content}>
          {/* Avatar */}
          <div className={editProfileClasses.avatarSection}>
            <div className={sharedClasses.relativeContainer}>
              {profilePhoto ? (
                <img src={profilePhoto} className={editProfileClasses.photo} />
              ) : (
                <div
                  className={editProfileClasses.placeholderPhoto}
                  style={editProfileStyles.placeholderPhoto}
                >
                  AS
                </div>
              )}
              <label
                className={editProfileClasses.photoPicker}
                style={editProfileStyles.photoPicker}
              >
                <span className={editProfileClasses.photoIcon}>{ICONS.camera}</span>
                <input
                  type="file"
                  accept="image/*"
                  className={editProfileClasses.hiddenInput}
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            <p
              className={sharedClasses.smallText}
              style={sharedStyles.secondaryText(pal)}
            >
              Toque no ícone para alterar a foto
            </p>
          </div>

          {/* Fields */}
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Nome completo
            </label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className={editProfileClasses.input}
              style={sharedStyles.input(pal)}
            />
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              E-mail
            </label>
            <input
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className={editProfileClasses.input}
              style={sharedStyles.input(pal)}
            />
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Telefone
            </label>
            <input
              type="tel"
              value={profilePhone}
              onChange={(e) => setProfilePhone(e.target.value)}
              className={editProfileClasses.input}
              style={sharedStyles.input(pal)}
            />
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Cidade
            </label>
            <input
              type="text"
              value={profileCity}
              onChange={(e) => setProfileCity(e.target.value)}
              className={editProfileClasses.input}
              style={sharedStyles.input(pal)}
            />
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              Estado
            </label>
            <input
              type="text"
              value={profileState}
              onChange={(e) => setProfileState(e.target.value)}
              className={editProfileClasses.input}
              style={sharedStyles.input(pal)}
            />
          </div>
          <div className={sharedClasses.formField}>
            <label
              className={sharedClasses.textButton}
              style={sharedStyles.secondaryText(pal)}
            >
              CEP
            </label>
            <input
              type="text"
              value={profileCep}
              onChange={(e) => setProfileCep(e.target.value)}
              className={editProfileClasses.input}
              style={sharedStyles.input(pal)}
            />
          </div>
        </div>
        <div className={editProfileClasses.footer}>
          <button
            onClick={onClose}
            className={sharedClasses.primaryButton}
            style={editProfileStyles.saveButton}
          >
            Salvar alterações
          </button>
          <button
            onClick={onClose}
            className={editProfileClasses.cancelButton}
            style={sharedStyles.secondaryButton(pal)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
