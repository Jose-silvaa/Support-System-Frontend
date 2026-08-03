import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import { CommunityIcon, DiscoverIcon, ReportIcon, TrackIcon } from "./icons"

const FEATURES = [
  {
    icon: ReportIcon,
    title: "Report Problems",
    description: "Share issues you are experiencing and help others facing the same problem.",
  },
  {
    icon: TrackIcon,
    title: "Track Progress",
    description: "Follow updates and know when a problem is being investigated or resolved.",
  },
  {
    icon: CommunityIcon,
    title: "Community Driven",
    description: "Join thousands of users reporting and confirming issues together.",
  },
  {
    icon: DiscoverIcon,
    title: "Discover Issues",
    description: "Find existing problems before creating a new report.",
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
