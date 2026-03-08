import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router-dom"
import { MainLayout } from "@/layout"
import { HomePage } from "@/pages"
import { LoginPage } from "@/pages/Login"
import { RegisterPage } from "@/pages/Register"
import { DashboardPage } from "@/pages/Dashboard"
import { DesignSystemPage } from "@/pages/DesignSystem"

/**
 * Definição das rotas da aplicação.
 * Use ROUTES para links e navegação programática.
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DESIGN_SYSTEM: "/design-system",
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <MainLayout>
        <LoginPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <MainLayout>
        <RegisterPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    ),
  },
  {
    path: ROUTES.DESIGN_SYSTEM,
    element: (
      <MainLayout>
        <DesignSystemPage />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]

const router = createBrowserRouter(routes)

export function AppRouter() {
  return <RouterProvider router={router} />
}
