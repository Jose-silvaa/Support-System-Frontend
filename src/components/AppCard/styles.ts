/**
 * Estilos do AppCard (Chakra UI).
 * Com Chakra usamos props e recipes; aqui ficam objetos de estilo reutilizáveis se precisar.
 */

export const cardStyles = {
  root: {
    borderRadius: "l3",
    borderWidth: "1px",
    borderColor: "border",
    bg: "bg.panel",
    overflow: "hidden",
  },
  header: {
    px: "4",
    py: "3",
    borderBottomWidth: "1px",
    borderColor: "border",
    fontWeight: "semibold",
  },
  body: {
    p: "4",
  },
} as const
