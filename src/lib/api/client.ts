export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:5000/api"

export async function apiFetch(path: string, options?: RequestInit) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const url = `${API_BASE_URL}${normalizedPath}`
  return fetch(url, options)
}
