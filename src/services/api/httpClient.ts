/** Configure VITE_API_BASE_URL quando o backend estiver disponível. */
export default async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")
  if (!baseUrl) throw new Error("Configure VITE_API_BASE_URL para acessar a API.")

  const headers = new Headers(options.headers)
  headers.set("Accept", "application/json")
  const response = await fetch(`${baseUrl}/${path.replace(/^\//, "")}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Falha na API: ${response.status} ${response.statusText}`)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
