import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { setAuthTokenGetter } from "@/lib/api"
import { AppRouter } from "@/routes"
import { getAuthToken } from "@/services/auth/auth.service"
import "./index.css"

setAuthTokenGetter(getAuthToken)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider>
        <Toaster />
        <AppRouter />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
