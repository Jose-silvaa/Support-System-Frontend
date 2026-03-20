import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  Field,
  HStack,
  Input,
  NativeSelect,
  Textarea,
} from "@chakra-ui/react"
import { AppCard } from "@/components/AppCard"
import { toaster } from "@/components/ui/toaster"
import { useTickets } from "@/contexts/TicketContext"
import { getCurrentUser } from "@/services/auth/auth.service"
import {
  getAssignableUsers,
  getAssignableUserLabel,
  type AssignableUser,
} from "@/services/users/users.service"

const HEADER_PURPLE = "#925fe2"

export interface CreateTicketModalProps {
  /** "header" = white button for navbar; "page" = purple button for dashboard page */
  variant?: "header" | "page"
}

export function CreateTicketModal({ variant = "header" }: CreateTicketModalProps) {
  const { addTicket } = useTickets()
  const currentUser = getCurrentUser()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [responsible, setResponsible] = useState("")
  const [assignableUsers, setAssignableUsers] = useState<AssignableUser[]>([])

  useEffect(() => {
    if (open) {
      getAssignableUsers()
        .then(setAssignableUsers)
        .catch(() => setAssignableUsers([]))
    }
  }, [open])

  function handleOpen() {
    setResponsible(currentUser?.id ?? "")
    setOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await addTicket({
        title: title.trim(),
        description: description,
        responsible: responsible.trim(),
      })
      setTitle("")
      setDescription("")
      setResponsible("")
      setOpen(false)
    } catch {
      toaster.error({ title: "Error", description: "Failed to create ticket" })
    }
  }

  function handleOpenChange(e: { open: boolean }) {
    setOpen(e.open)
    if (!e.open) {
      setTitle("")
      setDescription("")
      setResponsible("")
    }
  }

  const isHeader = variant === "header"

  return (
    <>
      <Button
        size="sm"
        {...(isHeader
          ? {
              bg: "white",
              color: HEADER_PURPLE,
              _hover: { bg: "whiteAlpha.900" },
            }
          : {
              colorPalette: "purple",
            })}
        onClick={handleOpen}
      >
        Create ticket
      </Button>
      <Dialog.Root open={open} onOpenChange={handleOpenChange} size="md">
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Box borderRadius="lg" overflow="hidden" bg="bg" color="fg">
              <AppCard title="New ticket">
                <form onSubmit={handleSubmit}>
                  <Field.Root mb="4">
                    <Field.Label>Title</Field.Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ticket title"
                      autoFocus
                    />
                  </Field.Root>
                  <Field.Root mb="4">
                    <Field.Label>Responsible</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={responsible}
                        onChange={(e) => setResponsible(e.target.value)}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description..."
                      rows={4}
                    />
                  </Field.Root>
                  <HStack gap="2" justify="flex-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" colorPalette="purple">
                      Create
                    </Button>
                  </HStack>
                </form>
              </AppCard>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
