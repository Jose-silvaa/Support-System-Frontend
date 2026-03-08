import { defaultConfig } from "@chakra-ui/react"
import { createSystem } from "@chakra-ui/react"
import { designSystemTheme } from "./recipes"

/**
 * Sistema de estilo do design system.
 * Combina o tema padrão do Chakra com nossos tokens, textStyles e recipes.
 */
export const system = createSystem(defaultConfig, designSystemTheme)
