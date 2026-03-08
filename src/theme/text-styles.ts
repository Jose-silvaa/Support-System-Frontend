import { defineTextStyles } from "@chakra-ui/react"

/**
 * Tipografia do design system.
 * Use via prop textStyle nos componentes Chakra.
 */
export const textStyles = defineTextStyles({
  headline: {
    value: {
      fontSize: "3xl",
      fontWeight: "bold",
      lineHeight: "1.2",
      letterSpacing: "-0.025em",
    },
  },
  subheadline: {
    value: {
      fontSize: "xl",
      fontWeight: "semibold",
      lineHeight: "1.3",
    },
  },
  body: {
    value: {
      fontSize: "md",
      lineHeight: "1.6",
    },
  },
  caption: {
    value: {
      fontSize: "sm",
      lineHeight: "1.4",
      color: "gray.500",
    },
  },
  label: {
    value: {
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "1.25",
    },
  },
})
