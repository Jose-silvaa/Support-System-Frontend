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
import { register } from "@/services/auth/auth.service"
import { toaster } from "@/components/ui/toaster"

export function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await register({ name, email, password })
      toaster.success({ title: "Conta criada", description: "Redirecionando..." })
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao criar conta"
      setError(msg)
      toaster.error({ title: "Erro", description: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="md" mx="auto" py="8">
      <Heading size="xl" textStyle="headline" mb="6">
        Criar conta
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap="4" align="stretch">
          <Field.Root>
            <Field.Label>Nome</Field.Label>
            <Input
              type="text"
              placeholder="O teu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </Field.Root>
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
              autoComplete="new-password"
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
              Registar
            </Button>
            <Button
              variant="outline"
              colorPalette="gray"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Já tenho conta
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}
