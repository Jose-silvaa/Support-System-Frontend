import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { brand } from "@/theme/brand"

const STEPS = [
  {
    number: "01",
    title: "Report an issue",
    description: "Describe the problem you're facing with a specific service in seconds.",
  },
  {
    number: "02",
    title: "Community confirms and discusses",
    description: "Other affected users add their voice and details, validating the report.",
  },
  {
    number: "03",
    title: "Track resolution updates",
    description: "Follow the status as it moves from investigating to resolved.",
  },
] as const

export function HowItWorks() {
  return (
    <Box as="section" bg={brand.welcomeGradient} py={{ base: "16", md: "24" }} px={{ base: "6", md: "12" }}>
      <Heading
        as="h2"
        fontFamily="display"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="600"
        color="white"
        textAlign="center"
        mb={{ base: "10", md: "14" }}
      >
        How It Works
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="8" maxW="1120px" mx="auto">
        {STEPS.map((step) => (
          <VStack key={step.number} align="flex-start" gap="3">
            <Text fontFamily="display" fontSize="4xl" fontWeight="600" color="whiteAlpha.500">
              {step.number}
            </Text>
            <Heading as="h3" fontSize="lg" fontWeight="semibold" color="white">
              {step.title}
            </Heading>
            <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.6">
              {step.description}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  )
}
