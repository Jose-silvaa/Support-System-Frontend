import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { AppCard } from "@/components"
import { dashboardStyles } from "./styles"

export function DashboardFeature() {
  return (
    <VStack align="stretch" gap="6">
      <Heading size="xl" textStyle="headline">
        Dashboard
      </Heading>
      <Text textStyle="body">
        Feature com componentes, hooks e serviços próprios em features/dashboard/.
      </Text>
      <Box {...dashboardStyles.grid}>
        <AppCard title="Card 1">Conteúdo 1</AppCard>
        <AppCard title="Card 2">Conteúdo 2</AppCard>
      </Box>
    </VStack>
  )
}
