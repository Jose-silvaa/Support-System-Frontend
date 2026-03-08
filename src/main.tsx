import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "@/components/ui/provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { AppRouter } from "@/routes"
import "./index.css"

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
