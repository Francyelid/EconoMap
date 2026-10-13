import LoginBrand from "./LoginBrand/LoginBrand"
import AuthTabs from "./AuthTabs/AuthTabs"
import LoginForm from "./LoginForm/LoginForm"
import LabeledDivider from "@/components/LabeledDivider/LabeledDivider"
import type { AuthMode } from "./types"
import { loginScreenClasses, loginScreenStyles } from "./LoginScreen.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import CreateAccount from "./CreateAccount/CreateAccount"
import GoogleLogin from "./GoogleLogin/GoogleLogin"
import { useState } from "react"
import { dmPalette, useDark } from "@/theme"

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const dark = useDark()
  const pal = dmPalette(dark)

  const [mode, setMode] = useState<AuthMode>("login")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [name, setName] = useState("")

  const [showPass, setShowPass] = useState(false)

  return (
    <div className={sharedClasses.screen} style={loginScreenStyles.screen}>
      {/* Top blob */}
      <div
        className={loginScreenClasses.decoration}
        style={loginScreenStyles.decoration(pal)}
      />

      <LoginBrand />

      {/* Card */}
      <div className={loginScreenClasses.card} style={sharedStyles.card(pal)}>
        <AuthTabs mode={mode} onModeChange={setMode} />

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
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPass={showPass}
              setShowPass={setShowPass}
              onLogin={onLogin}
            />
          )}

          <LabeledDivider label="ou continue com" />

          <GoogleLogin onLogin={onLogin} />
        </div>
      </div>

      {/* Bottom safe area spacer */}
      <div className={loginScreenClasses.safeArea} />
    </div>
  )
}
