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
    throw new Error("Email é obrigatório")
  }
  return {
    id: "1",
    email: credentials.email,
    name: credentials.email.split("@")[0] ?? "Utilizador",
  }
}

/** Simula registo: aceita name + email + password e devolve o user */
export async function register(data: RegisterData): Promise<AuthUser> {
  await delay(MOCK_DELAY_MS)
  if (!data.email.trim()) throw new Error("Email é obrigatório")
  if (!data.name.trim()) throw new Error("Nome é obrigatório")
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
    return {
      id: String(payload.sub ?? payload.id ?? "1"),
      email: (payload.email as string) ?? data.email,
      name: (payload.name as string) ?? data.name,
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
    return {
      id: String(payload.sub ?? payload.id ?? "1"),
      email: (payload.email as string) ?? credentials.email,
      name: (payload.name as string) ?? credentials.email.split("@")[0] ?? "Utilizador",
    }
  }
  return result
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const payload = token.split(".")[1]
    if (!payload) return {}
    return JSON.parse(atob(payload)) as Record<string, unknown>
  } catch {
    return {}
  }
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
