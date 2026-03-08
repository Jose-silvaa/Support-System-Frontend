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
 * O backend pode chamar services/email.service.sendWelcomeEmail após criar o user.
 * Exemplo de rota no backend: POST /api/register -> criar user -> sendWelcomeEmail -> devolver user.
 */
export async function registerViaApi(data: RegisterData): Promise<AuthUser> {
  return post<AuthUser>("register", data)
}

/** Login via API (exemplo quando tiver backend). */
export async function loginViaApi(credentials: LoginCredentials): Promise<AuthUser> {
  return post<AuthUser>("login", credentials)
}

/** Simula logout (limpar token, etc.) */
export function logout(): void {
  // Em produção: limpar token, invalidar sessão, etc.
}
