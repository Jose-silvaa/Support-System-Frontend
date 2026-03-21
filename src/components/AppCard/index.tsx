import { Box, Heading } from "@chakra-ui/react"
import type { AppCardProps } from "./interfaces"
import { cardStyles } from "./styles"

export function AppCard({ title, children }: AppCardProps) {
  return (
    <Box {...cardStyles.root} border={"2px #925fe2 solid"}>
      {title != null && (
        <Box {...cardStyles.header}>
          <Heading size="md">{title}</Heading>
        </Box>
      )}
      <Box {...cardStyles.body}>{children}</Box>
    </Box>
  )
}
