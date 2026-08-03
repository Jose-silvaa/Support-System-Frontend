import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react"
import { brand } from "@/theme/brand"

const FOOTER_LINKS = [
  { label: "About", href: "#" },
  { label: "Issues", href: "#trending" },
  { label: "Community", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
] as const

export function Footer() {
  return (
    <Box as="footer" bg={brand.panelDark} borderTopWidth="1px" borderColor={brand.border} py="8" px={{ base: "6", md: "12" }}>
      <Flex
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap="4"
      >
        <Text fontFamily="display" fontSize="md" fontWeight="600" color="white">
          Ticket{" "}
          <Text as="span" fontStyle="italic" fontWeight="500" color={brand.accent}>
            Desk
          </Text>
        </Text>
        <HStack gap="6" flexWrap="wrap" justify="center">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} fontSize="sm" color={brand.textMuted} _hover={{ color: "white" }}>
              {label}
            </Link>
          ))}
        </HStack>
        <Text fontSize="xs" color={brand.textFaint}>
          © {new Date().getFullYear()} Ticket Desk
        </Text>
      </Flex>
    </Box>
  )
}
