import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/routes/constants"
import { brand } from "@/theme/brand"

export function CallToAction() {
  const navigate = useNavigate()

  return (
    <Box as="section" bg={brand.panelDark} py={{ base: "16", md: "24" }} px={{ base: "6", md: "12" }}>
      <VStack
        gap="6"
        maxW="640px"
        mx="auto"
        textAlign="center"
        bg={brand.welcomeGradient}
        borderRadius="2xl"
        px={{ base: "8", md: "16" }}
        py={{ base: "12", md: "16" }}
      >
        <Heading as="h2" fontFamily="display" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="600" color="white">
          Stay informed about the services you use.
        </Heading>
        <Text fontSize="md" color="whiteAlpha.900" maxW="440px">
          Create your account and never miss important updates about ongoing issues.
        </Text>
        <Button
          size="lg"
          bg="white"
          color={brand.accentActive}
          px="8"
          fontWeight="semibold"
          _hover={{ bg: "whiteAlpha.900" }}
          onClick={() => navigate(ROUTES.REGISTER)}
        >
          Create Account
        </Button>
      </VStack>
    </Box>
  )
}
