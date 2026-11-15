/** Aceita quantidades fracionadas, mas rejeita valores vazios, zero e negativos. */
export function isPositiveReceiptValue(value: string): boolean {
  const number = Number(value.trim().replace(",", "."))
  return value.trim().length > 0 && Number.isFinite(number) && number > 0
}
