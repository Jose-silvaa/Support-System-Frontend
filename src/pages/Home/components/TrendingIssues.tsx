import { Box, Grid, Heading } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import { TRENDING_ISSUES } from "../data"
import { IssueCard } from "./IssueCard"

export function TrendingIssues() {
  return (
    <Box as="section" id="trending" bg={brand.panelDark} py={{ base: "16", md: "24" }} px={{ base: "6", md: "12" }}>
      <Heading
        as="h2"
        fontFamily="display"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="600"
        color="white"
        textAlign="center"
        mb={{ base: "10", md: "14" }}
      >
        Trending Issues
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap="4"
        maxW="1120px"
        mx="auto"
      >
        {TRENDING_ISSUES.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </Grid>
    </Box>
  )
}
