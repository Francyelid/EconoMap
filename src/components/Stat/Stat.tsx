import type { ReactNode } from "react"

type StatProps = {
  label: string
  value: ReactNode
  labelClassName?: string
  valueClassName?: string
}

export default function Stat({
  label,
  value,
  labelClassName,
  valueClassName,
}: StatProps) {
  return (
    <div>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  )
}
