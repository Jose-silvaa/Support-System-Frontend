/**
 * Constantes de rotas. Ficheiro separado para evitar dependência circular
 * (páginas e layout importam ROUTES; routes/index importa páginas e layout).
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DESIGN_SYSTEM: "/design-system",
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
