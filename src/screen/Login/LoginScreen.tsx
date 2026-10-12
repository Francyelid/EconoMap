import { loginScreenClasses, loginScreenStyles } from "./LoginScreen.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import CreateAccount from "./CreateAccount/CreateAccount"
import AuthFields from "./AuthFields"
import GoogleLogin from "./GoogleLogin/GoogleLogin"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"
import logoImg from "@/imports/Logo.png"

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const dark = useDark()
  const pal = dmPalette(dark)

  const [mode, setMode] = useState<"login" | "register">("login")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [name, setName] = useState("")

  const [showPass, setShowPass] = useState(false)

  const canSubmit =
    email.trim() && password.trim() && (mode === "login" || name.trim())

  return (
    <div className={sharedClasses.screen} style={loginScreenStyles.screen}>
      {/* Top blob */}
      <div
        className={loginScreenClasses.decoration}
        style={loginScreenStyles.decoration(pal)}
      />

      {/* Logo + brand */}
      <div className={loginScreenClasses.brand}>
        <img
          src={logoImg}
          alt="EconoMap – cesta de mercado dentro de um pin de localização"
          className={loginScreenClasses.logo}
        />
        <div className={loginScreenClasses.taglineRow}>
          <div
            className={loginScreenClasses.taglineLine}
            style={loginScreenStyles.tealLine}
          />
          <p
            className={loginScreenClasses.tagline}
            style={loginScreenStyles.tagline}
          >
            Compare • Economize • Decida Melhor
          </p>
          <div
            className={loginScreenClasses.taglineLine}
            style={loginScreenStyles.amberLine}
          />
        </div>
      </div>

      {/* Card */}
      <div className={loginScreenClasses.card} style={sharedStyles.card(pal)}>
        {/* Tab switcher */}
        <div
          className={loginScreenClasses.tabs}
          style={loginScreenStyles.tabs(pal)}
        >
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={loginScreenClasses.tab(mode === m)}
              style={loginScreenStyles.tab(pal, mode === m)}
            >
              {m === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <div className={loginScreenClasses.content}>
          {mode === "register" ? (
            <CreateAccount
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPass={showPass}
              setShowPass={setShowPass}
              onLogin={onLogin}
            />
          ) : (
            <>
              <AuthFields
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPass={showPass}
                setShowPass={setShowPass}
                showForgotPassword
              />
              {/* Primary CTA */}
              <button
                onClick={onLogin}
                disabled={!canSubmit}
                className={sharedClasses.authSubmitButton}
                style={sharedStyles.authSubmitButton(pal, Boolean(canSubmit))}
              >
                Entrar
              </button>
            </>
          )}

          {/* Divider */}
          <div className={sharedClasses.alignedRow}>
            <div
              className={loginScreenClasses.dividerLine}
              style={sharedStyles.paletteDivider(pal)}
            />
            <span
              className={sharedClasses.priceSummaryLabel}
              style={sharedStyles.secondaryText(pal)}
            >
              ou continue com
            </span>
            <div
              className={loginScreenClasses.dividerLine}
              style={sharedStyles.paletteDivider(pal)}
            />
          </div>

          <GoogleLogin onLogin={onLogin} />
        </div>
      </div>

      {/* Bottom safe area spacer */}
      <div className={loginScreenClasses.safeArea} />
    </div>
  )
}
