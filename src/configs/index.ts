/**
 * Configurações globais da aplicação.
 * Valores em .env (copiar de .env.example).
 */

export const appConfig = {
  name: import.meta.env.VITE_APP_NAME ?? "Boilerplate React Vite",
  version: "0.0.0",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
} as const
