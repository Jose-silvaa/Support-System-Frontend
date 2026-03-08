import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { primaryButtonRecipe } from "@/theme"
import { ThemeUsagePage } from "@/theme/usage-example"
import { ROUTES } from "@/routes"

export function DesignSystemPage() {
  const navigate = useNavigate()
  return (
    <Box py="4">
      <Container maxW="container.md">
        <VStack gap="8" align="stretch">
          <Heading size="xl" textStyle="headline">
            Design System — Chakra UI
          </Heading>
          <Text textStyle="body">
            Tema customizado (tokens, tipografia, recipes) para reutilizar em todos os frontends.
          </Text>
          <HStack gap="4" flexWrap="wrap">
            <Button recipe={primaryButtonRecipe} onClick={() => navigate(ROUTES.HOME)}>
              Home
            </Button>
            <Button colorPalette="blue" onClick={() => navigate(ROUTES.LOGIN)}>
              Login
            </Button>
          </HStack>
          <Box as="hr" borderColor="border" />
          <ThemeUsagePage />
        </VStack>
      </Container>
    </Box>
  )
}
