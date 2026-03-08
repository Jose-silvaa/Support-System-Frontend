import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react"
import { DashboardFeature } from "@/features"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/routes"

export function DashboardPage() {
  const navigate = useNavigate()
  return (
    <VStack align="stretch" gap="6">
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="4">
        <Heading size="xl" textStyle="headline">
          Dashboard
        </Heading>
        <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.HOME)}>
          Voltar ao início
        </Button>
      </Box>
      <Text textStyle="body">
        Área reservada após login. O serviço de auth (exemplo) está em{" "}
        <code>services/auth.service.ts</code>.
      </Text>
      <DashboardFeature />
    </VStack>
  )
}
