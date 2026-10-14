import { ICONS } from "@/constants/icons"
import { aboutProjectClasses, aboutProjectStyles } from "./AboutProject.styles"
import { sharedClasses, sharedStyles } from "@/screen/shared/styles"
import { dmPalette, useDark } from "@/theme"

type AboutProjectProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AboutProject({ isOpen, onClose }: AboutProjectProps) {
  const pal = dmPalette(useDark())

  if (!isOpen) return null

  return (
    <div
      className={sharedClasses.overlay}
      style={sharedStyles.dialogOverlay}
      onClick={onClose}
    >
      <div
        className={sharedClasses.confirmationSheet}
        style={sharedStyles.cardBackground(pal)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={sharedClasses.confirmationHandle}
          style={sharedStyles.handle(pal)}
        />
        <div className={sharedClasses.dialogIntro}>
          <div
            className={aboutProjectClasses.icon}
            style={sharedStyles.greenMutedBackground(pal)}
          >
            {ICONS.leaf}
          </div>
          <h3
            className={aboutProjectClasses.title}
            style={sharedStyles.sectionTitle(pal)}
          >
            Projeto de TCC
          </h3>
          <p
            className={aboutProjectClasses.subtitle}
            style={sharedStyles.brandText}
          >
            Trabalho de Conclusão de Curso
          </p>
        </div>
        <div
          className={aboutProjectClasses.details}
          style={sharedStyles.alternateCard(pal)}
        >
          {[
            ["Aplicativo", "EconoMap v1.0.0"],

            ["Curso", "Engenharia da Computação"],

            ["Objetivo", "Rastreamento de preços de supermercado"],

            ["Tecnologias", "React · Vite · TypeScript · Tailwind CSS"],
          ].map(([k, v]) => (
            <div key={k} className={aboutProjectClasses.detailRow}>
              <p
                className={aboutProjectClasses.detailLabel}
                style={sharedStyles.secondaryText(pal)}
              >
                {k}
              </p>
              <p
                className={aboutProjectClasses.detailValue}
                style={sharedStyles.primaryText(pal)}
              >
                {v}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs" style={sharedStyles.secondaryText(pal)}>
          Ícones: Uicons por{" "}
          <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="underline">
            Flaticon
          </a>
        </p>
        <button
          onClick={onClose}
          className={sharedClasses.dialogButton}
          style={aboutProjectStyles.closeButton}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
