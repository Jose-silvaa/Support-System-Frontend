/**
 * Serviço de autenticação (exemplo com mock).
 * Substitua pelas chamadas reais à API quando integrar o backend.
 */

import { post } from "@/lib/api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  /** Claim `role` do JWT (ex.: backend envia `"user"`). */
  role?: string
}

const AUTH_TOKEN_KEY = "auth_token"
const MOCK_DELAY_MS = 600

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Simula login: aceita qualquer email/password e devolve um user mock */
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  await delay(MOCK_DELAY_MS)
  if (!credentials.email.trim()) {
    throw new Error("Email is required")
  }
  return {
    id: "1",
    email: credentials.email,
    name: credentials.email.split("@")[0] ?? "User",
  }
}

/** Simula registo: aceita name + email + password e devolve o user */
export async function register(data: RegisterData): Promise<AuthUser> {
  await delay(MOCK_DELAY_MS)
  if (!data.email.trim()) throw new Error("Email is required")
  if (!data.name.trim()) throw new Error("Name is required")
  return {
    id: String(Date.now()),
    email: data.email,
    name: data.name,
  }
}

/**
 * Registo via API (para usar quando tiver backend).
 * Se o backend devolver um JWT (como no login), guardamos o token para manter a sessão.
 */
export async function registerViaApi(data: RegisterData): Promise<AuthUser> {
  const result = await post<AuthUser | string>("auth/register", data)
  if (typeof result === "string") {
    const token = result
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    }
    const payload = decodeJwtPayload(token)
    const email = getClaim(payload, CLAIM_EMAIL, "email") || data.email
    const role = getRoleFromPayload(payload)
    return {
      id: getClaim(payload, CLAIM_NAME_ID, "sub", "id") || "1",
      email,
      name: getClaim(payload, "name") || data.name,
      ...(role ? { role } : {}),
    }
  }
  return result
}

/** Login via API (exemplo quando tiver backend). */
export async function loginViaApi(credentials: LoginCredentials): Promise<AuthUser> {
  const result = await post<AuthUser | string>("auth/login", credentials)
  if (typeof result === "string") {
    const token = result
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    }
    const payload = decodeJwtPayload(token)
    const email = getClaim(payload, CLAIM_EMAIL, "email") || credentials.email
    const role = getRoleFromPayload(payload)
    return {
      id: getClaim(payload, CLAIM_NAME_ID, "sub", "id") || "1",
      email,
      name: getClaim(payload, "name") || credentials.email.split("@")[0] || "User",
      ...(role ? { role } : {}),
    }
  }
  return result
}

/** .NET-style JWT claim type URIs (backend may use these) */
const CLAIM_NAME_ID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
const CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const payload = token.split(".")[1]
    if (!payload) return {}
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)
    return JSON.parse(atob(padded)) as Record<string, unknown>
  } catch {
    return {}
  }
}

/** Segundos de tolerância ao comparar `exp` com o relógio local. */
const JWT_EXP_SKEW_SEC = 30

/** `true` se o JWT tem `exp` e já passou (sessão inválida no cliente). Sem `exp`, não expira só no cliente. */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token)
  const exp = payload.exp
  if (exp == null) return false
  const ts = typeof exp === "number" ? exp : Number(exp)
  if (!Number.isFinite(ts)) return false
  return Date.now() / 1000 >= ts - JWT_EXP_SKEW_SEC
}

function getClaim(payload: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const v = payload[key]
    if (v != null && typeof v === "string") return v
  }
  return ""
}

/** Lê role do payload (string ou array de strings, como em JWT .NET). */
function getRoleFromPayload(payload: Record<string, unknown>): string {
  for (const key of [CLAIM_ROLE, "role", "Role"]) {
    const v = payload[key]
    if (typeof v === "string" && v.trim()) return v.trim()
    if (Array.isArray(v)) {
      const first = v.find((x) => typeof x === "string" && String(x).trim())
      if (first != null) return String(first).trim()
    }
  }
  return ""
}

/** Simula logout (limpar token, etc.) */
export function logout(): void {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

/**
 * Devolve o token guardado, ou `null` se não existir ou se o JWT estiver expirado
 * (neste caso remove o token do storage).
 */
export function getAuthToken(): string | null {
  if (typeof localStorage === "undefined") return null
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (!token) return null
  if (isTokenExpired(token)) {
    logout()
    return null
  }
  return token
}

/** Indica se existe sessão válida (token presente e não expirado). */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

/** Devolve o utilizador atual a partir do token (ou null se não autenticado / expirado). */
export function getCurrentUser(): AuthUser | null {
  const token = getAuthToken()
  if (!token) return null
  const payload = decodeJwtPayload(token)
  const id = getClaim(payload, CLAIM_NAME_ID, "sub", "id") || "?"
  const email = getClaim(payload, CLAIM_EMAIL, "email") || ""
  const name = getClaim(payload, "name") || (email ? email.split("@")[0] : "") || "?"
  const role = getRoleFromPayload(payload)
  return {
    id,
    email: email || "?",
    name: name || "?",
    ...(role ? { role } : {}),
  }
}
