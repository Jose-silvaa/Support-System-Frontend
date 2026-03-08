import {
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react"
import { tokens } from "./tokens"
import { textStyles } from "./text-styles"

/**
 * Receita de exemplo: botão de destaque do design system.
 * Pode adicionar mais recipes aqui para botões, cards, etc.
 */
const primaryButtonRecipe = defineRecipe({
  className: "ds-button-primary",
  base: {
    bg: "primary.500",
    color: "white",
    fontWeight: "semibold",
    _hover: { bg: "primary.600" },
    _active: { bg: "primary.700" },
  },
  variants: {
    size: {
      sm: { px: "3", py: "1.5", fontSize: "sm" },
      md: { px: "4", py: "2", fontSize: "md" },
      lg: { px: "6", py: "3", fontSize: "lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export { primaryButtonRecipe }

/**
 * Configuração do tema do design system.
 * Será mesclada ao defaultConfig do Chakra.
 */
export const designSystemTheme = defineConfig({
  theme: {
    tokens,
    textStyles,
    recipes: {
      primaryButton: primaryButtonRecipe,
    },
  },
})
