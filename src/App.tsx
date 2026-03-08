import { Box, Button, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { primaryButtonRecipe } from "@/theme"
import { ThemeUsagePage } from "@/theme/usage-example"
import { MainLayout } from "@/layout"
import { HomePage } from "@/pages"
import { DashboardFeature } from "@/features"

function App() {
  return (
    <MainLayout>
      <Box py="4">
        <Container maxW="container.md">
          <VStack gap="8" align="stretch">
            <Heading size="xl" textStyle="headline">
              Design System — Chakra UI
            </Heading>
            <Text textStyle="body">
              Este boilerplate usa Chakra UI com um tema customizado (tokens, tipografia e recipes)
              para reutilizar em todos os seus próximos frontends.
            </Text>

            <Heading size="md" textStyle="subheadline">
              Botões
            </Heading>
            <HStack gap="4" flexWrap="wrap">
              <Button colorPalette="blue">Padrão Chakra</Button>
              <Button colorPalette="purple" variant="outline">
                Outline
              </Button>
              <Button recipe={primaryButtonRecipe}>Design System (primary)</Button>
              <Button recipe={primaryButtonRecipe} size="sm">
                Small
              </Button>
            </HStack>

            <Heading size="md" textStyle="subheadline">
              Cores do tema
            </Heading>
            <HStack gap="2" flexWrap="wrap">
              <Box w="12" h="12" borderRadius="md" bg="primary.500" />
              <Box w="12" h="12" borderRadius="md" bg="primary.600" />
              <Box w="12" h="12" borderRadius="md" bg="secondary.500" />
              <Box w="12" h="12" borderRadius="md" bg="secondary.600" />
            </HStack>

            <Text textStyle="caption">
              Edite src/theme/ (tokens, text-styles, recipes) para ajustar o design system.
            </Text>

            <Box as="hr" borderColor="border" my="4" />

            <HomePage />
            <DashboardFeature />

            <Box as="hr" borderColor="border" my="4" />

            <ThemeUsagePage />
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  )
}

export default App
