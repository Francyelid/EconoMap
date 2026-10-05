import { createGreenHeaderStyles, greenHeaderClasses } from "./GreenHeader.styles"
export default function GreenHeader({ title, onBack, onClose }: { title: string; onBack: () => void; onClose: () => void }) {
  const styles = createGreenHeaderStyles()
  return (
    <div
      className={greenHeaderClasses.header}
      style={styles.header}
    >
      <button onClick={onBack} className={greenHeaderClasses.backButton} style={styles.iconButton}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
      <h2 className={greenHeaderClasses.title} style={styles.title}>{title}</h2>
      <button onClick={onClose} className={greenHeaderClasses.closeButton} style={styles.iconButton}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  )
}
