import { authFieldsClasses } from "./AuthFields.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"

export type AuthFieldsProps = {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  showPass: boolean
  setShowPass: (value: boolean) => void
  showForgotPassword?: boolean
}

export default function AuthFields({
  email,
  setEmail,
  password,
  setPassword,
  showPass,
  setShowPass,
  showForgotPassword = false,
}: AuthFieldsProps) {
  const pal = dmPalette(useDark())
  return (
    <>
      {/* Email */}
      <div className={sharedClasses.authField}>
        <label
          className={sharedClasses.authLabel}
          style={sharedStyles.secondaryText(pal)}
        >
          E-mail
        </label>
        <input
          type="email"
          placeholder="ana@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={sharedClasses.authInput}
          style={sharedStyles.input(pal)}
        />
      </div>

      {/* Password */}
      <div className={sharedClasses.authField}>
        <div className={authFieldsClasses.passwordHeader}>
          <label
            className={sharedClasses.authLabel}
            style={sharedStyles.secondaryText(pal)}
          >
            Senha
          </label>
          {showForgotPassword && (
            <button
              className={sharedClasses.textButton}
              style={sharedStyles.brandText}
            >
              Esqueci a senha
            </button>
          )}
        </div>
        <div className={sharedClasses.relativeContainer}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authFieldsClasses.passwordInput}
            style={sharedStyles.input(pal)}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className={authFieldsClasses.visibilityButton}
            style={sharedStyles.secondaryText(pal)}
          >
            {showPass ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>
    </>
  )
}
