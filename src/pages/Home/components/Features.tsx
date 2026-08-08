import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import { OrganizeIcon, ReportIcon, ResolveIcon, TrackIcon } from "./icons"

const FEATURES = [
  {
    icon: ReportIcon,
    title: "Submit Tickets",
    description: "Open a ticket in seconds and describe exactly what you need help with.",
  },
  {
    icon: TrackIcon,
    title: "Track Progress",
    description: "Follow your ticket from Open to In Progress to Closed, in real time.",
  },
  {
    icon: OrganizeIcon,
    title: "Stay Organized",
    description: "Keep every request, reporter, and update in one place.",
  },
  {
    icon: ResolveIcon,
    title: "Get Resolved Faster",
    description: "Clear status and history mean less back-and-forth to get your issue solved.",
  },
] as const

export function Features() {
  return (
    <Box as="section" bg={brand.panelDark} py={{ base: "16", md: "24" }} px={{ base: "6", md: "12" }}>
      <Heading
        as="h2"
        fontFamily="display"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="600"
        color="white"
        textAlign="center"
        mb={{ base: "10", md: "14" }}
      >
        Features
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap="5"
        maxW="1120px"
        mx="auto"
      >
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <VStack
            key={title}
            align="flex-start"
            gap="3"
            bg={brand.surface}
            borderWidth="1px"
            borderColor={brand.border}
            borderRadius="xl"
            p="6"
          >
            <Box
              w="10"
              h="10"
              borderRadius="lg"
              bg={brand.accentSoft}
              color={brand.accent}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon width={20} height={20} />
            </Box>
            <Heading as="h3" fontSize="md" fontWeight="semibold" color="white">
              {title}
            </Heading>
            <Text fontSize="sm" color={brand.textMuted} lineHeight="1.6">
              {description}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  )
}
