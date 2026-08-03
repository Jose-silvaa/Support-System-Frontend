import type { ReactNode } from "react"
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router-dom"
import { ROUTES } from "./constants"
import { isAuthenticated } from "@/services/auth/auth.service"
import { MainLayout } from "@/layout"
import { HomePage } from "@/pages/Home"
import { LoginPage } from "@/pages/Login"
import { RegisterPage } from "@/pages/Register"
import { DashboardPage } from "@/pages/Dashboard"
export { ROUTES } from "./constants"
export type { AppRoute } from "./constants"

function PublicRoute({ children }: { children: ReactNode }) {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }
  return <>{children}</>
}

function PrivateRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  return <>{children}</>
}

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <MainLayout>
        <PublicRoute>
          <HomePage />
        </PublicRoute>
      </MainLayout>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <MainLayout>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </MainLayout>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <MainLayout>
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      </MainLayout>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <MainLayout>
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
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
