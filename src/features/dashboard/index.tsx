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
import { getCurrentUser, type AuthUser } from "@/services/auth/auth.service"
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
  accent: { border: string; bg: string; labelColor: string; labelBg: string }
}[] = [
  {
    status: TicketStatus.Open,
    label: "Open",
    accent: {
      border: "gray.400",
      bg: "gray.50",
      labelColor: "green.900",
      labelBg: "green.100",
    },
  },
  {
    status: TicketStatus.InProgress,
    label: "In Progress",
    accent: {
      border: "gray.400",
      bg: "gray.50",
      labelColor: "blue.900",
      labelBg: "blue.50",
    },
  },
  {
    status: TicketStatus.Closed,
    label: "Closed",
    accent: {
      border: "gray.400",
      bg: "gray.50",
      labelColor: "red.900",
      labelBg: "red.100",
    },
  },
]

/** Tempo até o banner de erro sumir sozinho (ms). */
const ERROR_AUTO_DISMISS_MS = 6000

function isRestrictedUserRole(role: string | undefined): boolean {
  return role?.trim().toLowerCase() === "user"
}

/** Utilizadores com role `user` só alteram tickets em que são o reporter (`userId`). */
function canUserModifyTicket(user: AuthUser | null, card: DashboardCard): boolean {
  if (!user) return false
  if (!isRestrictedUserRole(user.role)) return true
  return user.id.trim() === card.userId.trim()
}

