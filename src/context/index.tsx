import type { ReactNode } from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface AppContextValue {
  example: string
  setExample: (value: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [example, setExample] = useState("")
  const setExampleCallback = useCallback((value: string) => setExample(value), [])
  return (
    <AppContext.Provider value={{ example, setExample: setExampleCallback }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider")
  return ctx
}
