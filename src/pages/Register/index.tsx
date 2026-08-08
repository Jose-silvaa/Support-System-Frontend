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
import { ROUTES } from "@/routes/constants"
import { registerViaApi } from "@/services/auth/auth.service"
import { Toaster, toaster } from "@/components/ui/toaster"
import { AUTH_FORM_MAX_W, brand as authColors } from "@/theme/brand"

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
      await registerViaApi({ name, email, password })
      toaster.success({ title: "Account created" })
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error creating account"
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
      bg={authColors.panelDark}
      color="white"
      display="flex"
      overflow="hidden"
    >
      <Toaster />

      {/* Coluna esquerda: formulário (painel escuro) */}
      <Box
        w={{ base: "100%", lg: "630px" }}
        flexShrink={0}
        bg={authColors.panelDark}
        display="flex"
        flexDir="column"
        justifyContent="center"
        px={{ base: "6", md: "8" }}
        py="12"
      >
        <VStack gap="12" align="stretch" maxW={AUTH_FORM_MAX_W} mx="auto" w="100%">
          <VStack gap="6" align="stretch">
            <VStack gap="3" align="stretch">
              <Heading
                as="h1"
                fontFamily="display"
                fontSize="48px"
                fontWeight="600"
                letterSpacing="-0.01em"
                lineHeight="1.05"
              >
                Sign up
              </Heading>
              <Text fontSize="16px" fontWeight="medium" color={authColors.subtitle}>
                Create your account to get started
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack gap="6" align="stretch">
                <Field.Root>
                  <Field.Label
                    fontSize="16px"
                    fontWeight="normal"
                    color={authColors.label}
                    mb="2"
                  >
                    Name
                  </Field.Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    bg="transparent"
                    border="none"
                    borderBottom="1px solid"
                    borderColor={authColors.inputBorder}
                    borderRadius="0"
                    color="white"
                    outline="none"
                    px="0"
                    py="2"
                    h="auto"
                    fontSize="16px"
                    transition="border-color 0.15s"
                    _placeholder={{ color: authColors.inputPlaceholder }}
                    _focus={{ borderColor: authColors.inputFocusBorder, boxShadow: "none" }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontSize="16px"
                    fontWeight="normal"
                    color={authColors.label}
                    mb="2"
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
                    outline="none"
                    borderBottom="1px solid"
                    borderColor={authColors.inputBorder}
                    borderRadius="0"
                    color="white"
                    px="0"
                    py="2"
                    h="auto"
                    fontSize="16px"
                    transition="border-color 0.15s"
                    _placeholder={{ color: authColors.inputPlaceholder }}
                    _focus={{ borderColor: authColors.inputFocusBorder, boxShadow: "none" }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontSize="16px"
                    fontWeight="normal"
                    color={authColors.label}
                    mb="2"
                  >
                    Password
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    bg="transparent"
                    border="none"
                    borderBottom="1px solid"
                    borderColor={authColors.inputBorder}
                    borderRadius="0"
                    color="white"
                    outline="none"
                    px="0"
                    py="2"
                    h="auto"
                    fontSize="16px"
                    transition="border-color 0.15s"
                    _placeholder={{ color: authColors.inputPlaceholder }}
                    _focus={{ borderColor: authColors.inputFocusBorder, boxShadow: "none" }}
                  />
                </Field.Root>

                {error && (
                  <Box
                    role="alert"
                    bg={authColors.errorBg}
                    borderWidth="1px"
                    borderColor={authColors.errorBorder}
                    borderRadius="md"
                    px="3"
                    py="2"
                  >
                    <Text fontSize="sm" color={authColors.errorText}>
                      {error}
                    </Text>
                  </Box>
                )}

                <Button
                  type="submit"
                  loading={loading}
                  w="100%"
                  py="3"
                  bg={authColors.accent}
                  color="white"
                  fontSize="16px"
                  fontWeight="normal"
                  transition="background-color 0.15s"
                  boxShadow="0 12px 24px -12px rgba(156,111,228,0.65)"
                  _hover={{ bg: authColors.accentHover }}
                  _active={{ bg: authColors.accentActive }}
                >
                  Sign up
                </Button>
              </VStack>
            </form>
          </VStack>

          <Flex gap="4" align="center" flexWrap="wrap">
            <Text fontSize="16px" color={authColors.label}>
              Have an account?
            </Text>
            <Button
              variant="outline"
              bg={authColors.buttonSecondary}
              color="white"
              borderColor="whiteAlpha.100"
              px="6"
              py="3"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="normal"
              transition="background-color 0.15s"
              _hover={{ bg: authColors.buttonSecondaryHover }}
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Sign in
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
        bg={authColors.welcomeGradient}
        px="12"
      >
        <VStack gap="4" align="center" mx="auto" maxW="480px">
          <Heading
            as="h2"
            fontFamily="display"
            fontSize={{ lg: "50px", xl: "56px" }}
            fontWeight="600"
            letterSpacing="-0.01em"
            lineHeight="1.08"
            textAlign="center"
          >
            Welcome to{" "}
            <Text as="span" fontStyle="italic" fontWeight="500" whiteSpace="nowrap">
              Ticket Desk
            </Text>
          </Heading>
          <Text
            fontSize="16px"
            fontWeight="medium"
            color={authColors.welcomeText}
            textAlign="center"
            lineHeight="1.6"
          >
            Create your account to open support tickets and get help from our team, from first
            report to resolution.
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}
