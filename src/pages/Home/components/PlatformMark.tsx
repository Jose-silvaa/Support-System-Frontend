import { Box } from "@chakra-ui/react"

/** Cor de marca aproximada por plataforma, usada no monograma (placeholder de logo). */
const PLATFORM_COLORS: Record<string, string> = {
  Discord: "#5865F2",
  GitHub: "#6e7681",
  Slack: "#ECB22E",
  Cloudflare: "#F6821F",
  Spotify: "#1DB954",
  AWS: "#FF9900",
}

const DEFAULT_COLOR = "#9c6fe4"

export function PlatformMark({ name }: { name: string }) {
  return (
    <Box
      w="9"
      h="9"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="sm"
      fontWeight="bold"
      color="white"
      bg={PLATFORM_COLORS[name] ?? DEFAULT_COLOR}
      flexShrink={0}
    >
      {name.charAt(0)}
    </Box>
  )
}
