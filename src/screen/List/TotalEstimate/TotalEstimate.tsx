import {
  totalEstimateClasses,
  createTotalEstimateStyles,
} from "./TotalEstimate.styles"
type TotalEstimateProps = {
  total: number
  completedCount: number
  itemCount: number
}

export default function TotalEstimate({
  total,
  completedCount,
  itemCount,
}: TotalEstimateProps) {
  const progress = itemCount > 0 ? (completedCount / itemCount) * 100 : 0

  const styles = createTotalEstimateStyles()

  return (
    <div className={totalEstimateClasses.card} style={styles.card}>
      <div className={totalEstimateClasses.summary}>
        <div>
          <p className={totalEstimateClasses.label}>Estimativa total</p>
          <p className={totalEstimateClasses.total}>R$ {total.toFixed(2)}</p>
        </div>
        <div className={totalEstimateClasses.completed}>
          <p className={totalEstimateClasses.label}>Concluídos</p>
          <p className={totalEstimateClasses.count}>
            {completedCount}/{itemCount}
          </p>
        </div>
      </div>
      <div
        className={totalEstimateClasses.progressTrack}
        style={styles.progressTrack}
      >
        <div
          className={totalEstimateClasses.progressBar}
          style={styles.progressBar(progress)}
        />
      </div>
    </div>
  )
}
