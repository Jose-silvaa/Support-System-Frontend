import { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Spinner,
  Text,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { AppCard, CreateTicketModal } from "@/components"
import { toaster } from "@/components/ui/toaster"
import { useTickets } from "@/contexts/TicketContext"
import {
  getAssignableUsers,
  getAssignableUserLabel,
  type AssignableUser,
} from "@/services/users/users.service"
import type { DashboardCard } from "./interfaces"
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
  const {
    tickets: cards,
    updateTicket,
    updateTicketStatus,
    loading,
    error,
  } = useTickets()
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dropTargetStatus, setDropTargetStatus] = useState<TicketStatus | null>(null)
  const [editingCard, setEditingCard] = useState<DashboardCard | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editResponsible, setEditResponsible] = useState("")
  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([])
  const dragJustEndedRef = useRef(false)

  useEffect(() => {
    if (editingCard) {
      getAssignableUsers()
        .then(setAssignableUsers)
        .catch(() => setAssignableUsers([]))
    }
  }, [editingCard])

  function handleDragStart(e: React.DragEvent, cardId: string) {
    e.dataTransfer.setData("application/json", JSON.stringify({ id: cardId }))
    e.dataTransfer.effectAllowed = "move"
    setDraggedId(cardId)
  }

  function handleDragEnd() {
    setDraggedId(null)
    setDropTargetStatus(null)
    dragJustEndedRef.current = true
    setTimeout(() => {
      dragJustEndedRef.current = false
    }, 150)
  }

  function handleCardClick(card: DashboardCard) {
    if (dragJustEndedRef.current) return

    setEditingCard(card)
    setEditTitle(card.title)
    setEditDescription(card.description)
    setEditResponsible(card.responsible ?? "")
  }

  function handleEditClose() {
    setEditingCard(null)
    setEditTitle("")
    setEditDescription("")
    setEditResponsible("")
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editingCard || !editTitle.trim()) return
    try {
      await updateTicket(editingCard.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        responsible: editResponsible.trim(),
      })
      handleEditClose()
    } catch {
      toaster.error({ title: "Error", description: "Failed to update ticket" })
    }
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
      updateTicketStatus(data.id, newStatus)
    } finally {
      setDraggedId(null)
    }
  }

  return (
    <VStack align="stretch" gap="6">
      <Flex justify="space-between" align="center" gap="4" flexWrap="wrap">
        <Box>
          <Heading size="xl" textStyle="headline">
            Dashboard
          </Heading>
          <Text textStyle="body" mt="1">
            Here you can view all tickets created for users in the system.
          </Text>
        </Box>
        <CreateTicketModal variant="page" />
      </Flex>

      {error && (
        <Box p="3" bg="red.50" color="red.700" borderRadius="md" width="100%">
          {error}
        </Box>
      )}

      {loading ? (
        <Flex flex="1" align="center" justify="center" minH="200px">
          <Spinner size="lg" color="purple.500" />
        </Flex>
      ) : (
      <Flex gap="8" align="stretch" minH="400px" flex="1" flexWrap="wrap">
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
                    onClick={() => handleCardClick(card)}
                    cursor="grab"
                    _active={{ cursor: "grabbing" }}
                    _hover={{ opacity: 0.95 }}
                    opacity={draggedId === card.id ? 0.5 : 1}
                    transition="opacity 0.15s"
                    pr={4}
                    pl={4}
                    pt={2}
                  >
                    <AppCard title={card.title}>
                      <Text fontSize="sm" color="gray.600">
                        Responsible: {card.responsible ? getAssignableUserLabel({ id: card.responsible }) : "—"}
                      </Text>
                    </AppCard>
                  </Box>
                ))}
            </VStack>
          </Box>
        ))}
      </Flex>
      )}

      <Dialog.Root
        open={!!editingCard}
        onOpenChange={(e) => !e.open && handleEditClose()}
        size="md"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Box borderRadius="lg" overflow="hidden" bg="bg" color="fg">
              <AppCard title="Edit ticket">
                <form onSubmit={handleEditSubmit}>
                  <Field.Root mb="4">
                    <Field.Label>Title</Field.Label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Ticket title"
                    />
                  </Field.Root>
                  <Field.Root mb="4">
                    <Field.Label>Responsible</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={editResponsible}
                        onChange={(e) => setEditResponsible(e.target.value)}
                      >
                        <option value="">Unassigned</option>
                        {assignableUsers.map((u) => (
                          <option key={u.id} value={u.id}>
                            {getAssignableUserLabel(u)}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                  <Field.Root mb="4">
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description..."
                      rows={4}
                    />
                  </Field.Root>
                  <HStack gap="2" justify="flex-end">
                    <Button type="button" variant="outline" size="sm" onClick={handleEditClose}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" colorPalette="purple">
                      Save
                    </Button>
                  </HStack>
                </form>
              </AppCard>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </VStack>
  )
}