export function DashboardFeature() {
  const {
    tickets: cards,
    updateTicket,
    updateTicketStatus,
    loading,
    error,
    clearError,
  } = useTickets()
  const currentUser = getCurrentUser()
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dropTargetStatus, setDropTargetStatus] = useState<TicketStatus | null>(null)
  const [editingCard, setEditingCard] = useState<DashboardCard | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editUserId, setEditUserId] = useState("")
  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([])
  const dragJustEndedRef = useRef(false)

  useEffect(() => {
    getAssignableUsers()
      .then(setAssignableUsers)
      .catch(() => setAssignableUsers([]))
  }, [])

  useEffect(() => {
    if (editingCard) {
      getAssignableUsers()
        .then(setAssignableUsers)
        .catch(() => setAssignableUsers([]))
    }
  }, [editingCard])

  useEffect(() => {
    if (!error) return
    const id = window.setTimeout(() => {
      clearError()
    }, ERROR_AUTO_DISMISS_MS)
    return () => window.clearTimeout(id)
  }, [error, clearError])

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
    setEditUserId(card.userId ?? "")
  }

  function handleEditClose() {
    setEditingCard(null)
    setEditTitle("")
    setEditDescription("")
    setEditUserId("")
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editingCard) return
    if (!canUserModifyTicket(currentUser, editingCard)) return
    if (!editTitle.trim()) {
      toaster.error({ title: "Error", description: "Title is required" })
      return
    }
    if (!editUserId.trim()) {
      toaster.error({ title: "Error", description: "Please select a reporter" })
      return
    }
    try {
      await updateTicket(editingCard.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        userId: editUserId,
      })
      toaster.success({ title: "Success", description: "Ticket updated successfully" })
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
      const card = cards.find((c) => c.id === data.id)
      if (card && !canUserModifyTicket(currentUser, card)) return
      updateTicketStatus(data.id, newStatus)
    } finally {
      setDraggedId(null)
    }
  }

  function getCardResponsibleEmail(card: DashboardCard) {
    if (!card.userId) return "Unassigned"
    const user = assignableUsers.find((u) => u.id === card.userId || u.userId === card.userId)
    return user ? getAssignableUserLabel(user) : "Unassigned"
  }

  function getCardDescription(card: DashboardCard) {
    const description = card.description?.trim()
    return description ? description : "No description provided"
  }

  const canEditModal =
    editingCard != null && canUserModifyTicket(currentUser, editingCard)

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
        <Box
          role="alert"
          borderWidth="1px"
          borderColor="red.300"
          bg="red.50"
          color="red.900"
          px="4"
          py="3"
          borderRadius="md"
        >
          <Flex justify="space-between" align="flex-start" gap="3" flexWrap="wrap">
            <Text fontSize="sm">{error}</Text>
          </Flex>
        </Box>
      )}
      {loading ? (
        <Flex flex="1" align="center" justify="center" minH="200px">
          <Spinner size="lg" color="purple.500" />
        </Flex>
      ) : cards.length === 0 ? (
        <Box  
          p="6"
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.200"
          textAlign="center"
          color="gray.600"
        >
          No tickets found. Create your first ticket to get started.
        </Box>
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
            display="flex"
            flexDir="column"
            overflow="hidden"
            borderColor={dropTargetStatus === status ? "purple.400" : accent.border}
            transition="border-color 0.15s, background 0.15s"
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
            bgColor={accent.bg}
          >
            <Heading size="sm" pl={6} pr={4} pt={4} pb={4} fontWeight="bold" flexShrink={0}>
              <Text
                as="span"
                display="inline-block"
                color={accent.labelColor}
                bg={accent.labelBg}
                pl={3}
                pr={3}
                pt={1.5}
                pb={1.5}
                width="max-content"
                fontSize="inherit"
              >
                {label}
              </Text>
            </Heading>
            <VStack align="stretch" gap="3" overflowY="auto" overflowX="hidden" flex="1" minH="0">
              {cards
                .filter((card) => card.status === status)
                .map((card) => {
                  const canModifyCard = canUserModifyTicket(currentUser, card)
                  return (
                  <Box
                    key={card.id}
                    draggable={canModifyCard}
                    onDragStart={(e) => handleDragStart(e, card.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleCardClick(card)}
                    cursor={canModifyCard ? "grab" : "default"}
                    _active={canModifyCard ? { cursor: "grabbing" } : undefined}
                    _hover={{ opacity: 0.95 }}
                    opacity={draggedId === card.id ? 0.5 : 1}
                    transition="opacity 0.15s"
                    pr={4}
                    pl={4}
                  >
                    <AppCard title={card.title}>
                      <VStack align="start" gap="4">
                        <VStack align="start" gap="0">
                          <Text fontSize="sm" color="gray.700" fontWeight="bold">
                            Description
                          </Text>
                          <Text fontSize="sm" color="gray.700" textAlign="justify">
                            {getCardDescription(card)}
                          </Text>
                        </VStack>
                        <VStack align="start" gap="0">
                          <Text fontSize="sm" color="gray.600" fontWeight="bold">
                           Reporter by 
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {getCardResponsibleEmail(card)}
                          </Text>
                        </VStack>
                      </VStack>
                    </AppCard>
                  </Box>
                  )
                })}
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
            <Box  overflow="hidden" bg="bg">
              <AppCard title="Edit ticket">
                <form onSubmit={handleEditSubmit}>
                  {!canEditModal && (
                    <Text fontSize="sm" color="gray.600" mb="4">
                      You can only edit your own tickets.
                    </Text>
                  )}
                  <Field.Root mb="4">
                    <Field.Label>Title</Field.Label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Ticket title"
                      required={canEditModal}
                      disabled={!canEditModal}
                    />
                  </Field.Root>
                  <Field.Root mb="4">
                    <Field.Label>Reporter by</Field.Label>
                    <NativeSelect.Root disabled={!canEditModal}>
                      <NativeSelect.Field
                        value={editUserId}
                        onChange={(e) => setEditUserId(e.target.value)}
                        {...{ disabled: !canEditModal }}
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
                      disabled={!canEditModal}
                    />
                  </Field.Root>
                  <HStack gap="2" justify="flex-end">
                    <Button type="button" variant="outline" size="sm" onClick={handleEditClose}>
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" colorPalette="purple" disabled={!canEditModal}>
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
