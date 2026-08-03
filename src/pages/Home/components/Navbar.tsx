import { Button, Flex, HStack, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/routes/constants"
import { brand } from "@/theme/brand"

export function Navbar() {
  const navigate = useNavigate()

  return (
    <Flex as="nav" align="center" justify="space-between" maxW="1200px" mx="auto" px={{ base: "6", md: "12" }} py="6">
      <Text fontFamily="display" fontSize="xl" fontWeight="600" color="white">
        Ticket{" "}
        <Text as="span" fontStyle="italic" fontWeight="500" color={brand.accent}>
          Desk
        </Text>
      </Text>
      <HStack gap="3">
        <Button variant="ghost" color="white" _hover={{ bg: brand.surface }} onClick={() => navigate(ROUTES.LOGIN)}>
          Log in
        </Button>
        <Button bg={brand.accent} color="white" _hover={{ bg: brand.accentHover }} onClick={() => navigate(ROUTES.REGISTER)}>
          Get Started
        </Button>
      </HStack>
    </Flex>
  )
}
