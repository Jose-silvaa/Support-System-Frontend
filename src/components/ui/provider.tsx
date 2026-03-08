import type { ReactNode } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/theme"

interface ProviderProps {
  children: ReactNode
}

/**
 * Provider raiz do design system.
 * Envolva a aplicação com este componente para usar Chakra UI + tema customizado.
 */
export function Provider(props: ProviderProps) {
  return <ChakraProvider value={system}>{props.children}</ChakraProvider>
}
