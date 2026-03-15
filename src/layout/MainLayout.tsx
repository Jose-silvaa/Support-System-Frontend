import type { ReactNode } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react"
import { ROUTES } from "@/routes"
import { isAuthenticated, logout } from "@/services/auth/auth.service"

/** Rotas em que o menu de navegação não é exibido. */
const PUBLIC_ROUTES: string[] = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER]

interface MainLayoutProps {
  children: ReactNode
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <NavLink to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        px="3"
        py="2"
        borderRadius="md"
        bg={isActive ? "gray.100" : undefined}
        _dark={{ bg: isActive ? "gray.800" : undefined }}
        _hover={{ bg: "gray.100", _dark: { bg: "gray.800" } }}
      >
        {children}
      </Box>
    </NavLink>
  )
}

/**
 * Layout principal: navbar com links + conteúdo.
 * O menu não é exibido em rotas públicas (home, login, registo).
 */
export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname)

  function handleLogout() {
    logout()
    navigate(ROUTES.LOGIN)
  }

  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER

  return (
    <Box
      minH="100vh"
      bg={isAuthPage ? "transparent" : "bg"}
      color="fg"
    >
      {!isPublicRoute && (
        <Box as="header" borderBottomWidth="1px" borderColor="border" py="3" px="4">
          <Container maxW="container.xl">
            <HStack gap="6" justify="space-between" flexWrap="wrap">
              <Heading size="md" fontWeight="semibold">
                Boilerplate React Vite
              </Heading>
              <HStack gap="2" as="nav">
                <NavItem to={ROUTES.HOME}>Home</NavItem>
                <NavItem to={ROUTES.LOGIN}>Login</NavItem>
                <NavItem to={ROUTES.REGISTER}>Registo</NavItem>
                <NavItem to={ROUTES.DASHBOARD}>Dashboard</NavItem>
                <NavItem to={ROUTES.DESIGN_SYSTEM}>Design System</NavItem>
                {isAuthenticated() && (
                  <Button
                    variant="outline"
                    colorPalette="red"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                )}
              </HStack>
            </HStack>
          </Container>
        </Box>
      )}
      {isAuthPage ? (
        <Box as="main" minH="100vh" py="0" px="0">
          {children}
        </Box>
      ) : (
        <Box as="main" py="8" px="4">
          <Container maxW="container.xl">{children}</Container>
        </Box>
      )}
    </Box>
  )
}
