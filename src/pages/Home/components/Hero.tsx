import { Box, Button, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/routes/constants"
import { TicketStatus } from "@/services/tickets/interfaces"
import { brand } from "@/theme/brand"
import { EXAMPLE_TICKETS } from "../data"
import { Navbar } from "./Navbar"
import { TicketPreviewCard } from "./TicketPreviewCard"

/** Os dois tickets de exemplo usados no preview do dashboard. */
const PREVIEW_TICKETS = EXAMPLE_TICKETS.filter(
  (ticket) => ticket.status === TicketStatus.Open || ticket.status === TicketStatus.InProgress
).slice(0, 2)

export function Hero() {
  const navigate = useNavigate()

  function scrollToTickets() {
    document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Box as="section" bg={brand.panelDark} bgImage={brand.heroGlow} position="relative">
      <Navbar />
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        gap={{ base: "12", lg: "16" }}
        maxW="1200px"
        mx="auto"
        px={{ base: "6", md: "12" }}
        pt={{ base: "8", lg: "16" }}
        pb={{ base: "16", lg: "24" }}
      >
        <VStack
          align={{ base: "center", lg: "flex-start" }}
          gap="6"
          flex="1"
          textAlign={{ base: "center", lg: "left" }}
        >
          <Heading
            as="h1"
            fontFamily="display"
            fontSize={{ base: "4xl", md: "5xl", lg: "58px" }}
            fontWeight="600"
            lineHeight="1.08"
            letterSpacing="-0.01em"
            color="white"
          >
            Submit tickets. Track progress.{" "}
            <Text as="span" color={brand.accent}>
              Get support.
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={brand.textMuted} maxW="480px" lineHeight="1.6">
            The support desk where you can open tickets, follow their status, and get help
            from your team — all in one place.
          </Text>
          <HStack gap="4" flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
            <Button
              size="lg"
              bg={brand.accent}
              color="white"
              px="8"
              boxShadow="0 12px 24px -12px rgba(156,111,228,0.65)"
              _hover={{ bg: brand.accentHover }}
              _active={{ bg: brand.accentActive }}
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Create a Ticket
            </Button>
            <Button
              size="lg"
              variant="outline"
              borderColor={brand.border}
              color="white"
              px="8"
              _hover={{ bg: brand.surface }}
              onClick={scrollToTickets}
            >
              View Tickets
            </Button>
          </HStack>
        </VStack>

        <Box flex="1" w="100%" maxW="480px">
          <Box
            bg={brand.surface}
            borderWidth="1px"
            borderColor={brand.border}
            borderRadius="2xl"
            boxShadow="0 30px 60px -20px rgba(0,0,0,0.5)"
            overflow="hidden"
          >
            <Flex align="center" gap="2" px="4" py="3" borderBottomWidth="1px" borderColor={brand.border}>
              <Box w="2.5" h="2.5" borderRadius="full" bg="red.400" />
              <Box w="2.5" h="2.5" borderRadius="full" bg="yellow.400" />
              <Box w="2.5" h="2.5" borderRadius="full" bg="green.400" />
              <Text fontSize="xs" color={brand.textFaint} ml="2">
                Ticket Desk — Dashboard
              </Text>
            </Flex>
            <VStack align="stretch" gap="3" p="4">
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" fontWeight="semibold" color="white">
                  Live tickets
                </Text>
                <HStack gap="1.5">
                  <Box w="2" h="2" borderRadius="full" bg={brand.success} />
                  <Text fontSize="xs" color={brand.textFaint}>
                    Updating live
                  </Text>
                </HStack>
              </Flex>
              {PREVIEW_TICKETS.map((ticket) => (
                <TicketPreviewCard key={ticket.id} ticket={ticket} />
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
