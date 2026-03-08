import type { ReactNode } from "react"
import { Component } from "react"
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error boundary mínimo: captura erros na árvore e mostra uma mensagem.
 * Envolve a app (ou uma parte) para evitar ecrã branco em falhas de render.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p="8" bg="bg" color="fg">
          <VStack gap="4" maxW="md" textAlign="center">
            <Heading size="lg" textStyle="headline">
              Algo correu mal
            </Heading>
            <Text textStyle="body" color="fg.muted">
              {this.state.error.message}
            </Text>
            <Button
              colorPalette="blue"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Tentar novamente
            </Button>
          </VStack>
        </Box>
      )
    }
    return this.props.children
  }
}
