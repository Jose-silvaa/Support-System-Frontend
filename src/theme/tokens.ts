import { defineTokens } from "@chakra-ui/react"

/**
 * Design system tokens.
 * Customize colors, spacing, radii, etc. for all future frontends.
 */
export const tokens = defineTokens({
  colors: {
    // Brand – ajuste para a identidade do seu produto
    primary: {
      50: { value: "#f0f9ff" },
      100: { value: "#e0f2fe" },
      200: { value: "#bae6fd" },
      300: { value: "#7dd3fc" },
      400: { value: "#38bdf8" },
      500: { value: "#0ea5e9" },
      600: { value: "#0284c7" },
      700: { value: "#0369a1" },
      800: { value: "#075985" },
      900: { value: "#0c4a6e" },
      950: { value: "#082f49" },
    },
    secondary: {
      50: { value: "#faf5ff" },
      100: { value: "#f3e8ff" },
      200: { value: "#e9d5ff" },
      300: { value: "#d8b4fe" },
      400: { value: "#c084fc" },
      500: { value: "#a855f7" },
      600: { value: "#9333ea" },
      700: { value: "#7e22ce" },
      800: { value: "#6b21a8" },
      900: { value: "#581c87" },
      950: { value: "#3b0764" },
    },
  },
  fonts: {
    heading: { value: "system-ui, sans-serif" },
    body: { value: "system-ui, sans-serif" },
    mono: { value: "ui-monospace, monospace" },
  },
  animations: {
    "fade-in": { value: "fade-in 0.3s ease-out" },
    "slide-in-right": { value: "slide-in-right 0.3s ease-out" },
  },
})
