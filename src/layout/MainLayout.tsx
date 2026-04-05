import type { ReactNode } from "react"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Container, Heading, HStack} from "@chakra-ui/react"
import { TicketProvider } from "@/contexts/TicketContext"
import { ROUTES } from "@/routes"
import { getCurrentUser, isAuthenticated, logout } from "@/services/auth/auth.service"

/** Rotas em que o menu de navegação não é exibido. */
const PUBLIC_ROUTES: string[] = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER]

/** Rotas que exigem sessão JWT válida (inclui exp não ultrapassado). */
const PROTECTED_ROUTES: string[] = [ROUTES.DASHBOARD]

/** Roxo do header (igual à página de login). */
const HEADER_PURPLE = "#925fe2"

function getInitials(name: string, email: string): string {
  const fromName = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
  if (fromName) return fromName
  if (email.trim()) return email[0].toUpperCase()
  return "?"
}

interface MainLayoutProps {
  children: ReactNode
}

/**
 * Layout principal: navbar com links + conteúdo.
 * O menu não é exibido em rotas públicas (home, login, registo).
 */
export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname)
  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER

  function handleLogout() {
    logout()
    navigate(ROUTES.LOGIN)
  }

  useEffect(() => {
    function redirectIfSessionInvalid() {
      if (!PROTECTED_ROUTES.includes(location.pathname)) return
      if (!isAuthenticated()) {
        navigate(ROUTES.LOGIN, { replace: true })
      }
    }
    redirectIfSessionInvalid()
    const intervalId = window.setInterval(redirectIfSessionInvalid, 60_000)
    function onVisibilityChange() {
      if (document.visibilityState === "visible") redirectIfSessionInvalid()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [location.pathname, navigate])

  if (isAuthPage) {
    return (
      <Box minH="100vh" bg="transparent" color="fg">
        <Box as="main" minH="100vh" py="0" px="0">
          {children}
        </Box>
      </Box>
    )
  }

  return (
    <TicketProvider>
      <Box minH="100vh" bg="bg" color="fg">
        {!isPublicRoute && (
          <Box
            as="header"
            bg={HEADER_PURPLE}
            color="white"
            borderBottomWidth="1px"
            borderColor="whiteAlpha.200"
            py="3"
            px="4"
          >
            <Container maxW="container.xl">
              <HStack gap="4" justify="space-between" flexWrap="wrap">
                <Heading size="md" fontWeight="semibold" color="white">
                  Ticket Desk
                </Heading>
                <HStack gap="3" as="nav" color="white">
                  {isAuthenticated() && (
                    <>
                      {(() => {
                        const user = getCurrentUser()
                        return user ? (
                          <Box
                            title={user.name || user.email}
                            w="8"
                            h="8"
                            borderRadius="full"
                            bg="whiteAlpha.300"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="xs"
                            fontWeight="semibold"
                            flexShrink={0}
                          >
                            {getInitials(user.name, user.email)}
                          </Box>
                        ) : null
                      })()}
                      <Button
                        variant="outline"
                        color="white"
                        bg="red.500"
                        size="sm"
                        _hover={{ bg: "red.600" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </HStack>
              </HStack>
            </Container>
          </Box>
        )}
        <Box as="main" py="8" px="4">
          <Container maxW="container.xl">{children}</Container>
        </Box>
      </Box>
    </TicketProvider>
  )
}
