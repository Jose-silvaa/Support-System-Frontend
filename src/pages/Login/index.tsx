import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Field,
} from "@chakra-ui/react"
import { ROUTES } from "@/routes"
import { loginViaApi } from "@/services/auth/auth.service"
import { Toaster, toaster } from "@/components/ui/toaster"

const FORM_MAX_W = "393px"
const PANEL_DARK = "#1c1d21"
const PANEL_PURPLE = "#925fe2"
const BUTTON_PRIMARY = "#9c6fe4"
const BUTTON_SECONDARY = "#333437"
const LABEL_OPACITY = "rgba(255,255,255,0.5)"
const SUBTITLE_OPACITY = "rgba(255,255,255,0.7)"

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
      await loginViaApi({ email, password })
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error signing in"
      setError(msg)
      toaster.error({ title: "Error", description: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      bg={PANEL_PURPLE}
      color="white"
      display="flex"
    >
      <Toaster />

      {/* Coluna esquerda: formulário (painel escuro) */}
      <Box
        w={{ base: "100%", lg: "630px" }}
        flexShrink={0}
        bg={PANEL_DARK}
        display="flex"
        flexDir="column"
        justifyContent="center"
        py="8"
      >
        <VStack gap="12" align="stretch" maxW={FORM_MAX_W} mx="auto" w="100%">
          <VStack gap="6" align="stretch">
            <VStack gap="3" align="stretch">
              <Heading
                as="h1"
                fontSize="48px"
                fontWeight="bold"
                lineHeight="normal"
              >
                Login
              </Heading>
              <Text fontSize="16px" fontWeight="medium" color={SUBTITLE_OPACITY}>
                Enter your account details
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack gap="6" align="stretch">
                <Field.Root>
                  <Field.Label
                    fontSize="16px"
                    fontWeight="normal"
                    color={LABEL_OPACITY}
                    mb="0.5"
                  >
                    Email
                  </Field.Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    bg="transparent"
                    border="none"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.400"
                    borderRadius="0"
                    color="white"
                    outline="none"
                    px="0"
                    py="2"
                    h="auto"
                    fontSize="16px"
                    _placeholder={{ color: "whiteAlpha.500" }}
                    _focus={{ borderColor: "whiteAlpha.600", boxShadow: "none" }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontSize="16px"
                    fontWeight="normal"
                    color={LABEL_OPACITY}
                    mb="0.5"
                  >
                    Password
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    bg="transparent"
                    border="none"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.400"
                    borderRadius="0"
                    color="white"
                    outline="none"
                    px="0"
                    py="2"
                    h="auto"
                    fontSize="16px"
                    _placeholder={{ color: "whiteAlpha.500" }}
                    _focus={{ borderColor: "whiteAlpha.600", boxShadow: "none" }}
                  />
                </Field.Root>

                {error && (
                  <Text color="red.300" fontSize="sm">
                    {error}
                  </Text>
                )}

                <Button
                  type="submit"
                  loading={loading}
                  w="100%"
                  py="3"
                  bg={BUTTON_PRIMARY}
                  color="white"
                  fontSize="16px"
                  fontWeight="normal"
                  _hover={{ bg: "#8b5fd6" }}
                >
                  Login
                </Button>
              </VStack>
            </form>
          </VStack>

          <Flex gap="4" align="center" flexWrap="wrap">
            <Text fontSize="16px" color={LABEL_OPACITY}>
              Don't have an account?
            </Text>
            <Button
              variant="outline"
              bg={BUTTON_SECONDARY}
              color="white"
              borderColor="transparent"
              px="6"
              py="3"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="normal"
              _hover={{ bg: "#424347" }}
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Sign up
            </Button>
          </Flex>
        </VStack>
      </Box>

      {/* Coluna direita: mensagem de boas-vindas */}
      <Box
        display={{ base: "none", lg: "flex" }}
        flex="1"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <VStack gap="3" align="center" mx="auto">
          <Heading
            as="h2"
            fontSize={{ lg: "50px", xl: "50px" }}
            fontWeight="bold"
            lineHeight="1.1"
          >
            Welcome to the{" "}
            <Text as="span" fontWeight="normal">
              Supporter Portal
            </Text>
          </Heading>
          <Text fontSize="16px" fontWeight="medium" color="#eee">
          Create and track support tickets, report issues, and request assistance from the support team.
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}
