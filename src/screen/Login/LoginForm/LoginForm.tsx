import AuthFields from "../AuthFields"
import type { AuthFieldsProps } from "../AuthFields"
import AuthSubmitButton from "@/components/AuthSubmitButton/AuthSubmitButton"

type LoginFormProps = AuthFieldsProps & { onLogin: () => void }

export default function LoginForm({ onLogin, ...fields }: LoginFormProps) {
  const canSubmit = Boolean(fields.email.trim() && fields.password.trim())
  return (
    <>
      <AuthFields {...fields} showForgotPassword />
      <AuthSubmitButton enabled={canSubmit} onClick={onLogin}>
        Entrar
      </AuthSubmitButton>
    </>
  )
}
