import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { brand } from "@/theme/brand"

const STEPS = [
  {
    number: "01",
    title: "Open a ticket",
    description: "Describe your issue and submit it in seconds.",
  },
  {
    number: "02",
    title: "Our team reviews it",
    description: "Your ticket is picked up and moved to In Progress.",
  },
  {
    number: "03",
    title: "Track it to resolution",
    description: "Follow every update until your ticket is marked Closed.",
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
