/**
 * Cliente API e helpers para chamadas HTTP.
 * Use request() em serviços para manter base URL e headers consistentes.
 * Call setAuthTokenGetter() at app bootstrap so authenticated requests get Bearer token.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/"

let authTokenGetter: () => string | null = () => null

/** Set the function used to get the auth token (e.g. from auth.service). Avoids circular dependency. */
export function setAuthTokenGetter(getter: () => string | null): void {
  authTokenGetter = getter
}

function getAuthHeaders(): Record<string, string> {
  const token = authTokenGetter()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

export function getApiUrl(path: string): string {
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
}

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface RequestOptions {
  method?: RequestMethod
  body?: unknown
  headers?: Record<string, string>
}

/**
 * Helper para chamadas à API. Usa getApiUrl e Content-Type application/json.
 * Em caso de res não ok, lança Error com a mensagem do body ou genérica.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options
  const url = getApiUrl(path)
  const tokenBeforeRequest = authTokenGetter()
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...headers,
    },
    ...(body != null && { body: JSON.stringify(body) }),
  })
  if (!res.ok) {
    if (res.status === 401 && tokenBeforeRequest) {
      void import("@/services/auth/auth.service").then(({ logout }) => {
        logout()
        window.location.assign("/login")
      })
    }
    const err = await res.json().catch(() => ({}))
    const message = (err as { message?: string }).message ?? `Error ${res.status}`
    throw new Error(message)
  }
  const text = await res.text()
  if (!text) return undefined as T
  try {
    return JSON.parse(text) as T
  } catch {
    return text as T
  }
}

/** GET path */
export function get<T>(path: string, headers?: Record<string, string>): Promise<T> {
  return request<T>(path, { method: "GET", headers })
}

/** POST path com body */
export function post<T>(path: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
  return request<T>(path, { method: "POST", body, headers })
}

/** PUT path com body */
export function put<T>(path: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
  return request<T>(path, { method: "PUT", body, headers })
}

/** PATCH path com body */
export function patch<T>(path: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
  return request<T>(path, { method: "PATCH", body, headers })
}

/** DELETE path */
export function del<T>(path: string, headers?: Record<string, string>): Promise<T> {
  return request<T>(path, { method: "DELETE", headers })
}
