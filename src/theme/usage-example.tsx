/**
 * Exemplos de uso dos exports de @/theme
 *
 * Este ficheiro mostra como usar cada export do index.ts do design system.
 * Pode importar estes exemplos noutros componentes ou usar como referência.
 *
 * Exports do index.ts:
 * - primaryButtonRecipe → passar a Button: <Button recipe={primaryButtonRecipe} />
 * - textStyles → usar como string na prop textStyle: textStyle="headline" | "body" | "caption" | "label" | "subheadline"
 * - tokens → usar as chaves como strings nas props: bg="primary.500", fontFamily="heading"
 * - designSystemTheme → config para createSystem() em Storybook/testes
 * - system → já usado pelo Provider; raramente importar em componentes
 */
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import { designSystemTheme, primaryButtonRecipe } from "@/theme"

// =============================================================================
// 1. primaryButtonRecipe — receita para botão de destaque
// =============================================================================
export function PrimaryButtonExample() {
  return (
    <VStack align="stretch" gap="2">
      <Text textStyle="label">primaryButtonRecipe (Button com recipe)</Text>
      <Box display="flex" gap="2" flexWrap="wrap">
        <Button recipe={primaryButtonRecipe}>Primary</Button>
        <Button recipe={primaryButtonRecipe} size="sm">
          Small
        </Button>
        <Button recipe={primaryButtonRecipe} size="lg">
          Large
        </Button>
      </Box>
    </VStack>
  )
}

// =============================================================================
// 2. textStyles — estilos de tipografia (headline, body, caption, etc.)
// =============================================================================
export function TextStylesExample() {
  return (
    <VStack align="stretch" gap="2">
      <Text textStyle="label">textStyles (via prop textStyle)</Text>
      <Heading textStyle="headline">Headline</Heading>
      <Text textStyle="subheadline">Subheadline</Text>
      <Text textStyle="body">Body: parágrafo com line-height 1.6.</Text>
      <Text textStyle="caption">Caption: texto secundário.</Text>
    </VStack>
  )
}

// =============================================================================
// 3. tokens — cores e outros tokens (usados como strings em bg, color, etc.)
// =============================================================================
export function TokensExample() {
  return (
    <VStack align="stretch" gap="2">
      <Text textStyle="label">tokens (cores primary/secondary nos componentes)</Text>
      <Box display="flex" gap="2" flexWrap="wrap">
        <Box bg="primary.500" color="white" px="3" py="2" borderRadius="md">
          primary.500
        </Box>
        <Box bg="secondary.600" color="white" px="3" py="2" borderRadius="md">
          secondary.600
        </Box>
      </Box>
      {/* Os tokens são usados como strings nas props: bg="primary.500", color="secondary.600", etc. */}
      <Text textStyle="caption">
        Em código use as chaves como strings: bg=&quot;primary.500&quot;, fontFamily=&quot;heading&quot;
      </Text>
    </VStack>
  )
}

// =============================================================================
// 4. designSystemTheme — config para criar outro system ou testes
// =============================================================================
export function DesignSystemThemeNote() {
  const themeKeys = designSystemTheme?.theme
    ? Object.keys(designSystemTheme.theme).join(", ")
    : ""
  return (
    <Box
      p="4"
      borderRadius="md"
      bg="gray.100"
      borderWidth="1px"
      borderColor="gray.200"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Text textStyle="label">designSystemTheme</Text>
      <Text textStyle="body">
        Export da config do tema (chaves: {themeKeys}). Use em{" "}
        <code>createSystem(defaultConfig, designSystemTheme)</code> ou em
        Storybook/ testes para reutilizar o mesmo tema.
      </Text>
    </Box>
  )
}

// =============================================================================
// 5. system — contexto do Chakra (já usado pelo Provider)
// =============================================================================
export function SystemNote() {
  // O system é passado ao ChakraProvider em @/components/ui/provider.
  // Não precisa importar system nos componentes; o Provider já o injeta.
  return (
    <Box
      p="4"
      borderRadius="md"
      bg="blue.50"
      borderWidth="1px"
      borderColor="blue.200"
      _dark={{ bg: "blue.900/20", borderColor: "blue.800" }}
    >
      <Text textStyle="label">system</Text>
      <Text textStyle="body">
        O <code>system</code> é usado em <code>ChakraProvider value=&#123;system&#125;</code> no
        Provider. Não é necessário importá-lo nos seus componentes.
      </Text>
    </Box>
  )
}

// =============================================================================
// Página que junta todos os exemplos
// =============================================================================
export function ThemeUsagePage() {
  return (
    <Box p="8" maxW="container.md" mx="auto">
      <VStack align="stretch" gap="8">
        <Heading size="lg" textStyle="headline">
          Uso de @/theme (index.ts)
        </Heading>

        <PrimaryButtonExample />
        <TextStylesExample />
        <TokensExample />
        <DesignSystemThemeNote />
        <SystemNote />
      </VStack>
    </Box>
  )
}
