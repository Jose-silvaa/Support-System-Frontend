import { Box, Grid, Heading } from "@chakra-ui/react"
import { brand } from "@/theme/brand"
import { EXAMPLE_TICKETS } from "../data"
import { TicketPreviewCard } from "./TicketPreviewCard"

export function RecentTickets() {
  return (
    <Box as="section" id="tickets" bg={brand.panelDark} py={{ base: "16", md: "24" }} px={{ base: "6", md: "12" }}>
      <Heading
        as="h2"
        fontFamily="display"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="600"
        color="white"
        textAlign="center"
        mb={{ base: "10", md: "14" }}
      >
        Recent Tickets
      </Heading>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap="4"
        maxW="1120px"
        mx="auto"
      >
        {EXAMPLE_TICKETS.map((ticket) => (
          <TicketPreviewCard key={ticket.id} ticket={ticket} />
        ))}
      </Grid>
    </Box>
  )
}
