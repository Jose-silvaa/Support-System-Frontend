import type { ReactElement } from "react"
import {
  render as rtlRender,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { Provider } from "@/components/ui/provider"

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}

function customRender(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: AllTheProviders,
    ...options,
  })
}

export { screen, waitFor, within }
export { customRender as render }
