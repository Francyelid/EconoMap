import logoImg from "@/imports/Logo.png"
import { weeklyTipClasses, weeklyTipStyles } from "./WeeklyTip.styles"

export default function WeeklyTip() {
  return (
    <div
      className={weeklyTipClasses.card}
      style={weeklyTipStyles.card}
    >
      <img src={logoImg} alt="EconoMap" className={weeklyTipClasses.logo}/>
      <div>
        <p className={weeklyTipClasses.title} style={weeklyTipStyles.title}>
          Dica da semana
        </p>
        <p className={weeklyTipClasses.description}>
          O tomate está na alta. Prefira a Feira Central para economizar até 30%.
        </p>
      </div>
    </div>
  )
}
