import type { ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Box, Container, Heading, HStack } from "@chakra-ui/react"
import { ROUTES } from "@/routes"

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
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box minH="100vh" bg="bg" color="fg">
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
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Box as="main" py="8" px="4">
        <Container maxW="container.xl">{children}</Container>
      </Box>
    </Box>
  )
}
