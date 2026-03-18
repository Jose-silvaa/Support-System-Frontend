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
    return {
      id: getClaim(payload, CLAIM_NAME_ID, "sub", "id") || "1",
      email,
      name: getClaim(payload, "name") || data.name,
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
    return {
      id: getClaim(payload, CLAIM_NAME_ID, "sub", "id") || "1",
      email,
      name: getClaim(payload, "name") || credentials.email.split("@")[0] || "User",
    }
  }
  return result
}

/** .NET-style JWT claim type URIs (backend may use these) */
const CLAIM_NAME_ID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const payload = token.split(".")[1]
    if (!payload) return {}
    return JSON.parse(atob(payload)) as Record<string, unknown>
  } catch {
    return {}
  }
}

function getClaim(payload: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const v = payload[key]
    if (v != null && typeof v === "string") return v
  }
  return ""
}

/** Simula logout (limpar token, etc.) */
export function logout(): void {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

/** Devolve o token guardado (ou null). */
export function getAuthToken(): string | null {
  if (typeof localStorage === "undefined") return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

/** Indica se existe sessão (token presente). */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

/** Devolve o utilizador atual a partir do token (ou null se não autenticado). */
export function getCurrentUser(): AuthUser | null {
  const token = getAuthToken()
  if (!token) return null
  const payload = decodeJwtPayload(token)
  const id = getClaim(payload, CLAIM_NAME_ID, "sub", "id") || "?"
  const email = getClaim(payload, CLAIM_EMAIL, "email") || ""
  const name = getClaim(payload, "name") || (email ? email.split("@")[0] : "") || "?"
  return {
    id,
    email: email || "?",
    name: name || "?",
  }
}
