import { Box } from "@chakra-ui/react"

function getInitial(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : "?"
}

export function ReporterAvatar({ name }: { name: string }) {
  return (
    <Box
      w="9"
      h="9"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="sm"
      fontWeight="bold"
      color="white"
      bg="whiteAlpha.200"
      flexShrink={0}
    >
      {getInitial(name)}
    </Box>
  )
}
