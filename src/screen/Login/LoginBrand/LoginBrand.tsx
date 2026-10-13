import { loginBrandClasses, loginBrandStyles } from "./LoginBrand.styles"
import logoImg from "@/imports/Logo.png"

export default function LoginBrand() {
  return (
    <div className={loginBrandClasses.brand}>
      <img
        src={logoImg}
        alt="EconoMap – cesta de mercado dentro de um pin de localização"
        className={loginBrandClasses.logo}
      />
      <div className={loginBrandClasses.taglineRow}>
        <div
          className={loginBrandClasses.taglineLine}
          style={loginBrandStyles.tealLine}
        />
        <p
          className={loginBrandClasses.tagline}
          style={loginBrandStyles.tagline}
        >
          Compare • Economize • Decida Melhor
        </p>
        <div
          className={loginBrandClasses.taglineLine}
          style={loginBrandStyles.amberLine}
        />
      </div>
    </div>
  )
}
