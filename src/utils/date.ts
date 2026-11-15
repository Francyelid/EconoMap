export function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-")

  return `${d}/${m}/${y}`
}

