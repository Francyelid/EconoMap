import { createAccountClasses } from "./CreateAccount.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import AuthFields from "../AuthFields"
import type { AuthFieldsProps } from "../AuthFields"
import { dmPalette, useDark } from "@/theme"

type CreateAccountProps = AuthFieldsProps & {
  name: string
  setName: (value: string) => void
  onLogin: () => void
}

export default function CreateAccount({
  name,
  setName,
  onLogin,
  ...fields
}: CreateAccountProps) {
  const pal = dmPalette(useDark())
  const canSubmit = fields.email.trim() && fields.password.trim() && name.trim()
  return (
    <>
      <div className={sharedClasses.authField}>
        <label
          className={sharedClasses.authLabel}
          style={sharedStyles.secondaryText(pal)}
        >
          Nome completo
        </label>
        <input
          type="text"
          placeholder="Ana Silva"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={sharedClasses.authInput}
          style={sharedStyles.input(pal)}
        />
      </div>

      <AuthFields {...fields} />
      <p
        className={createAccountClasses.terms}
        style={sharedStyles.secondaryText(pal)}
      >
        Ao criar uma conta você concorda com os{" "}
        <span
          className={createAccountClasses.termsLink}
          style={sharedStyles.brandText}
        >
          Termos de Uso
        </span>{" "}
        e a{" "}
        <span
          className={createAccountClasses.termsLink}
          style={sharedStyles.brandText}
        >
          Política de Privacidade
        </span>
        .
      </p>
      {/* Primary CTA */}
      <button
        onClick={onLogin}
        disabled={!canSubmit}
        className={sharedClasses.authSubmitButton}
        style={sharedStyles.authSubmitButton(pal, Boolean(canSubmit))}
      >
        Criar conta
      </button>
    </>
  )
}
