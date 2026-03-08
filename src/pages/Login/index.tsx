import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Field,
} from "@chakra-ui/react"
import { primaryButtonRecipe } from "@/theme"
import { ROUTES } from "@/routes"
import { login } from "@/services/auth/auth.service"
import { toaster } from "@/components/ui/toaster"

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login({ email, password })
      toaster.success({ title: "Sessão iniciada", description: "Redirecionando..." })
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao iniciar sessão"
      setError(msg)
      toaster.error({ title: "Erro", description: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="md" mx="auto" py="8">
      <Heading size="xl" textStyle="headline" mb="6">
        Iniciar sessão
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap="4" align="stretch">
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Field.Root>
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <HStack gap="3">
            <Button
              recipe={primaryButtonRecipe}
              type="submit"
              loading={loading}
              flex="1"
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              colorPalette="gray"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Criar conta
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}
