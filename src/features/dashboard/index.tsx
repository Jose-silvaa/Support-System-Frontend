import { useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AppCard } from "@/components"
import { useTickets } from "@/contexts/TicketContext"
import { TicketStatus } from "./interfaces"

const COLUMNS: {
  status: TicketStatus
  label: string
  accent: { border: string; bg: string; heading: string }
}[] = [
  {
    status: TicketStatus.Open,
    label: "Open",
    accent: { border: "gray.400", bg: "gray.50", heading: "gray.700" },
  },
  {
    status: TicketStatus.InProgress,
    label: "In Progress",
    accent: { border: "gray.400", bg: "gray.50", heading: "gray.700" },
  },
  {
    status: TicketStatus.Closed,
    label: "Closed",
    accent: { border: "gray.400", bg: "gray.50", heading: "gray.700" },
  },
]

export function DashboardFeature() {
  const { tickets: cards, setTickets: setCards } = useTickets()
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dropTargetStatus, setDropTargetStatus] = useState<TicketStatus | null>(null)

  function handleDragStart(e: React.DragEvent, cardId: string) {
    e.dataTransfer.setData("application/json", JSON.stringify({ id: cardId }))
    e.dataTransfer.effectAllowed = "move"
    setDraggedId(cardId)
  }

  function handleDragEnd() {
    setDraggedId(null)
    setDropTargetStatus(null)
  }

  function handleDragOver(e: React.DragEvent, status: TicketStatus) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDropTargetStatus(status)
  }

  function handleDragLeave() {
    setDropTargetStatus(null)
  }

  function handleDrop(e: React.DragEvent, newStatus: TicketStatus) {
    e.preventDefault()
    setDropTargetStatus(null)
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json")) as { id: string }
      setCards((prev) =>
        prev.map((card) =>
          card.id === data.id ? { ...card, status: newStatus } : card
        )
      )
    } finally {
      setDraggedId(null)
    }
  }

  return (
    <VStack align="stretch" gap="6">
      <Heading size="xl" textStyle="headline">
        Dashboard
      </Heading>
      <Text textStyle="body">
        Here you can view all tickets created for users in the system.
      </Text>

      <Flex gap="4" align="stretch" minH="400px" flex="1" flexWrap="wrap">
        {COLUMNS.map(({ status, label, accent }) => (
          <Box
            key={status}
            flex="1"
            minW="350px"
            maxW="auto"
            maxH="70vh"
            borderRadius="lg"
            borderWidth="2px"
            borderColor={dropTargetStatus === status ? "purple.400" : accent.border}
            display="flex"
            flexDir="column"
            overflow="hidden"
            transition="border-color 0.15s, background 0.15s"
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            <Heading size="sm" mb="2" pl={6} pr={4} pt={4} pb={4}  bgColor={accent.bg} color={accent.heading} fontWeight="bold" flexShrink={0}>
              {label}
            </Heading>
            <VStack
              align="stretch"
              gap="3"
              overflowY="auto"
              overflowX="hidden"
              flex="1"
              minH="0"
            >
              {cards
                .filter((card) => card.status === status)
                .map((card) => (
                  <Box
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id)}
                    onDragEnd={handleDragEnd}
                    cursor="grab"
                    _active={{ cursor: "grabbing" }}
                    opacity={draggedId === card.id ? 0.5 : 1}
                    transition="opacity 0.15s"
                    pr={4}
                    pl={4}
                    pt={2}
                  >
                    <AppCard title={card.title}>{card.content}</AppCard>
                  </Box>
                ))}
            </VStack>
          </Box>
        ))}
      </Flex>
    </VStack>
  )
}
