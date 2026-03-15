import { VStack } from "@chakra-ui/react"
import { DashboardFeature } from "@/features"

export function DashboardPage() {
  return (
    <VStack align="stretch" gap="6">
      <DashboardFeature />
    </VStack>
  )
}
